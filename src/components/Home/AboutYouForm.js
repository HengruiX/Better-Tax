import React from 'react';
import Button from '@material-ui/core/Button';
import Question from '../Common/FormQuestion';
import TextInput from '../Common/FormTextInput';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import countries from '../../constants/countries.js';
import Dropdown from '../Common/Dropdown.js'
import './generic-modal.css';

const AboutYouForm = ({ onSubmit }) => {
  return (
    <Card>
      <form className="modal-form" method="post" action="/home" onSubmit={(event) => {
        console.log(event.target)
      }}>
        <CardHeader title="About You" />
        <CardContent className="form-section">
          <TextInput placeholder={'First Name'} name="firstName"></TextInput>
          <TextInput placeholder={'Middle Name'} name="middleName"></TextInput>
          <TextInput placeholder={'Last Name'} name="lastName"></TextInput>
          <div className="field-with-label">
            <InputLabel
              htmlFor='birthday'
            >
              Birthday:
            </InputLabel>
            <TextField
              id="birthday"
              type="date"
              name="birthday"
              defaultValue="2017-05-24"
              InputLabelProps={{
                shrink: true
              }}
            />
          </div>
          <div className="field-with-label">
            <InputLabel
              htmlFor='citizenship'
            >
              Citizenship:
            </InputLabel>
            <Dropdown
              id="citizenship"
              name="citizenship"
              data={countries}/>
          </div>

          <TextInput placeholder={'Passport Number'} name="passportNumber"></TextInput>

          <TextInput placeholder={'Address'} name="AddressLine"></TextInput>
          <TextInput placeholder={'City'} name="City"></TextInput>
          <TextInput placeholder={'Zip Code'} name="zipCode"></TextInput>
          <TextInput placeholder={'Phone Number'} name="Phone Number"></TextInput>

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

          </CardContent>
          <CardActions>
            <Button type="submit" color="primary">
              Submit
            </Button>
          </CardActions>
      </form>
    </Card>
)}

export default AboutYouForm;
