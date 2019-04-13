import React, { useState } from 'react';
import RadioPair from './RadioPair';

import './form-question.css';

const FormTextQuestion = ({ children, placeholder }) => {
  return (
    <div className="question-container">
      <p>{children}</p>
      <TextField required label={placeholder} />
    </div>
  );
};

export default FormQuestion;
