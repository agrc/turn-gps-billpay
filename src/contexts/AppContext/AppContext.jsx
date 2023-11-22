// @ts-check
import { createContext } from 'react';

/**
 * @template ImmerHookT
 * @typedef {import('use-immer').ImmerHook<ImmerHookT>} ImmerHook
 */

/** @typedef {import ('../../mono-repo-globals/@types/jsdoc.d.js').AppContextValue} AppContextValue */

const AppContext = /** @type {typeof createContext<ImmerHook<AppContextValue>>} */ (createContext)({
  // fake data for a brief moment before actual context provider kicks in
  appState: { hasTermsConditionsAgreed: false },
  setAppState: () => { },
});

export default AppContext;
