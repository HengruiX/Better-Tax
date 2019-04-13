import React, {useState} from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Select from '@material-ui/core/Select';
import Question from "../Common/FormQuestion";
import Dropdown from "../Common/Dropdown";
import TextField from "@material-ui/core/TextField";
import MenuItem from '@material-ui/core/MenuItem';
import { FirebaseContext } from '../Firebase';
import { AuthUserContext } from '../Session';
import { updateUser } from '../../utils/DBUtils';

import "./generic-modal.css";

const VisaFormInContext = ({ firebase, authUser, onSubmit }) => {

  const [field, setField] = useState(1);

  return (
    <Card>
      <form onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.target);
        var formObject = {};
        data.forEach((value, key) => { formObject[key] = value });
        console.log(formObject);
        updateUser(firebase, authUser, formObject).then(
          () => {
            onSubmit();
          }
        );
      }}>
        <CardHeader title="Visa Info" />
        <CardContent>
          <p>What visa do you have?</p>
          <Select
            value={field}
            onChange={e => {setField(e.target.value)}}
            inputProps={{
              name: 'visaType',
            }}
          >
            <MenuItem value={1}>F1</MenuItem>
            <MenuItem value={2}>J1</MenuItem>
          </Select>
          <p>Visa Issue Date</p>

          <TextField
            name="visaIssueDate"
            id="date"
            type="date"
            defaultValue="2017-05-24"
            InputLabelProps={{
              shrink: true
            }}
          />

          <p>Visa Expiry Date</p>

          <TextField
            name="visaExpiryDate"
            id="date"
            type="date"
            defaultValue="2017-05-24"
            InputLabelProps={{
              shrink: true
            }}
          />
          <Question defaultValue={"yes"} groupName="inUSDuring2018">
            Were you in the US during the 2018 tax year?
          </Question>
          <Question defaultValue={"yes"} groupName="stillInUS">
            Are you still in the US?
          </Question>

          <p>When was your first visit to the US?</p>
          <Dropdown
            id="firstUSVisit"
            name="firstUSVisit"
            data={[...Array(20).keys()].map(i => 2019 - i)}
          />
        </CardContent>
        <CardActions>
          <Button type="submit" color="primary">
            Submit
            </Button>
        </CardActions>
      </form>
    </Card >
  );
};

const VisaForm = ({ onSubmit }) => {
  return (
    <FirebaseContext.Consumer>
      {firebase => (
        <AuthUserContext.Consumer>
          {authUser => (
            <VisaFormInContext firebase={firebase} authUser={authUser} onSubmit={onSubmit} />
          )}
        </AuthUserContext.Consumer>
      )}
    </FirebaseContext.Consumer>
  );
};

export default VisaForm;
