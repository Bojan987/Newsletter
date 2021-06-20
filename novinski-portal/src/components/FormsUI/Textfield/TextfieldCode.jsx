import React, { useState,useEffect, useRef, createRef } from "react";

import { makeStyles } from "@material-ui/core/styles";
import {  useFormikContext } from "formik";

const useStyles = makeStyles((theme) => ({
  
  codeField: {
    width: 50,
    height: 50,
    border: "2px solid #CCCCCC",
    color: "#909090",
    textAlign: "center",
  },
  spanAlign:{
    backgroundColor:'#CCCCCC',
    width:6,
    height:3
    
  }
}));

const TextfieldCode = ({ name }) => {
  const { setFieldValue } = useFormikContext();
  const refs = useRef([...new Array(6)].map(() => createRef()))
  const [code, setCode] = useState(new Array(6).fill(""));

  const classes = useStyles();

  useEffect(() => {
    
    setFieldValue(name, parseInt(code.join('')));
  }, [code,name,setFieldValue])
 

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;
    
    setCode([
      ...code.map((value, idx) => (idx === index ? element.value : value)),
    ]);
    if ( refs.current[index+1] && element.value) {
      refs.current[index+1].current.focus();
    }
  };

  const pasteData = (paste, size) => {
    const data = new Array(6).fill("");
    if (paste.length > size) {
      const code = paste.split("").slice(0, size);
      return code;
    } else if (paste.length < size) {
      const pasteToArray = paste.split("");
      const code = [...pasteToArray, ...data].slice(0, size);
      return code;
    } else return paste.split("");
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text").trim();
    setCode(pasteData(paste, 6));
  };
  
  const inputOptions = {
    type:'text',
    name:'code',
    maxLength:'1',
  }
  const handleKeyUp = (e,index) => {
    const {key}=e
    const {value}=e.target
    if (refs.current[index-1] && value==='' && key==='Backspace' ) {
      refs.current[index-1].current.focus();
    }
  };

  return (
    <>
      {code.map((data, index) => {
        return (
            <React.Fragment key={index} >
              
            <input
              ref={refs.current[index]}
             {...inputOptions}
              key={index}
              value={data}
              className={classes.codeField }
              onChange={(e) => handleChange(e.target, index)}
              onFocus={(e) => e.target.select()}
              onPaste={(e) => handlePaste(e)}
              onKeyUp={e=>handleKeyUp(e,index)}
            />
            {index !==code.length-1 && <span className={classes.spanAlign}></span>}
            </React.Fragment>
        );
      })}
    </>
  );
};

export default TextfieldCode;
