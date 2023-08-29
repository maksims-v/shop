import Filters from 'components/Filters';
import ProductList from 'components/ProductList';
import { Box, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { search, clearAllFilters, inputValue } from '@/state/searchPageSlice';
import NewSearchMobileVesersion from 'components/mobileVersionPage/NewSearchMobileVesersion';
import Layout from 'components/Layout';

const Search = ({ newSearch }) => {
  const searchFlag = useSelector((state) => state.searchPageSlice.searchFlag);
  const total = useSelector((state) => state.searchPageSlice.metaData.total);
  const mobile = useSelector((state) => state.searchPageSlice.mobile);

  const dispatch = useDispatch();

  useEffect(() => {
    if (newSearch.length !== 0) {
      dispatch(clearAllFilters());
      dispatch(inputValue(newSearch));
    }
  }, [newSearch]);

  useEffect(() => {
    dispatch(search());
  }, [searchFlag, newSearch]);

  const clearFilters = () => {
    dispatch(clearAllFilters());
    dispatch(inputValue(newSearch));
    dispatch(search());
  };

  return mobile ? (
    <NewSearchMobileVesersion newSearch={newSearch} clearFilters={clearFilters} />
  ) : (
    <Layout>
      <Box sx={{ mt: '60px' }}>
        <Box display="flex" alignContent="center" flexDirection="column">
          <Typography
            sx={{
              fontSize: '22px',
              fontWeight: 'bold',
              margin: '0 auto 17px auto',
            }}>
            Your search for as produced {total} results
          </Typography>
        </Box>
        <Box display="flex">
          <Box flex="1 1 10%">
            <Filters />
          </Box>
          <Box flex="1 1 80%">
            <ProductList />
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default Search;

export async function getServerSideProps({ query }) {
  const { newSearch } = query;

  return { props: { newSearch } };
}
