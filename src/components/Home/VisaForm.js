import React from "react";
import Button from "@material-ui/core/Button";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Question from "../Common/FormQuestion";
import Dropdown from "../Common/Dropdown";
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
          <Field component="select" name="visaType">
            {["F1"].map(i => (
              <option value={i}>{i}</option>
            ))}
          </Field>
          <p>Visa Issue Date</p>
          <form>
            <TextField
              id="date"
              name="visaIssueDate"
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
              name="visaExpiryDate"
              type="date"
              defaultValue="2017-05-24"
              InputLabelProps={{
                shrink: true
              }}
            />
          </form>
          <p>When was your first visit to the US?</p>
          <Dropdown
            id="firstUSVisit"
            name="firstUSVisit"
            data={[...Array(20).keys()].map(i => 2019 - i)}
            />
          <Button type="submit" color="primary">
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default VisaForm;
