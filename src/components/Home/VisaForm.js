import React from "react";
import Button from "@material-ui/core/Button";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Question from "../Common/FormQuestion";
import TextField from "@material-ui/core/TextField";

import "./generic-modal.css";

const VisaForm = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          this.submitForm(values);
          setSubmitting(false);
          onSubmit();
        }, 400);
      }}
    >
      {({ isSubmitting }) => (
        <Form className="form">
          <h5>Visa Details</h5>
          <p>What visa do you have?</p>
          <Field component="select" name="visitingTheUS3">
            {["F1"].map(i => (
              <option value={i}>{i}</option>
            ))}
          </Field>
          <p>Visa Issue Date</p>
          <form>
            <TextField
              id="date"
              type="date"
              defaultValue="2017-05-24"
              InputLabelProps={{
                shrink: true
              }}
            />
          </form>
          <p>Visa Expiry Date</p>
          <form>
            <TextField
              id="date"
              type="date"
              defaultValue="2017-05-24"
              InputLabelProps={{
                shrink: true
              }}
            />
          </form>
          <h5>Visiting the US</h5>
          <Question defaultValue={"yes"} groupName="visitingTheUS1">
            Were you in the US during the 2018 tax year?
          </Question>
          <Question defaultValue={"yes"} groupName="visitingTheUS2">
            Are you still in the US?
          </Question>
          <p>When was your first visit to the US?</p>
          <Field component="select" name="visitingTheUS3">
            {[...Array(50).keys()].map(i => (
              <option value={2019 - i}>{2019 - i}</option>
            ))}
          </Field>
          <Button type="submit" color="primary">
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default VisaForm;
