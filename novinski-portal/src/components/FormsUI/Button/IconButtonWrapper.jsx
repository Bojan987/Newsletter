import React from 'react';
import { useFormikContext } from 'formik';


const IconButtonWrapper = ({
  children,

}) => {
  const { submitForm } = useFormikContext();
  
  const handleSubmit = () => {
    
    submitForm();
  }

  return (
    <div
      onClick={handleSubmit}
    >
      {children}
    </div>
  );
};

export default IconButtonWrapper;