import { State } from "utils/types";

let state: State | undefined;

export const getState = () => state!;

export const setState = (newState: Partial<State>) => {
  if (!state) {
    state = {} as State;
  }
  Object.assign(state, newState);
};
