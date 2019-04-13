import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Question from '../Common/FormQuestion';
import TextInput from '../Common/FormTextInput';
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import { updateUser } from '../../utils/DBUtils';
import { FirebaseContext } from '../Firebase';
import { AuthUserContext } from '../Session';
import './generic-modal.css';

const MoreAboutYouFormInContext = ({ firebase, authUser, onSubmit }) => {
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
            onSubmit();
            setEditable(true);
          }
        );

      }}>
        <CardHeader title="About You" />
        <CardContent className="form-section">
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
          {editable ? (
            <Button type="submit" color="primary">
              Submit
              </Button>) : (
              <CircularProgress size={30} thickness={5} />
            )}

        </CardActions>
      </form>
    </Card>
  )
}

const MoreAboutYouForm = ({ onSubmit }) => {
  return (
    <FirebaseContext.Consumer>
      {firebase => (
        <AuthUserContext.Consumer>
          {authUser => (
            <MoreAboutYouFormInContext firebase={firebase} authUser={authUser} onSubmit={onSubmit} />
          )}
        </AuthUserContext.Consumer>
      )}
    </FirebaseContext.Consumer>
  );
};

export default MoreAboutYouForm;
