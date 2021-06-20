import React from 'react';
import { TextField } from '@material-ui/core';
import { useField, useFormikContext } from 'formik';
import { Autocomplete } from '@material-ui/lab';
import data from '../../../data/countries.json'




const AutoCompleteWrapper = ({
  name,
  label,
  ...otherProps
}) => {
 
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);

  const handleChange = (evt,value)=> {
    
    value && setFieldValue(name, value.name);
  };

  const configSelect = {
    ...field,
    ...otherProps,
    variant: 'outlined',
    fullWidth: true,
    
  };

  if (meta && meta.touched && meta.error) {
    configSelect.error = true;
    configSelect.helperText = meta.error;
  }

  return (
    
    <Autocomplete
        
        autoSelect
        id="countries"
        options={data}
        renderInput={(params) => (
          <TextField
          
            {...params}
            {...configSelect}
            label={label}
            
            
          />
        )}
        
        getOptionLabel={(option) => option.name}
        onChange={handleChange}
        getOptionSelected={(option,value)=>(option.id===value.id)}
      />
  );
};

export default AutoCompleteWrapper;