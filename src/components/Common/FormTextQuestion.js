import React, { useState } from 'react';
import RadioPair from './RadioPair';
import TextField from '@material-ui/core/TextField';

import './form-question.css';

const FormTextQuestion = ({ children, placeholder, name, ...props }) => {
  return (
    <div className="question-container">
      <p>{children}</p>
      <TextField required label={placeholder} name={name} {...props} />
    </div>
  );
};

export default FormTextQuestion;
