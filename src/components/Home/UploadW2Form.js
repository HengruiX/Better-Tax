import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import DragAndDrop from "../Lib/DragAndDrop";
import { FilePicker } from "react-file-picker";

import "./generic-modal.css";
import "./w2-form.css";

const UploadW2Form = ({ onSubmit }) => {
  const [file, setFile] = useState(null);
  const handleChange = files => {
    if (files.length == 0) {
      setFile(null);
    } else {
      setFile(files[0]);
    }
  };
  return (
    <Card>
      <CardHeader title="Upload Your W2 Form" />
      <CardContent>
        {file == null ? (
          <DragAndDrop handleDrop={handleChange}>
            <FilePicker extensions={["pdf"]} onChange={file => setFile(file)}>
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
        <Button size="small" color="primary" disabled={file == null}>
          Submit
        </Button>
      </CardActions>
    </Card>
  );
};

export default UploadW2Form;
