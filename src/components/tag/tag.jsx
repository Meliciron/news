import React from 'react';
import './tag.css';

function Tag({ children, isActive = false }) {
  return <div className={isActive ? 'tag tag_acive' : 'tag'}>#{children}</div>;
}

export default Tag;
