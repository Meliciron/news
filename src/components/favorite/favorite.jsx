import React, { Fragment } from 'react';
import './favorite.css';

function Favorite({ isFavorite, onClick }) {
  return (
    <Fragment>
      <svg
        className={isFavorite ? 'favorite favorite_active' : 'favorite'}
        onClick={onClick}
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10.3672 2.20312L7.82812 7.39844L2.08594 8.21875C1.07031 8.375 0.679688 9.625 1.42188 10.3672L5.52344 14.3906L4.54688 20.0547C4.39062 21.0703 5.48438 21.8516 6.38281 21.3828L11.5 18.6875L16.5781 21.3828C17.4766 21.8516 18.5703 21.0703 18.4141 20.0547L17.4375 14.3906L21.5391 10.3672C22.2812 9.625 21.8906 8.375 20.875 8.21875L15.1719 7.39844L12.5938 2.20312C12.1641 1.30469 10.8359 1.26562 10.3672 2.20312Z"
          stroke="#cdcdcd"
        />
      </svg>
    </Fragment>
  );
}

export default Favorite;
