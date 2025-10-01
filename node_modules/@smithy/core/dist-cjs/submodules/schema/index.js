'use strict';

var protocolHttp = require('@smithy/protocol-http');
var utilMiddleware = require('@smithy/util-middleware');

const deref = (schemaRef) => {
    if (typeof schemaRef === "function") {
        return schemaRef();
    }
    return schemaRef;
};

const schemaDeserializationMiddleware = (config) => (next, context) => async (args) => {
    const { response } = await next(args);
    const { operationSchema } = utilMiddleware.getSmithyContext(context);
    try {
        const parsed = await config.protocol.deserializeResponse(operationSchema, {
            ...config,
            ...context,
        }, response);
        return {
            response,
            output: parsed,
        };
    }
    catch (error) {
        Object.defineProperty(error, "$response", {
            value: response,
        });
        if (!("$metadata" in error)) {
            const hint = `Deserialization error: to see the raw response, inspect the hidden field {error}.$response on this object.`;
            try {
                error.message += "\n  " + hint;
            }
            catch (e) {
                if (!context.logger || context.logger?.constructor?.name === "NoOpLogger") {
                    console.warn(hint);
                }
                else {
                    context.logger?.warn?.(hint);
                }
            }
            if (typeof error.$responseBodyText !== "undefined") {
                if (error.$response) {
                    error.$response.body = error.$responseBodyText;
                }
            }
            try {
                if (protocolHttp.HttpResponse.isInstance(response)) {
                    const { headers = {} } = response;
                    const headerEntries = Object.entries(headers);
                    error.$metadata = {
                        httpStatusCode: response.statusCode,
                        requestId: findHeader(/^x-[\w-]+-request-?id$/, headerEntries),
                        extendedRequestId: findHeader(/^x-[\w-]+-id-2$/, headerEntries),
                        cfId: findHeader(/^x-[\w-]+-cf-id$/, headerEntries),
                    };
                }
            }
            catch (e) {
            }
        }
        throw error;
    }
};
const findHeader = (pattern, headers) => {
    return (headers.find(([k]) => {
        return k.match(pattern);
    }) || [void 0, void 0])[1];
};

const schemaSerializationMiddleware = (config) => (next, context) => async (args) => {
    const { operationSchema } = utilMiddleware.getSmithyContext(context);
    const endpoint = context.endpointV2?.url && config.urlParser
        ? async () => config.urlParser(context.endpointV2.url)
        : config.endpoint;
    const request = await config.protocol.serializeRequest(operationSchema, args.input, {
        ...config,
        ...context,
        endpoint,
    });
    return next({
        ...args,
        request,
    });
};

const deserializerMiddlewareOption = {
    name: "deserializerMiddleware",
    step: "deserialize",
    tags: ["DESERIALIZER"],
    override: true,
};
const serializerMiddlewareOption = {
    name: "serializerMiddleware",
    step: "serialize",
    tags: ["SERIALIZER"],
    override: true,
};
function getSchemaSerdePlugin(config) {
    return {
        applyToStack: (commandStack) => {
            commandStack.add(schemaSerializationMiddleware(config), serializerMiddlewareOption);
            commandStack.add(schemaDeserializationMiddleware(config), deserializerMiddlewareOption);
            config.protocol.setSerdeContext(config);
        },
    };
}

class TypeRegistry {
    namespace;
    schemas;
    exceptions;
    static registries = new Map();
    constructor(namespace, schemas = new Map(), exceptions = new Map()) {
        this.namespace = namespace;
        this.schemas = schemas;
        this.exceptions = exceptions;
    }
    static for(namespace) {
        if (!TypeRegistry.registries.has(namespace)) {
            TypeRegistry.registries.set(namespace, new TypeRegistry(namespace));
        }
        return TypeRegistry.registries.get(namespace);
    }
    register(shapeId, schema) {
        const qualifiedName = this.normalizeShapeId(shapeId);
        this.schemas.set(qualifiedName, schema);
    }
    getSchema(shapeId) {
        const id = this.normalizeShapeId(shapeId);
        if (!this.schemas.has(id)) {
            throw new Error(`@smithy/core/schema - schema not found for ${id}`);
        }
        return this.schemas.get(id);
    }
    registerError(errorSchema, ctor) {
        this.exceptions.set(errorSchema, ctor);
    }
    getErrorCtor(errorSchema) {
        return this.exceptions.get(errorSchema);
    }
    getBaseException() {
        for (const [id, schema] of this.schemas.entries()) {
            if (id.startsWith("smithy.ts.sdk.synthetic.") && id.endsWith("ServiceException")) {
                return schema;
            }
        }
        return undefined;
    }
    find(predicate) {
        return [...this.schemas.values()].find(predicate);
    }
    clear() {
        this.schemas.clear();
        this.exceptions.clear();
    }
    normalizeShapeId(shapeId) {
        if (shapeId.includes("#")) {
            return shapeId;
        }
        return this.namespace + "#" + shapeId;
    }
    getNamespace(shapeId) {
        return this.normalizeShapeId(shapeId).split("#")[0];
    }
}

class Schema {
    name;
    namespace;
    traits;
    static assign(instance, values) {
        const schema = Object.assign(instance, values);
        TypeRegistry.for(schema.namespace).register(schema.name, schema);
        return schema;
    }
    static [Symbol.hasInstance](lhs) {
        const isPrototype = this.prototype.isPrototypeOf(lhs);
        if (!isPrototype && typeof lhs === "object" && lhs !== null) {
            const list = lhs;
            return list.symbol === this.symbol;
        }
        return isPrototype;
    }
    getName() {
        return this.namespace + "#" + this.name;
    }
}

class ListSchema extends Schema {
    static symbol = Symbol.for("@smithy/lis");
    name;
    traits;
    valueSchema;
    symbol = ListSchema.symbol;
}
const list = (namespace, name, traits, valueSchema) => Schema.assign(new ListSchema(), {
    name,
    namespace,
    traits,
    valueSchema,
});

class MapSchema extends Schema {
    static symbol = Symbol.for("@smithy/map");
    name;
    traits;
    keySchema;
    valueSchema;
    symbol = MapSchema.symbol;
}
const map = (namespace, name, traits, keySchema, valueSchema) => Schema.assign(new MapSchema(), {
    name,
    namespace,
    traits,
    keySchema,
    valueSchema,
});

class OperationSchema extends Schema {
    static symbol = Symbol.for("@smithy/ope");
    name;
    traits;
    input;
    output;
    symbol = OperationSchema.symbol;
}
const op = (namespace, name, traits, input, output) => Schema.assign(new OperationSchema(), {
    name,
    namespace,
    traits,
    input,
    output,
});

class StructureSchema extends Schema {
    static symbol = Symbol.for("@smithy/str");
    name;
    traits;
    memberNames;
    memberList;
    symbol = StructureSchema.symbol;
}
const struct = (namespace, name, traits, memberNames, memberList) => Schema.assign(new StructureSchema(), {
    name,
    namespace,
    traits,
    memberNames,
    memberList,
});

class ErrorSchema extends StructureSchema {
    static symbol = Symbol.for("@smithy/err");
    ctor;
    symbol = ErrorSchema.symbol;
}
const error = (namespace, name, traits, memberNames, memberList, ctor) => Schema.assign(new ErrorSchema(), {
    name,
    namespace,
    traits,
    memberNames,
    memberList,
    ctor: null,
});

const SCHEMA = {
    BLOB: 0b0001_0101,
    STREAMING_BLOB: 0b0010_1010,
    BOOLEAN: 0b0000_0010,
    STRING: 0b0000_0000,
    NUMERIC: 0b0000_0001,
    BIG_INTEGER: 0b0001_0001,
    BIG_DECIMAL: 0b0001_0011,
    DOCUMENT: 0b0000_1111,
    TIMESTAMP_DEFAULT: 0b0000_0100,
    TIMESTAMP_DATE_TIME: 0b0000_0101,
    TIMESTAMP_HTTP_DATE: 0b0000_0110,
    TIMESTAMP_EPOCH_SECONDS: 0b0000_0111,
    LIST_MODIFIER: 0b0100_0000,
    MAP_MODIFIER: 0b1000_0000,
};

class SimpleSchema extends Schema {
    static symbol = Symbol.for("@smithy/sim");
    name;
    schemaRef;
    traits;
    symbol = SimpleSchema.symbol;
}
const sim = (namespace, name, schemaRef, traits) => Schema.assign(new SimpleSchema(), {
    name,
    namespace,
    traits,
    schemaRef,
});

class NormalizedSchema {
    ref;
    memberName;
    static symbol = Symbol.for("@smithy/nor");
    symbol = NormalizedSchema.symbol;
    name;
    schema;
    _isMemberSchema;
    traits;
    memberTraits;
    normalizedTraits;
    constructor(ref, memberName) {
        this.ref = ref;
        this.memberName = memberName;
        const traitStack = [];
        let _ref = ref;
        let schema = ref;
        this._isMemberSchema = false;
        while (Array.isArray(_ref)) {
            traitStack.push(_ref[1]);
            _ref = _ref[0];
            schema = deref(_ref);
            this._isMemberSchema = true;
        }
        if (traitStack.length > 0) {
            this.memberTraits = {};
            for (let i = traitStack.length - 1; i >= 0; --i) {
                const traitSet = traitStack[i];
                Object.assign(this.memberTraits, NormalizedSchema.translateTraits(traitSet));
            }
        }
        else {
            this.memberTraits = 0;
        }
        if (schema instanceof NormalizedSchema) {
            const computedMemberTraits = this.memberTraits;
            Object.assign(this, schema);
            this.memberTraits = Object.assign({}, computedMemberTraits, schema.getMemberTraits(), this.getMemberTraits());
            this.normalizedTraits = void 0;
            this.memberName = memberName ?? schema.memberName;
            return;
        }
        this.schema = deref(schema);
        if (this.schema && typeof this.schema === "object") {
            this.traits = this.schema?.traits ?? {};
        }
        else {
            this.traits = 0;
        }
        this.name =
            (this.schema instanceof Schema ? this.schema.getName?.() : void 0) ?? this.memberName ?? this.getSchemaName();
        if (this._isMemberSchema && !memberName) {
            throw new Error(`@smithy/core/schema - NormalizedSchema member init ${this.getName(true)} missing member name.`);
        }
    }
    static [Symbol.hasInstance](lhs) {
        return Schema[Symbol.hasInstance].bind(this)(lhs);
    }
    static of(ref) {
        if (ref instanceof NormalizedSchema) {
            return ref;
        }
        if (Array.isArray(ref)) {
            const [ns, traits] = ref;
            if (ns instanceof NormalizedSchema) {
                Object.assign(ns.getMergedTraits(), NormalizedSchema.translateTraits(traits));
                return ns;
            }
            throw new Error(`@smithy/core/schema - may not init unwrapped member schema=${JSON.stringify(ref, null, 2)}.`);
        }
        return new NormalizedSchema(ref);
    }
    static translateTraits(indicator) {
        if (typeof indicator === "object") {
            return indicator;
        }
        indicator = indicator | 0;
        const traits = {};
        let i = 0;
        for (const trait of [
            "httpLabel",
            "idempotent",
            "idempotencyToken",
            "sensitive",
            "httpPayload",
            "httpResponseCode",
            "httpQueryParams",
        ]) {
            if (((indicator >> i++) & 1) === 1) {
                traits[trait] = 1;
            }
        }
        return traits;
    }
    getSchema() {
        if (this.schema instanceof NormalizedSchema) {
            Object.assign(this, { schema: this.schema.getSchema() });
            return this.schema;
        }
        if (this.schema instanceof SimpleSchema) {
            return deref(this.schema.schemaRef);
        }
        return deref(this.schema);
    }
    getName(withNamespace = false) {
        if (!withNamespace) {
            if (this.name && this.name.includes("#")) {
                return this.name.split("#")[1];
            }
        }
        return this.name || undefined;
    }
    getMemberName() {
        if (!this.isMemberSchema()) {
            throw new Error(`@smithy/core/schema - non-member schema: ${this.getName(true)}`);
        }
        return this.memberName;
    }
    isMemberSchema() {
        return this._isMemberSchema;
    }
    isUnitSchema() {
        return this.getSchema() === "unit";
    }
    isListSchema() {
        const inner = this.getSchema();
        if (typeof inner === "number") {
            return inner >= SCHEMA.LIST_MODIFIER && inner < SCHEMA.MAP_MODIFIER;
        }
        return inner instanceof ListSchema;
    }
    isMapSchema() {
        const inner = this.getSchema();
        if (typeof inner === "number") {
            return inner >= SCHEMA.MAP_MODIFIER && inner <= 0b1111_1111;
        }
        return inner instanceof MapSchema;
    }
    isStructSchema() {
        const inner = this.getSchema();
        return (inner !== null && typeof inner === "object" && "members" in inner) || inner instanceof StructureSchema;
    }
    isBlobSchema() {
        return this.getSchema() === SCHEMA.BLOB || this.getSchema() === SCHEMA.STREAMING_BLOB;
    }
    isTimestampSchema() {
        const schema = this.getSchema();
        return typeof schema === "number" && schema >= SCHEMA.TIMESTAMP_DEFAULT && schema <= SCHEMA.TIMESTAMP_EPOCH_SECONDS;
    }
    isDocumentSchema() {
        return this.getSchema() === SCHEMA.DOCUMENT;
    }
    isStringSchema() {
        return this.getSchema() === SCHEMA.STRING;
    }
    isBooleanSchema() {
        return this.getSchema() === SCHEMA.BOOLEAN;
    }
    isNumericSchema() {
        return this.getSchema() === SCHEMA.NUMERIC;
    }
    isBigIntegerSchema() {
        return this.getSchema() === SCHEMA.BIG_INTEGER;
    }
    isBigDecimalSchema() {
        return this.getSchema() === SCHEMA.BIG_DECIMAL;
    }
    isStreaming() {
        const streaming = !!this.getMergedTraits().streaming;
        if (streaming) {
            return true;
        }
        return this.getSchema() === SCHEMA.STREAMING_BLOB;
    }
    isIdempotencyToken() {
        if (this.normalizedTraits) {
            return !!this.normalizedTraits.idempotencyToken;
        }
        for (const traits of [this.traits, this.memberTraits]) {
            if (typeof traits === "number") {
                if ((traits & 0b0100) === 0b0100) {
                    return true;
                }
            }
            else if (typeof traits === "object") {
                if (!!traits.idempotencyToken) {
                    return true;
                }
            }
        }
        return false;
    }
    getMergedTraits() {
        return (this.normalizedTraits ??
            (this.normalizedTraits = {
                ...this.getOwnTraits(),
                ...this.getMemberTraits(),
            }));
    }
    getMemberTraits() {
        return NormalizedSchema.translateTraits(this.memberTraits);
    }
    getOwnTraits() {
        return NormalizedSchema.translateTraits(this.traits);
    }
    getKeySchema() {
        if (this.isDocumentSchema()) {
            return this.memberFrom([SCHEMA.DOCUMENT, 0], "key");
        }
        if (!this.isMapSchema()) {
            throw new Error(`@smithy/core/schema - cannot get key for non-map: ${this.getName(true)}`);
        }
        const schema = this.getSchema();
        if (typeof schema === "number") {
            return this.memberFrom([0b0011_1111 & schema, 0], "key");
        }
        return this.memberFrom([schema.keySchema, 0], "key");
    }
    getValueSchema() {
        const schema = this.getSchema();
        if (typeof schema === "number") {
            if (this.isMapSchema()) {
                return this.memberFrom([0b0011_1111 & schema, 0], "value");
            }
            else if (this.isListSchema()) {
                return this.memberFrom([0b0011_1111 & schema, 0], "member");
            }
        }
        if (schema && typeof schema === "object") {
            if (this.isStructSchema()) {
                throw new Error(`may not getValueSchema() on structure ${this.getName(true)}`);
            }
            const collection = schema;
            if ("valueSchema" in collection) {
                if (this.isMapSchema()) {
                    return this.memberFrom([collection.valueSchema, 0], "value");
                }
                else if (this.isListSchema()) {
                    return this.memberFrom([collection.valueSchema, 0], "member");
                }
            }
        }
        if (this.isDocumentSchema()) {
            return this.memberFrom([SCHEMA.DOCUMENT, 0], "value");
        }
        throw new Error(`@smithy/core/schema - ${this.getName(true)} has no value member.`);
    }
    hasMemberSchema(member) {
        if (this.isStructSchema()) {
            const struct = this.getSchema();
            return struct.memberNames.includes(member);
        }
        return false;
    }
    getMemberSchema(member) {
        if (this.isStructSchema()) {
            const struct = this.getSchema();
            if (!struct.memberNames.includes(member)) {
                throw new Error(`@smithy/core/schema - ${this.getName(true)} has no member=${member}.`);
            }
            const i = struct.memberNames.indexOf(member);
            const memberSchema = struct.memberList[i];
            return this.memberFrom(Array.isArray(memberSchema) ? memberSchema : [memberSchema, 0], member);
        }
        if (this.isDocumentSchema()) {
            return this.memberFrom([SCHEMA.DOCUMENT, 0], member);
        }
        throw new Error(`@smithy/core/schema - ${this.getName(true)} has no members.`);
    }
    getMemberSchemas() {
        const buffer = {};
        try {
            for (const [k, v] of this.structIterator()) {
                buffer[k] = v;
            }
        }
        catch (ignored) { }
        return buffer;
    }
    getEventStreamMember() {
        if (this.isStructSchema()) {
            for (const [memberName, memberSchema] of this.structIterator()) {
                if (memberSchema.isStreaming() && memberSchema.isStructSchema()) {
                    return memberName;
                }
            }
        }
        return "";
    }
    *structIterator() {
        if (this.isUnitSchema()) {
            return;
        }
        if (!this.isStructSchema()) {
            throw new Error("@smithy/core/schema - cannot iterate non-struct schema.");
        }
        const struct = this.getSchema();
        for (let i = 0; i < struct.memberNames.length; ++i) {
            yield [struct.memberNames[i], this.memberFrom([struct.memberList[i], 0], struct.memberNames[i])];
        }
    }
    memberFrom(memberSchema, memberName) {
        if (memberSchema instanceof NormalizedSchema) {
            return Object.assign(memberSchema, {
                memberName,
                _isMemberSchema: true,
            });
        }
        return new NormalizedSchema(memberSchema, memberName);
    }
    getSchemaName() {
        const schema = this.getSchema();
        if (typeof schema === "number") {
            const _schema = 0b0011_1111 & schema;
            const container = 0b1100_0000 & schema;
            const type = Object.entries(SCHEMA).find(([, value]) => {
                return value === _schema;
            })?.[0] ?? "Unknown";
            switch (container) {
                case SCHEMA.MAP_MODIFIER:
                    return `${type}Map`;
                case SCHEMA.LIST_MODIFIER:
                    return `${type}List`;
                case 0:
                    return type;
            }
        }
        return "Unknown";
    }
}

exports.ErrorSchema = ErrorSchema;
exports.ListSchema = ListSchema;
exports.MapSchema = MapSchema;
exports.NormalizedSchema = NormalizedSchema;
exports.OperationSchema = OperationSchema;
exports.SCHEMA = SCHEMA;
exports.Schema = Schema;
exports.SimpleSchema = SimpleSchema;
exports.StructureSchema = StructureSchema;
exports.TypeRegistry = TypeRegistry;
exports.deref = deref;
exports.deserializerMiddlewareOption = deserializerMiddlewareOption;
exports.error = error;
exports.getSchemaSerdePlugin = getSchemaSerdePlugin;
exports.list = list;
exports.map = map;
exports.op = op;
exports.serializerMiddlewareOption = serializerMiddlewareOption;
exports.sim = sim;
exports.struct = struct;
