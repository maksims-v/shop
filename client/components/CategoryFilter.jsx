import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryChecked, setChangePrice } from '@/state/searchPageSlice';
import { Box, Typography, FormControl, FormControlLabel, Checkbox, FormGroup } from '@mui/material';

const CategoryFilter = () => {
  const dispatch = useDispatch();
  const inputSearchValue = useSelector((state) => state.search.inputSearchValue);
  const category = useSelector((state) => state.search.metaData.category);

  const [state, setState] = useState(
    category
      ? category.reduce((obj, key) => {
          obj[key] = false;
          return obj;
        }, {})
      : [],
  );

  useEffect(() => {
    const categoryFilter = Object.entries(state);

    const getCategoryFilter = categoryFilter
      .filter((item, index) => {
        if (item[1]) return item;
      })
      .map((item) => {
        if (item[1]) return item[0];
      });

    dispatch(setCategoryChecked(getCategoryFilter));
  }, [state]);

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <Box mb="10px">
      <Typography sx={{ mb: '2px' }} fontWeight="bold">
        CLOTHING & SHOES
      </Typography>
      <FormControl sx={{ pl: '8px' }} component="fieldset" variant="standard">
        <FormGroup>
          {category &&
            category.map((item, index) => (
              <FormControlLabel
                control={
                  <Checkbox sx={{ p: '4px' }} onChange={handleChange} name={item.toLowerCase()} />
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