import React from 'react';
import './button.css';
import classNames from 'classnames';

function Button({ className, children, onClick, ...rest }) {
  const classes = classNames('btn', className);

  return (
    <button className={classes} onClick={onClick} {...rest}>
      {children}
    </button>
  );
}

export default Button;
