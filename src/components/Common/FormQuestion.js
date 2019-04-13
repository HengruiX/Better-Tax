import React, { useState } from 'react';
import RadioPair from './RadioPair';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { Field } from 'formik';

import './form-question.css';

const FormQuestion = ({ children, defaultValue }) => {
  return (
    <div className="question-container">
      <p>{children}</p>
      <Field component={RadioPairInput} />
    </div>
  );
};

const RadioPairInput = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => (
  <div>
    <RadioPair defaultValue={props.defaultValue} />
  </div>
);

export default FormQuestion;
