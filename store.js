const createStore = require('./packages/zustand/vanilla').default;

const store = createStore((set) => ({
  modelTypes: 0,
  setModelTypes: (str) => set(() => ({ modelTypes: str })),
  test: 'test',
  setTest: (str) => set(() => ({ test: str })),
}));

module.exports = store;
