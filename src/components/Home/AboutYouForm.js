import React from 'react';
import Button from '@material-ui/core/Button';
import Question from '../Common/FormQuestion';
import TextQuestion from '../Common/FormTextQuestion';
import TextField from '@material-ui/core/TextField';

import './generic-modal.css';

const AboutYouForm = ({ onSubmit }) => {
  return (
    <form className="form" method="post" action="/home" onSubmit={(event) => {
      console.log(event.target)
    }}>
      <div className="form-section">
        <h5>About You</h5>
        <TextQuestion placeholder={'First Name'} name="firstName">First Name</TextQuestion>
        <TextQuestion placeholder={'Middle Name'} name="middleName">Middle Name</TextQuestion>
        <TextQuestion placeholder={'Last Name'} name="lastName">Last Name</TextQuestion>
        <p>Birthday</p>
        <TextField
          id="date"
          type="date"
          name="birthday"
          defaultValue="2017-05-24"
          InputLabelProps={{
            shrink: true
          }}
        />
      </div>
      <Button type="submit" color="primary">
        Submit
      </Button>
    </form>
)}

export default AboutYouForm;
