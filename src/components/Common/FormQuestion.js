import React, { useState } from 'react';
import RadioPair from './RadioPair';

import './form-question.css';

const FormQuestion = ({ children, defaultValue, groupName }) => {
  return (
    <div className="question-container">
      <p>{children}</p>
      <RadioPair defaultValue={defaultValue} groupName={groupName} />
    </div>
  );
};

export default FormQuestion;
