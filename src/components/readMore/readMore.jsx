import React from 'react';
import './readMore.css';

function ReadMore({ children }) {
  const [isReadMore, setIsReadMore] = React.useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <div className="read-more">
      <div
        className={
          isReadMore
            ? 'read-more__content'
            : 'read-more__content read-more__content_full'
        }
      >
        {children}
      </div>
      <div className="read-more__read-or-hide" onClick={toggleReadMore}>
        {isReadMore ? 'Далее' : 'Скрыть'}
      </div>
    </div>
  );
}

export default ReadMore;
