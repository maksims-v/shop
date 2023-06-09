import '@/styles/globals.css';
import { theme } from '../styles/theme.js';
import authSlice from '@/state/authSlice.js';
import slidersSlice from '@/state/slidersSlice.js';
import shoppingCartSlice from '@/state/shoppingCartSlice.js';
import { ThemeProvider } from '@mui/material';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import Layout from 'components/Layout.jsx';
import searchSlice from '@/state/searchSlice.js';

const store = configureStore({
  reducer: {
    auth: authSlice,
    sliders: slidersSlice,
    shoppingCart: shoppingCartSlice,
    search: searchSlice,
  },
});

const App = ({ Component, pageProps: { session, ...pageProps } }) => {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
