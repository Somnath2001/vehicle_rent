import React from "react";
import {
  RadioGroup,
  Radio,
  FormControlLabel,
  FormControl,
} from "@material-ui/core";

export default function WheelsStep(props) {
  const { formData, setFormData } = props;

  const handleWheelsChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      wheels: event.target.value,
    }));
  };

  return (
    <FormControl>
      <RadioGroup
        aria-label="wheels"
        name="wheels"
        value={formData.wheels}
        onChange={handleWheelsChange}
      >
        <FormControlLabel value="2" control={<Radio />} label="Two wheels" />
        <FormControlLabel value="3" control={<Radio />} label="Three wheels" />
        <FormControlLabel value="4" control={<Radio />} label="Four wheels" />
      </RadioGroup>
    </FormControl>
  );
}
