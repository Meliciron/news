import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getNews = createAsyncThunk('news/getNews', async function () {
  let initMessagesBody = new FormData();
  initMessagesBody.append('actionName', 'MessagesLoad');
  initMessagesBody.append('messageId', 0);

  const response = await axios({
    method: 'post',
    url: 'http://f0665380.xsph.ru/',
    data: initMessagesBody,
    headers: { 'Content-Type': 'multipart/form-data' },
  }).then((res) => {
    return res.data.Messages;
  });
  return response;
});

export const updateMessages = createAsyncThunk(
  'news/updateMessages',
  async function (id) {
    let updateBody = new FormData();
    updateBody.append('actionName', 'MessagesLoad');
    updateBody.append('messageId', id);
    const response = await axios({
      method: 'post',
      url: 'http://f0665380.xsph.ru/',
      data: updateBody,
      headers: { 'Content-Type': 'multipart/form-data' },
    }).then((res) => {
      return res.data.Messages;
    });
    return response;
  }
);

const newsSlice = createSlice({
  name: 'news',
  initialState: {
    news: [],
    favorites: JSON.parse(localStorage.getItem('news')) || [],
    lastId: null,
    status: '',
    order: 'newLast',
  },
  reducers: {
    addOrRemoveFavorite(state, action) {
      if (state.favorites.includes(action.payload)) {
        state.favorites = state.favorites.filter(
          (item) => item !== action.payload
        );
      } else {
        state.favorites.push(action.payload);
      }
    },
    saveFavoritesToLacalStorage(state) {
      localStorage.setItem('news', JSON.stringify(state.favorites));
    },
    toggleOrder(state) {
      if (state.order === 'newLast') {
        state.order = 'newFirst';
        state.news = [...state.news].reverse();
      } else {
        state.order = 'newLast';
        state.news = [...state.news].reverse();
      }
    },
  },
  extraReducers: {
    [getNews.fulfilled]: (state, action) => {
      state.status = 'fulfilled';
      state.news = action.payload;
      state.lastId = +state.news[state.news.length - 1].id;
    },
    [updateMessages.pending]: (state) => {
      state.status = 'loading';
    },
    [updateMessages.fulfilled]: (state, action) => {
      state.status = 'fulfilled';
      if (action.payload) {
        state.lastId = action.payload[0].id;
        if (state.order === 'newLast') {
          state.news = [...state.news, ...action.payload];
        } else {
          state.news.unshift(...action.payload);
        }
      }
    },
  },
});

export const { addOrRemoveFavorite, saveFavoritesToLacalStorage, toggleOrder } =
  newsSlice.actions;
export default newsSlice.reducer;
