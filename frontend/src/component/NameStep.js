import React from "react";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({}));

export default function NameStep(props) {
  const { formData, setFormData } = props;

  const handleFirstNameChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      firstName: event.target.value,
    }));
  };

  const handleLastNameChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      lastName: event.target.value,
    }));
  };

  return (
    <div>
      <h1 className="h1Name">First, What's your Name</h1>

      <TextField
        variant="outlined"
        style={{ width: 500 }}
        required
        id="firstName"
        label="First Name"
        margin="normal"
        value={formData.firstName}
        onChange={handleFirstNameChange}
      />
      <br />
      <TextField
        style={{ width: 500 }}
        variant="outlined"
        required
        id="lastName"
        label="Last Name"
        value={formData.lastName}
        onChange={handleLastNameChange}
      />
    </div>
  );
}
