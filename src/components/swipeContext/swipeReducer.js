import { createContext } from "react";

const initialState = true;

export const SwipeContext = createContext();
export const reducer = (state, action) => {
  switch (action) {
    case "on":
      return true;
    case "off":
      return false;
    case "toggle":
      return !state;
    default:
      return state;
  }
};
