import { types, flow } from 'mobx-state-tree';

export function state(): string {
  return 'Core App';
}

export const RootStore = types
  .model({
    name: types.string,
    age: types.number,
  })
  .actions((self) => ({
    setName(newName: string) {
      console.log('setName', newName);
      self.name = newName;
    },
    getUser: flow(function* () {
      console.log('getUser');
      const data = yield fetch(
        typeof window == 'undefined'
          ? 'http:localhost:3000/api/hello'
          : '/api/hello',
        {
          method: 'GET',
        }
      );
      const name = yield data.text();
      self.name = name;
    }),
  }));

export const store = RootStore.create({
  name: 'John',
  age: 42,
});
