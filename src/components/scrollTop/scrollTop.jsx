import React from 'react';
import './scrollTop.css';

import { scrollToTop } from '../../utils/scroll';

function ScrollTop() {
  const [scroll, setScroll] = React.useState(0);

  React.useEffect(() => {
    window.addEventListener('scroll', () => {
      setScroll(window.scrollY);
    });
  }, []);

  return (
    <div
      style={{ opacity: scroll / 2000 < 1 ? scroll / 2000 : 1 }}
      className={
        scroll + 300 > document.documentElement.clientHeight
          ? 'scroll-top'
          : 'scroll-top scroll-top_hidden'
      }
      onClick={scrollToTop}
    >
      <div className="scroll-top__content">↑</div>
    </div>
  );
}

export default ScrollTop;
