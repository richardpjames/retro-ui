import React, { useState, useEffect } from 'react';
import Icon from '../Common/Icon';

const PasswordMeter = (props) => {
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const [lengthCheck, setLengthCheck] = useState(false);
  const [lowercaseCheck, setLowercaseCheck] = useState(false);
  const [uppercaseCheck, setUppercaseCheck] = useState(false);
  const [numericCheck, setNumericCheck] = useState(false);
  const [specialCheck, setSpecialCheck] = useState(false);

  // Regular expressions for matching
  const lowerCase = /.*[a-z].*/;
  const upperCase = /.*[A-Z].*/;
  const numeric = /.*[0-9].*/;
  const special = /.*[!@#$%^&*].*/;

  useEffect(() => {
    props.setDisabled(true);
    setPasswordsMatch(
      props.password === props.confirmPassword && props.password.length > 0
        ? true
        : false,
    );
    setLengthCheck(props.password.length >= 8 ? true : false);
    setUppercaseCheck(props.password.match(upperCase) ? true : false);
    setLowercaseCheck(props.password.match(lowerCase) ? true : false);
    setNumericCheck(props.password.match(numeric) ? true : false);
    setSpecialCheck(props.password.match(special) ? true : false);
    if (
      passwordsMatch &&
      lengthCheck &&
      lowercaseCheck &&
      uppercaseCheck &&
      numericCheck &&
      specialCheck
    ) {
      props.setDisabled(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    props,
    passwordsMatch,
    lengthCheck,
    lowercaseCheck,
    uppercaseCheck,
    numericCheck,
    specialCheck,
  ]);

  return (
    <>
      <div className="box">
        <h5 className="is-title is5">Password Strength</h5>
        <p>Your Password Must</p>
        <ul style={{ listStyle: 'none' }}>
          <li>
            <Icon
              class={`${
                lengthCheck
                  ? 'fas fa-check-circle padding'
                  : 'fas fa-times-circle padding'
              }`}
            />{' '}
            Be 8 Characters or Longer
          </li>
          <li>
            <Icon
              class={`${
                uppercaseCheck
                  ? 'fas fa-check-circle padding'
                  : 'fas fa-times-circle padding'
              }`}
            />{' '}
            Contain 1 Upper Case Character
          </li>
          <li>
            <Icon
              class={`${
                lowercaseCheck
                  ? 'fas fa-check-circle padding'
                  : 'fas fa-times-circle padding'
              }`}
            />{' '}
            Contain 1 Lower Case Character
          </li>
          <li>
            <Icon
              class={`${
                numericCheck
                  ? 'fas fa-check-circle padding'
                  : 'fas fa-times-circle padding'
              }`}
            />{' '}
            Contain 1 Number
          </li>
          <li>
            <Icon
              class={`${
                specialCheck
                  ? 'fas fa-check-circle padding'
                  : 'fas fa-times-circle padding'
              }`}
            />{' '}
            Contain 1 Special Character
          </li>
          <li>
            <Icon
              class={`${
                passwordsMatch
                  ? 'fas fa-check-circle padding'
                  : 'fas fa-times-circle padding'
              }`}
            />{' '}
            Match The Confirmation
          </li>
        </ul>
      </div>
    </>
  );
};

export default PasswordMeter;
