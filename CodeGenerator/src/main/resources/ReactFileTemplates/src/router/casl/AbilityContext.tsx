import { createContext, useContext } from "react";
import { createContextualCan } from "@casl/react";
import ability from "./ability";

export const AbilityContext = createContext(ability);
export const Can = createContextualCan(AbilityContext.Consumer);

export const useAbility = () => {
  return {
    ability: useContext(AbilityContext),
    Can,
  };
};
