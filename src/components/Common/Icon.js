import React from 'react';

const Icon = (props) => {
  return <i className={`${props.class} ${props.padding && 'mr-3'}`}></i>;
};

export default Icon;
