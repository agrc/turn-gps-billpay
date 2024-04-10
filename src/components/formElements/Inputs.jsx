import PropTypes from 'prop-types';
import { forwardRef } from 'react';

export const Input = forwardRef(
  (
    {
      name,
      type,
      value,
      label,
      required,
      placeholder,
      className,
      step,
      min,
      max,
      autoComplete,
      onChange,
      onBlur,
    },
    ref,
  ) => (
    <div className="input-wrapper input-wrapper--text-input">
      {label !== false && (
        <Label htmlFor={name} required={required}>
          {label ?? name}
        </Label>
      )}
      <div className="text-input__inner-wrapper">
        <input
          name={name}
          id={name}
          type={type}
          step={type === 'number' ? step : null}
          min={type === 'number' ? min : null}
          max={type === 'number' ? max : null}
          autoComplete={autoComplete || 'off'}
          defaultValue={value}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
          ref={ref}
          className={className}
          aria-required={required}
          aria-labelledby={label ? `label.${name}` : null}
        />
      </div>
    </div>
  ),
);
Input.displayName = 'Input';
Input.propTypes = {
  /**
   * The property name used by react hook form
   */
  name: PropTypes.string,
  /**
   * The type of input, text, password, etc
   */
  type: PropTypes.string,
  /**
   * The text of the accompanied label otherwise it will be the name of the input
   */
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  /**
   * If the input is required in the form
   */
  required: PropTypes.bool,
  /**
   * The value to preset the input to
   */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * The help text to display
   */
  placeholder: PropTypes.string,
  /**
   * Custom css class names to append to the defaults
   */
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  step: PropTypes.string,
  min: PropTypes.string,
  max: PropTypes.string,
  autoComplete: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
};

Input.defaultProps = {
  name: null,
  type: 'text',
  label: undefined,
  required: false,
  value: null,
  placeholder: null,
  className: null,
  step: '1',
};

export function Label({ children, htmlFor, required, className }) {
  return (
    <label id={`label.${htmlFor}`} htmlFor={htmlFor} className={className}>
      {children}
      {required && (
        <span className="required-star" aria-hidden="true">
          *
        </span>
      )}
    </label>
  );
}
Label.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  htmlFor: PropTypes.string,
  required: PropTypes.bool,
};
