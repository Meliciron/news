import React from 'react';
import './newsCard.css';
import AvatarImg from '../../assets/img/avatar.png';
import { svgUrls } from '../../utils/svg';
import { useDispatch } from 'react-redux';
import { addOrRemoveFavorite } from '../../redux/newsSlice';
import { maxTextContent } from '../../utils/news';

import Button from '../button/button';
import Container from '../container/container';
import Favorite from '../favorite/favorite';
import Tag from '../tag/tag';
import ReadMore from '../readMore/readMore';

function NewsCard({ news, isFavorite }) {
  const dispatch = useDispatch();

  const favoriteClickHandler = () => {
    dispatch(addOrRemoveFavorite(news.id));
  };

  return (
    <Container className="news-card-container" data-aos="fade-left">
      <div className="news-card">
        <div className="news-card__avatar-wrapper">
          <img className="news-card__avatar" src={AvatarImg} alt="avatar" />
          <span className="news-card__date">{news.date.slice(11, 16)}</span>
        </div>
        <div className="news-card__content-wrapper">
          <div className="news-card__info-wrapper">
            <div className="news-card__top-section">
              <div className="news-card__text-wrapper">
                <div className="news-card__author">{news.author}</div>
                <div className="news-card__channel">{news.channel}</div>
              </div>
              <div className="news-card__btns-group">
                <Button className="news-card__btn">Левый</Button>
                <Button className="news-card__btn">Центр</Button>
                <Button className="news-card__btn">Правый</Button>
                <div className="news-card__icons-group">
                  {Object.values(svgUrls).map((icon, index) => (
                    <img
                      className="news-card__icon"
                      key={index}
                      src={icon}
                      alt="avatar"
                    ></img>
                  ))}
                  <Favorite
                    isFavorite={isFavorite}
                    onClick={favoriteClickHandler}
                  />
                </div>
              </div>
            </div>
            <div className="news-card__news-content">
              {news.content.length > maxTextContent ? (
                <ReadMore>{news.content}</ReadMore>
              ) : (
                news.content
              )}
            </div>
          </div>
          {news.attachments.length !== 0 && (
            <div className="news-card__bottom-section-wrapper">
              {news.attachments[0].type === 'video' ? (
                <video className="news-card__media-content" controls>
                  <source src={news.attachments[0].url} type="video/mp4" />
                </video>
              ) : (
                <a
                  href={news.attachments[0].url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    className="news-card__media-content news-card__content-img"
                    src={news.attachments[0].url}
                    alt="news"
                  />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="news-card__tags-wrapper">
        <Tag isActive={true}>Новое</Tag>
        <Tag>Эксперт</Tag>
      </div>
    </Container>
  );
}

export default NewsCard;
