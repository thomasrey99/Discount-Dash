import { createSlice } from "@reduxjs/toolkit";

export const favoriteSlice = createSlice({
    name: "favorites",
    initialState: {
        favorites: [] as any,
        flag: false,
    },
    reducers: {
        addFavorite: (state, {payload}) => {
          state.favorites = payload
        },
        removeFavorite: (state, {payload}) => {
          state.favorites = state.favorites.filter((favorite : any) => favorite.id !== payload.id);
        },
        setFlagState: (state, {payload}) => {
          state.flag = payload
        }
    },
})

export const { addFavorite, removeFavorite, setFlagState } = favoriteSlice.actions