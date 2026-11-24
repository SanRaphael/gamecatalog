import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchGames, fetchGameById } from '../../api/api';

export const loadGames = createAsyncThunk('games/loadGames', async (category = '') => {
  return await fetchGames(category);
});

export const loadGameById = createAsyncThunk('games/loadGameById', async (id) => {
  return await fetchGameById(id);
});

const gamesSlice = createSlice({
  name: 'games',
  initialState: {
    list: [],
    current: null,
    favorites: [],
    status: 'idle',
    error: null,
    activeCategory: '',
  },
  reducers: {
    addFavorite(state, action) {
      const exists = state.favorites.some((g) => g.id === action.payload.id);
      if (!exists) state.favorites.push(action.payload);
    },
    removeFavorite(state, action) {
      state.favorites = state.favorites.filter((g) => g.id !== action.payload);
    },
    setCategory(state, action) {
      state.activeCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadGames.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loadGames.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(loadGames.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(loadGameById.pending, (state) => {
        state.status = 'loading';
        state.current = null;
      })
      .addCase(loadGameById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.current = action.payload;
      })
      .addCase(loadGameById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { addFavorite, removeFavorite, setCategory } = gamesSlice.actions;
export default gamesSlice.reducer;