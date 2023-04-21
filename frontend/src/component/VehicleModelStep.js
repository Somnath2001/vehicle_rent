import React from "react";
import { FormControl, InputLabel, Input } from "@material-ui/core";

export default function VehicleModelStep(props) {
  const { formData, setFormData } = props;

  const handleVehicleModelChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      vehicleModel: event.target.value,
    }));
  };

  return (
    <FormControl variant="outlined" style={{ width: 400 }}>
      <InputLabel htmlFor="vehicle-model-input">Vehicle Model</InputLabel>
      <Input
        id="vehicle-model-input"
        value={formData.vehicleModel}
        onChange={handleVehicleModelChange}
        label="Vehicle Model"
      />
    </FormControl>
  );
}
