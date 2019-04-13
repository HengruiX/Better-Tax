import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextInput from '../Common/FormTextInput';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import countries from '../../constants/countries.js';
import Dropdown from '../Common/Dropdown.js'
import { scrapeI94 } from '../../utils/ScrapUtils';
import { updateUser } from '../../utils/DBUtils';
import { FirebaseContext } from '../Firebase';
import { AuthUserContext } from '../Session';
import './generic-modal.css';

const handleChange = (name, scrapePayload, setScrapePayload) => event => {
  setScrapePayload({ ...scrapePayload, [name]: event.target.value });
}

const AboutYouFormInContext = ({ firebase, authUser, onSubmit }) => {
  const [scrapePayload, setScrapePayload] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    birthday: "2017-05-24",
    citizenship: '',
    passportNumber: '',
  });
  const [editable, setEditable] = useState(true);
  const { firstName, middleName, lastName, birthday, citizenship, passportNumber } = scrapePayload;
  return (
    <Card>
      <form className="modal-form" onSubmit={(event) => {
        event.preventDefault();
        setEditable(false);

        const data = new FormData(event.target);
        var formObject = {};
        data.forEach((value, key) => { formObject[key] = value });
        updateUser(firebase, authUser, formObject).then(
          () => {
            scrapeI94({
              fn: firstName,
              ln: lastName,
              bd: birthday.split('-')[2],
              bm: birthday.split('-')[1],
              by: birthday.split('-')[0],
              pp: passportNumber,
              pc: citizenship,
            })
              .then((resp) => {
                updateUser(firebase, authUser, resp).then(() => {
                  onSubmit();
                  setEditable(true);
                });
              });
          }
        );
        
      }}>
        <CardHeader title="About You" />
        <CardContent className="form-section">
          <TextInput placeholder={'First Name'} name="firstName" value={firstName} onChange={handleChange('firstName', scrapePayload, setScrapePayload)}></TextInput>
          <TextInput placeholder={'Middle Name'} name="middleName" value={middleName} onChange={handleChange('middleName', scrapePayload, setScrapePayload)}></TextInput>
          <TextInput placeholder={'Last Name'} name="lastName" value={lastName} onChange={handleChange('lastName', scrapePayload, setScrapePayload)}></TextInput>
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
              value={birthday}
              onChange={handleChange('birthday', scrapePayload, setScrapePayload)}
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
              value={citizenship}
              onChange={handleChange('citizenship', scrapePayload, setScrapePayload)}
              data={countries}/>
          </div>

          <TextInput 
              placeholder={'Passport Number'} 
              name="passportNumber"
              value={passportNumber}
              onChange={handleChange('passportNumber', scrapePayload, setScrapePayload)}
          ></TextInput>
          </CardContent>
          <CardActions>
            {editable ? (
              <Button type="submit" color="primary">
                Submit
              </Button>):(
              <CircularProgress size={30} thickness={5} />
            )}
            
          </CardActions>
      </form>
    </Card>
)}

const AboutYouForm = ({ onSubmit }) => {
  return (
    <FirebaseContext.Consumer>
      {firebase => (
        <AuthUserContext.Consumer>
          {authUser => (
            <AboutYouFormInContext firebase={firebase} authUser={authUser} onSubmit={onSubmit} />
          )}
        </AuthUserContext.Consumer>
      )}
    </FirebaseContext.Consumer>
  );
};

export default AboutYouForm;
