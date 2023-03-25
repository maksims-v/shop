import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuth: true,
  user: {
    email: '',
    name: 'maksims',
    surname: 'veselovs',
    country: 'latvija',
    city: 'riga',
    adress: 'masdfs 342/1',
    postCode: '14152LV',
    phone: '284754830',
  },
  orders: [
    { id: 1, type: 'boots', brand: 'ecco', size: '42', color: 'white' },
    { id: 2, type: 'clothing', brand: 'adidas', size: '50', color: 'yellow' },
    { id: 3, type: 'accessories', brand: 'ecco', size: '48', color: 'white' },
  ],
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logIn(state) {
      state.isAuth = !state.isAuth;
    },
    saveChanges(state, actions) {
      state.user = actions.payload;
    },
  },
});

export const { logIn, saveChanges } = authSlice.actions;

export default authSlice.reducer;
