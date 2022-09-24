import React from 'react';

const Input = ({
  inputClassname = '',
  label,
  type,
  name,
  placeholder,
  value,
  onChange,
  onBlur,
  min,
  max,
  autoFocus,
}) => {
  return (
    <div
      className={`inputContainer ${
        type === 'textarea' ? 'isTextarea' : ''
      } ${inputClassname}`}
    >
      {label && <label>{label}</label>}
      {type === 'textarea' ? (
        <textarea
          className={`inputContainer_input ${inputClassname}`}
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          min={min}
          max={max}
          autoFocus={autoFocus}
        />
      ) : (
        <input
          className={`inputContainer_input ${inputClassname}`}
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          autoFocus={autoFocus}
        />
      )}
    </div>
  );
};

export default Input;
