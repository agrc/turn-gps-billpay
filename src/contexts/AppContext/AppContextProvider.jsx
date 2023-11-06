import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { setValueAtPath } from '@utahdts/utah-design-system';
import AppContext from './AppContext';

/** @typedef {import ('../../mono-repo-globals/@types/jsdoc.d.js').AppContextValue} AppContextValue */

const propTypes = {
 children: PropTypes.node.isRequired,
  formState: PropTypes.shape({
    formId: PropTypes.number.isRequired,
  }),
  // respond to field changes for key/value pairs of data, where the key is the `id` of the nested form components/inputs.
  // ie ({ e, id, value }) => { ... do something ... }
  // if both onChange AND setState are given, then the returned value from onChange will be passed to setState
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,

  // a "setState" compliant state setter
  setState: PropTypes.func,
  state: PropTypes.shape({}),
};

const defaultProps = {
  formState: null,
  onChange: null,
  onSubmit: null,
  setState: null,
  state: null,
};

function AppContextProvider({
                              children,
                              formState,
                              onChange,
                              onSubmit,
                              setState,
                              state,
                            }) {
  const contextState = useMemo(
    () => ({
      formId: formState?.formId,
      dirtyIds: {}, // id: oldValue  ; null object for not dirty
      validationErrors: {}, // id:[errors] ; null object for isValid
      onChange: ({ e, id, newValue }) => {
        let currentValue = newValue;
        if (currentValue === undefined) {
          currentValue = (
            e.target.type === 'checkbox'
              ? e.target.checked
              : e.target.value
          );
        }
        if (onChange) {
          currentValue = onChange({
            e,
            id,
            newValue: currentValue,
            value: currentValue,
          });
        }
        if (setState) {
          setState((draftState) => {
            setValueAtPath({ object: draftState, path: id, value: currentValue });
          });
        }
      },
      onSubmit: () => {
        // calculate validation errors
        if (onSubmit) {
          onSubmit({
            validationErrors: null,
            state,
          });
        }
      },
      state,
    }),
    [formState, onChange, onSubmit, setState, state]
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
