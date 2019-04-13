// Render Prop
import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Button from "@material-ui/core/Button";
import { compose } from "recompose";
import { withFirebase } from "../Firebase";
import { withRouter } from "react-router-dom";

import * as ROUTES from "../../constants/routes";

class BaseForm extends Component {
  state = { error: null };

  submitForm(values) {
    this.props.firebase
      .doSignInWithEmailAndPassword(values.email, values.password)
      .then(() => {
        this.setState({ error: null });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });
  }

  render() {
    return (
      <div>
        <Formik
          initialValues={{ email: "", password: "" }}
          validate={values => {
            let errors = {};
            if (!values.email) {
              errors.email = "Required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              this.submitForm(values);
              setSubmitting(false);
            }, 400);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="form">
              <img
                src="https://www.newton.ac.uk/files/covers/968361.jpg"
                width="300"
                height="200"
              />
              <Field className="form-text-field" type="email" name="email" />
              <ErrorMessage name="email" component="div" />
              <Field
                className="form-text-field"
                type="password"
                name="password"
              />
              <ErrorMessage name="password" component="div" />
              {this.state.error && "Signin Failed"}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                style={{ 'margin-bottom': '15px' }}
              >
                Sign in
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => this.props.switchView(false)}
              >
                Get an account
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}

const SignInForm = compose(
  withRouter,
  withFirebase
)(BaseForm);

export default SignInForm;
