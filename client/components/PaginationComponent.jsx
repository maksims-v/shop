import { useState } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';

const PaginationComponent = ({ page, handleChange, currentPage }) => {
  return (
    <Stack spacing={2}>
      <Typography>Page: {currentPage}</Typography>
      <Pagination onChange={handleChange} count={page} variant="outlined" shape="rounded" />
    </Stack>
  );
};

export default PaginationComponent;
