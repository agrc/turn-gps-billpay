import PropTypes from 'prop-types';
import { useImmer } from 'use-immer';
import { defaultLastStatusDates } from '../../helpers/constants';
import AppContext from './AppContext';

/** @typedef {import ('../../mono-repo-globals/@types/jsdoc.d.js').AppContextValue} AppContextValue */

const propTypes = { children: PropTypes.node.isRequired };
const defaultProps = {};

function AppContextProvider({ children }) {
  const contextState = useImmer(
    () => /** @type {AppContextValue} */({
      lastStatusDates: defaultLastStatusDates
    })
  );

  return (
    <AppContext.Provider value={contextState}>
      {children}
    </AppContext.Provider>
  );
}
AppContextProvider.propTypes = propTypes;
AppContextProvider.defaultProps = defaultProps;

export default AppContextProvider;
