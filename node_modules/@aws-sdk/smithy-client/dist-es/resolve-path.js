import { extendedEncodeURIComponent } from "./extended-encode-uri-component";
export var resolvedPath = function (resolvedPath, input, memberName, labelValueProvider, uriLabel, isGreedyLabel) {
    if (input != null && input[memberName] !== undefined) {
        var labelValue = labelValueProvider();
        if (labelValue.length <= 0) {
            throw new Error("Empty value provided for input HTTP label: " + memberName + ".");
        }
        resolvedPath = resolvedPath.replace(uriLabel, isGreedyLabel
            ? labelValue
                .split("/")
                .map(function (segment) { return extendedEncodeURIComponent(segment); })
                .join("/")
            : extendedEncodeURIComponent(labelValue));
    }
    else {
        throw new Error("No value provided for input HTTP label: " + memberName + ".");
    }
    return resolvedPath;
};
