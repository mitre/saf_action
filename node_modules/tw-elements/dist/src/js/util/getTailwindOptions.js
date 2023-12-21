const prefix = "tw-";

const transformClasses = (classes, prefix = "tw-") => {
  let transformed = {};

  for (const [key, value] of Object.entries(classes)) {
    console.log(key, value);

    const valueWithPrefix = value
      .split(" ")
      .map((v) => `${prefix}${v}`)
      .join(" ");

    transformed[key] = valueWithPrefix;
  }

  console.log(transformed);
  return transformed;
};

export { transformClasses };
