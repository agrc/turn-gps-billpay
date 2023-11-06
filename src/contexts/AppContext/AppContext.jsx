// @ts-check
import { createContext } from 'react';

/**
 * @template ImmerHookT
 * @typedef {import('use-immer').ImmerHook<ImmerHookT>} ImmerHook
 */

/** @typedef {import ('../../mono-repo-globals/@types/jsdoc.d.js').AppContextValue} AppContextValue */

const AppContext = /** @type {typeof createContext<ImmerHook<AppContextValue>>} */ (createContext)(
  [
    { lastStatusDates: [] },
    () => { /* This is a default value function, so doesn't actually do anything... actual function in AppContextProvider DOES do something */ },
  ]
);

export default AppContext;
