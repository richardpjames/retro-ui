import React from 'react';

const Icon = (props) => {
  return <i className={`${props.className} ${props.padding && 'mr-3'}`}></i>;
};

export default Icon;
