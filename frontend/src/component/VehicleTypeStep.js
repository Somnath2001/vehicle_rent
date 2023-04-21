import React, { useState, useEffect } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import axios from "axios";

export default function VehicleTypeStep(props) {
  const { formData, setFormData } = props;
  const [types, setTypes] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/vehicles`)
      .then((res) => {
        setTypes(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleVehicleTypeChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      vehicleType: event.target.value,
    }));
  };

  return (
    <FormControl variant="outlined" style={{ width: 600 }}>
      <InputLabel id="vehicle-type-label">Vehicle Type</InputLabel>
      <Select
        labelId="vehicle-type-label"
        id="vehicle-type-select"
        value={formData.vehicleType}
        onChange={handleVehicleTypeChange}
        label="Vehicle Type"
      >
        {types
          .filter((type, index, self) => {
            return index === self.findIndex((t) => t.type === type.type);
          })
          .map((type) => (
            <MenuItem key={type._id} value={type.type}>
              {type.type}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
}
