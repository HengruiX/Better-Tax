import React from 'react';
import Button from '@material-ui/core/Button';
import InputLabel from "@material-ui/core/InputLabel";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Question from '../Common/FormQuestion';
import Dropdown from '../Common/Dropdown';
import { FirebaseContext } from '../Firebase';
import { AuthUserContext } from '../Session';
import { updateUser } from '../../utils/DBUtils';

import './generic-modal.css';

const ResidencyFormInContext = ({ firebase, authUser, onSubmit }) => {
  return (

    <Card>
      <form className="modal-form" onSubmit={(event) => {
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
        <CardHeader title="Residency Info" />
        <CardContent>
          <Question defaultValue={'yes'} groupName="previousUSCitizen">
            Have you been a US citizen, by birth or naturalization, on the
            last day of 2018?
        </Question>
          <Question defaultValue={'yes'} groupName="greenCard">
            Have you ever been a green card holder?
        </Question>
          <Question defaultValue={'yes'} groupName="appliedForCitizen">
            Have you ever applied for US citizenship / lawful residence?
        </Question>
          <Question defaultValue={'no'} groupName="inUSThisYear">
            Were you in the US during the 2018 tax year?
        </Question>
          <Question defaultValue={'no'} groupName="stillInUS">
            Are you still in the US?
        </Question>
        <div className="field-with-label">
          <InputLabel
            htmlFor='citizenship'
          >
            Date of first visit to USA:
          </InputLabel>
          <Dropdown
            id="firstVisitToUS"
            name="firstVisitToUS"
            data={[...Array(20).keys()].map(i => 2019 - i)}/>
        </div>
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
