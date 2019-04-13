import React, { useState, Component } from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import DragAndDrop from "../Lib/DragAndDrop";
import { FilePicker } from "react-file-picker";
import { parseW2 } from '../../utils/FileUtils';
import { FirebaseContext } from '../Firebase';
import { AuthUserContext } from '../Session';
import { saveW2Info } from '../../utils/DBUtils';

import "./generic-modal.css";
import "./w2-form.css";

class UploadW2FormInContext extends Component {
  state = { file: null };

  handleChange = files => {
    if (files.length == 0) {
      this.setState({ file: null });
    } else {
      this.setState({ file: files[0] });
    }
  };
  handleSubmit = () => {
    parseW2(this.state.file, this.props.firebase).then (jsondata => {
      saveW2Info(this.props.firebase, this.props.authUser, jsondata).then(
        () => {
          this.props.onSubmit();
        }
      )
    });
  }

  render() {
    return (
      <Card>
        <CardHeader title="Upload Your W2 Form" />
        <CardContent>
          {this.state.file == null ? (
            <DragAndDrop handleDrop={this.handleChange}>
              <FilePicker extensions={["pdf"]} onChange={file => this.setState({ file: file })}>
                <div className="drop-box">
                  <Typography className="drop-text" variant="h7" component="p">
                    Drag and Drop Your File or CLick Here
                </Typography>
                </div>
              </FilePicker>
            </DragAndDrop>
          ) : (
              <div className="drop-box-succeed">
                <Typography
                  className="drop-text-succeed"
                  variant="h7"
                  component="p"
                >
                  Uploaded! Click Submit to Process
            </Typography>
              </div>
            )}
        </CardContent>
        <CardActions>
          <Button size="small" color="primary" disabled={this.state.file == null} onClick={this.handleSubmit}>
            Submit
        </Button>
        </CardActions>
      </Card>
    );
  }
}

const UploadW2Form = ({onSubmit}) => {
  return (
    <FirebaseContext.Consumer>
      {firebase => (
        <AuthUserContext.Consumer>
          {authUser => (
            <UploadW2FormInContext firebase={firebase} authUser={authUser} onSubmit={onSubmit}/>
          )}
        </AuthUserContext.Consumer>
      )}
    </FirebaseContext.Consumer>
  );
};

export default UploadW2Form;
