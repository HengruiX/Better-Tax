import React from 'react';
import Button from '@material-ui/core/Button';
import Question from '../Common/FormQuestion';
import TextQuestion from '../Common/FormTextQuestion';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl'
import countries from '../../constants/countries.js';
import Dropdown from '../Common/Dropdown.js'
import './generic-modal.css';

const AboutYouForm = ({ onSubmit }) => {
  return (
    <form className="form" method="post" action="/home" onSubmit={(event) => {
      console.log(event.target)
    }}>
      <div className="form-section">
        <h5>About You</h5>
        <TextQuestion placeholder={'First Name'} name="firstName"></TextQuestion>
        <TextQuestion placeholder={'Middle Name'} name="middleName"></TextQuestion>
        <TextQuestion placeholder={'Last Name'} name="lastName"></TextQuestion>
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
        <p>Passport Issuing Country</p>
        <Dropdown
          id="citizenship"
          name="citizenship"
          data={countries}/>

        <TextQuestion placeholder={'Passport Number'} name="passportNumber"></TextQuestion>

        <Question defaultValue={'no'} groupName="dependent">
          Can you be claimed as a dependent on someone else's US tax return?
        </Question>

        <Question defaultValue={'no'} groupName="marriedLastDay">
          Were you married on the last day of 2018?
        </Question>

        <Question defaultValue={'yes'} groupName="usIncome">
          Did you have US income in 2018?
        </Question>

        <Question defaultValue={'yes'} groupName="fullTimeStudent">
          Are you a full time student or scholar in a US educational institution?
        </Question>

        <Question defaultValue={'yes'} groupName="degreeCandidate">
          Are you a degree candidate in a US educational institution?
        </Question>

      </div>
      <Button type="submit" color="primary">
        Submit
      </Button>
    </form>
)}

export default AboutYouForm;
