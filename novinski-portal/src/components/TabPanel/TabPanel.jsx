import { Box } from '@material-ui/core';
import React from 'react'

const TabPanel = (props)=> {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box pt={3}>
            {children}
          </Box>
        )}
      </div>
    );
  }

  



  
  

  export default TabPanel
  