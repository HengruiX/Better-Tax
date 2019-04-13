import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
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

const AddressFormInContext = ({ firebase, authUser, onSubmit }) => {
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

          <TextInput placeholder={'Address'} name="addressLine"></TextInput>
          <TextInput placeholder={'City'} name="city"></TextInput>
          <TextInput placeholder={'Zip Code'} name="zipCode"></TextInput>
          <TextInput placeholder={'Phone Number'} name="phoneNumber"></TextInput>
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

const AddressForm = ({ onSubmit }) => {
  return (
    <FirebaseContext.Consumer>
      {firebase => (
        <AuthUserContext.Consumer>
          {authUser => (
            <AddressFormInContext firebase={firebase} authUser={authUser} onSubmit={onSubmit} />
          )}
        </AuthUserContext.Consumer>
      )}
    </FirebaseContext.Consumer>
  );
};

export default AddressForm;
