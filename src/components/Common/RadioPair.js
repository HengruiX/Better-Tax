import React, { useState } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const RadioPair = ({ defaultValue, groupName }) => {
  const [value, setValue] = useState(defaultValue);
  return (
    <FormControl component="fieldset" className="radio-pair">
      <RadioGroup
        aria-label="Sorry"
        name={groupName}
        value={value}
        onChange={event => setValue(event.target.value)}
        className="radio-pair-group"
        style={{ display: 'inline-table' }}
      >
        <FormControlLabel value="yes" control={<Radio />} label="Yes" />
        <FormControlLabel value="no" control={<Radio />} label="No" />
      </RadioGroup>
    </FormControl>
  );
};

export default RadioPair;
