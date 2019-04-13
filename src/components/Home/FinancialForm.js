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

const FinancialFormInContext = ({ firebase, authUser, onSubmit }) => {
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
        <CardHeader title="Financials" />
        <CardContent>
          <Question defaultValue={'no'} groupName="taxDirectToIRS">
            Did you make any estimated tax payments during 2018 which you
            paid directly to IRS yourself and not through your employer?
        </Question>
          <Question defaultValue={'no'} groupName="taxDirectToState">
            Did you make any estimated tax payments to the state tax office
            during 2018 which you paid yourself and not through your employer?
        </Question>
          <Question defaultValue={'no'} groupName="extensionRequest">
            Did you file any forms requesting an extension to file
            a tax return with IRS?
        </Question>
          <Question defaultValue={'no'} groupName="visitingTheUS1">
            Did you file any forms requesting an extension to file a
            tax return with the State Tax office?
        </Question>

          <Question defaultValue={'no'} groupName="visitingTheUS1">
            Did you file any forms requesting an extension to file a
            tax return with the State Tax office?
        </Question>


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

const FinancialForm = ({ onSubmit }) => {
  return (
    <FirebaseContext.Consumer>
      {firebase => (
        <AuthUserContext.Consumer>
          {authUser => (
            <FinancialFormInContext firebase={firebase} authUser={authUser} onSubmit={onSubmit} />
          )}
        </AuthUserContext.Consumer>
      )}
    </FirebaseContext.Consumer>
  );
};


export default FinancialForm;
