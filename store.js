const create = require("zustand/vanilla").default;

const store = create((set) => ({
  modelTypes: 0,
  setModelTypes: (str) => set(() => ({ modelTypes: str })),
  test: "test",
  setTest: (str) => set(() => ({ test: str })),
}));

module.exports = store;
