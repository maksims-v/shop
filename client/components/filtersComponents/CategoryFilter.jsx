import { useDispatch, useSelector } from 'react-redux';
import { setCategoryChecked } from '@/state/searchPageSlice';
import { Box, Typography, FormControl, FormControlLabel, Checkbox, FormGroup } from '@mui/material';

const CategoryFilter = () => {
  const dispatch = useDispatch();
  const category = useSelector((state) => state.search.category);
  const status = useSelector((state) => state.search.status);
  const mobile = useSelector((state) => state.search.mobile);

  const handleChange = (event) => {
    dispatch(setCategoryChecked(event.target.name));
  };

  return (
    <Box mb="10px">
      <Typography sx={{ mb: mobile ? '-5px' : '2px' }} fontWeight="bold">
        {mobile ? null : 'CLOTHING & SHOES'}
      </Typography>
      <FormControl sx={{ pl: '8px' }} component="fieldset" variant="standard">
        <FormGroup>
          {category &&
            category.map((item, index) => (
              <FormControlLabel
                control={
                  <Checkbox
                    sx={{ p: '2px' }}
                    disabled={status === 'resolved' ? false : true}
                    onChange={handleChange}
                    name={item.toLowerCase()}
                  />
                }
                label={item.charAt(0).toUpperCase() + item.slice(1)}
                key={item}
              />
            ))}
        </FormGroup>
      </FormControl>
    </Box>
  );
};

export default CategoryFilter;
