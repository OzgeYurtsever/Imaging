import React from 'react';

const NameForm = props => {
  console.log(props);
  let input;
  return (
    <form
      className="name-entry"
      onSubmit={e => {
        e.preventDefault();
        if (!input.value.trim()) {
          return;
        }
        props.formName === 'User Name'
          ? props.onUserName(input.value, true)
          : props.onFileName(input.value);
      }}
    >
      <label htmlFor="name-field">
        {props.formName}:
        <input ref={node => (input = node)} className="name-field" />
      </label>
      <button type="submit" className="save-button">
        Save
      </button>
    </form>
  );
};

export default NameForm;
