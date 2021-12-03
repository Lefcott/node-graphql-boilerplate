export const getDefinition = (model: any) => (t: any) => {
  Object.entries(model).forEach(([key, value]) => {
    if (key[0] === "$") return;
    t.field(key, value);
  });
};
