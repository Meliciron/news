import React from 'react';
import './container.css';

import classNames from 'classnames';

function Container({ className, children, ...rest }) {
  const classes = classNames('container', className);
  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
}

export default Container;
