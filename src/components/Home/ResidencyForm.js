import React from 'react';
import Button from '@material-ui/core/Button';
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Question from '../Common/FormQuestion';
import { FirebaseContext } from '../Firebase';
import { AuthUserContext } from '../Session';
import { updateUser } from '../../utils/DBUtils';

import './generic-modal.css';

const ResidencyFormInContext = ({ firebase, authUser, onSubmit }) => {
  return (

    <Card>
      <form className="form" onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.target);
        var formObject = {};
        data.forEach((value, key) => { formObject[key] = value });
        updateUser(firebase, authUser, formObject).then(
          () => {
            onSubmit();
          }
        );
      }}>
        <CardHeader title="Residency Status" />
        <CardContent>
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
          <Question defaultValue={'no'} groupName="visitingTheUS1">
            Were you in the US during the 2018 tax year?
        </Question>
          <Question defaultValue={'no'} groupName="visitingTheUS2">
            Are you still in the US?
        </Question>
          <p>When was your first visit to the US?</p>
          <select name="visitingTheUS3">
            {[...Array(50).keys()].map(i => (
              <option value={2019 - i}>{2019 - i}</option>
            ))}
          </select>
        </CardContent>
        <CardActions>
          <Button type="submit" color="primary">
            Submit
      </Button>
        </CardActions>
      </form>
    </Card >

  )
}

const ResidencyForm = ({ onSubmit }) => {
  return (
    <FirebaseContext.Consumer>
      {firebase => (
        <AuthUserContext.Consumer>
          {authUser => (
            <ResidencyFormInContext firebase={firebase} authUser={authUser} onSubmit={onSubmit} />
          )}
        </AuthUserContext.Consumer>
      )}
    </FirebaseContext.Consumer>
  );
};


export default ResidencyForm;
