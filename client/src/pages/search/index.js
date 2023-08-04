import { Box } from '@mui/material';
import ProductList from 'components/ProductList';
import Filters from 'components/Filters';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { search, clearFilters } from '@/state/searchPageSlice';

const Index = () => {
  const dispatch = useDispatch();
  const searchFlag = useSelector((state) => state.search.searchFlag);
  const currentPage = useSelector((state) => state.search.currentPage);
  const sortValue = useSelector((state) => state.search.sortValue);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage, sortValue]);

  useEffect(() => {
    dispatch(clearFilters());
  }, []);

  useEffect(() => {
    dispatch(search());
  }, [searchFlag]);

  return (
    <Box mt="60px">
      <Box display="flex">
        <Box flex="1 1 10%">
          <Filters />
        </Box>
        <Box flex="1 1 80%">
          <ProductList />
        </Box>
      </Box>
    </Box>
  );
};

export default Index;
