import React from 'react';
import Button from '@material-ui/core/Button';
import Question from '../Common/FormQuestion';

import './generic-modal.css';

const AboutYouForm = ({ onSubmit }) => {
  return (
    <form className="form" method="post" action="/home" onSubmit={(event) => {
      console.log(event.target)
    }}>
      <div className="form-section">
        <h5>About You</h5>
        <Question defaultValue={'yes'} groupName="residencyStatus1">
          Have you been a US citizen, by birth or naturalization, on the
          last day of 2018?
        </Question>
        <Question defaultValue={'yes'} groupName="residencyStatus2">
          Have you ever been a green card holder?
        </Question>
        <Question defaultValue={'yes'} groupName="residencyStatus3">
          Have you ever applied for US citizenship / lawful residence?
        </Question>
      </div>

      <div className="form-section">
        <h5>Visiting the US</h5>
        <Question defaultValue={'yes'} groupName="visitingTheUS1">
          Were you in the US during the 2018 tax year?
        </Question>
        <Question defaultValue={'yes'} groupName="visitingTheUS2">
          Are you still in the US?
        </Question>
        <p>When was your first visit to the US?</p>
        <select name="visitingTheUS3">
          {[...Array(50).keys()].map(i => (
            <option value={2019 - i}>{2019 - i}</option>
          ))}
        </select>
      </div>
      <Button type="submit" color="primary">
        Submit
      </Button>
    </form>
)}

export default AboutYouForm;
