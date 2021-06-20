import React, { useEffect } from 'react';
import { TextField } from '@material-ui/core';
import { useField,useFormikContext } from 'formik';
import {makeStyles} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  disabledInput: {
      border: 'none',
      padding:'12px 14px',
      '&&&::before':{
        borderBottom:'none'
      },
      '&&::after':{
        borderBottom:'none'
      }
  }, 
 
}))

const TextfieldWrapper = ({
  name,
  noBorder,
  disabled,
  value,
  ...otherProps
}) => {
  
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);
  const classes= useStyles()
  const configTextfield = {
    ...field,
    ...otherProps,
    disabled,
    fullWidth: true,
    ...(!noBorder) && {variant:'outlined'},
    ...(noBorder) && {InputProps:{ disableUnderline: true },label:''}
  };
  
  if (meta && meta.touched && meta.error) {
    configTextfield.error = true;
    configTextfield.helperText = meta.error;
  }

  useEffect(()=>{
    if(name&&value!==undefined) setFieldValue(name,value)
  },[name,value,setFieldValue])

  return (
    <TextField {...configTextfield}   className={noBorder ? classes.disabledInput : ''} />
  );
};

export default TextfieldWrapper;