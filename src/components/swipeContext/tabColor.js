import { createContext } from "react";

const initialState = true;

export const TabReducer = (state, action) => {
  switch (action) {
    case "on":
      return true;
    case "off":
      return false;
    default:
      return state;
  }
};
