import React from 'react';
import './news.css';
import { useSelector, useDispatch } from 'react-redux';
import {
  saveFavoritesToLacalStorage,
  getNews,
  updateMessages,
  toggleOrder,
} from '../redux/newsSlice';
import notificationSound from '../assets/mp3/notification.mp3';
import useSound from 'use-sound';
import Aos from 'aos';
import 'aos/dist/aos.css';

import NewsCard from '../components/newsCard/newsCard';
import ScrollTop from '../components/scrollTop/scrollTop';

function News() {
  const dispatch = useDispatch();
  const news = useSelector((state) => state.news.news);
  const favorites = useSelector((state) => state.news.favorites);
  const lastId = useSelector((state) => state.news.lastId);
  const status = useSelector((state) => state.news.status);
  const order = useSelector((state) => state.news.order);
  const [notification] = useSound(notificationSound);
  const [isSoundOn, setIsSoundOn] = React.useState(false);

  const playSound = () => {
    notification();
  };

  React.useEffect(() => {
    Aos.init({ duration: 1000 });
    dispatch(getNews());
    window.addEventListener('beforeunload', () => {
      dispatch(saveFavoritesToLacalStorage());
    });
  }, []);

  React.useEffect(() => {
    if (lastId !== null && status === 'fulfilled') {
      setTimeout(() => dispatch(updateMessages(lastId)), 5000);
    }
  }, [status]);

  React.useEffect(() => {
    if (isSoundOn) playSound();
  }, [news]);

  const selectHandler = (e) => {
    dispatch(toggleOrder());
  };

  const soundCheckboxHandler = () => {
    setIsSoundOn(!isSoundOn);
  };

  return (
    <div className="news">
      <div className="news__sound-wrapper">
        <label className="news__sound-label">
          <input
            className="news__sound-checkbox"
            type="checkbox"
            checked={isSoundOn}
            onChange={soundCheckboxHandler}
          />
          <span>Звук уведомлений</span>
        </label>
      </div>
      <div className="news__select-wrapper">
        <label>
          <div>Порядок сообщений</div>
          <select
            className="news__select"
            id="messagesOrder"
            value={order}
            onChange={(e) => selectHandler(e)}
          >
            <option value="newLast">Новые в конце</option>
            <option value="newFirst">Новые в начале</option>
          </select>
        </label>
      </div>
      {news.map((news, index) => (
        <NewsCard
          key={+news.id}
          news={news}
          isFavorite={favorites?.includes(news.id)}
        />
      ))}
      <ScrollTop />
    </div>
  );
}

export default News;
