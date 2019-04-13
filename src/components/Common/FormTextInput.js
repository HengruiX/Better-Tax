import React, { useState } from 'react';
import RadioPair from './RadioPair';
import TextField from '@material-ui/core/TextField';

import './form-question.css';

const FormTextQuestion = ({ placeholder, name, ...props }) => {
  return (
    <div className="question-container">
      <TextField required label={placeholder} name={name} {...props} />
    </div>
  );
};

export default FormTextQuestion;
