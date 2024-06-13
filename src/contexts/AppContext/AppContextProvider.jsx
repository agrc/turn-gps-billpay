import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { useImmer } from 'use-immer';
import AppContext from './AppContext';

/** @typedef {import ('../../mono-repo-globals/@types/jsdoc.d.js').AppContextValue} AppContextValue */

const propTypes = { children: PropTypes.node.isRequired };

function AppContextProvider({ children }) {
  const [appState, setAppState] = useImmer(() => ({
    hasTermsConditionsAgreed: false,
  }));
  const contextState = useMemo(
    () => ({
      // app state
      appState,
      setAppState,
    }),
    [appState, setAppState],
  );

  return (
    <AppContext.Provider value={contextState}>{children}</AppContext.Provider>
  );
}
AppContextProvider.propTypes = propTypes;

export default AppContextProvider;
