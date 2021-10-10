import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

export default function RadioButtonsGroup({componentName = "", options = [], values, setValues}){  
    
    
  const handleChange = (event) => {
    const newValues = event.target.value    
    setValues({...values, [componentName] : newValues})
  };

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{componentName}</FormLabel>
      <RadioGroup aria-label="componentName" name="gender1" value={values[componentName]} onChange={handleChange}>
        {options.map(option => (
            <FormControlLabel value={option} control={<Radio />} label={option} />        
        ))}
        
      </RadioGroup>
    </FormControl>
  );
} 
