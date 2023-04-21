import "date-fns";
import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { FormControl, InputLabel } from "@material-ui/core";

export default function DateRangeStep(props) {
  const { formData, setFormData } = props;

  const handleStartDateChange = (date) => {
    setFormData((prevState) => ({
      ...prevState,
      startDate: date,
    }));
  };

  const handleEndDateChange = (date) => {
    setFormData((prevState) => ({
      ...prevState,
      endDate: date,
    }));
  };

  return (
    <div>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <FormControl>
          <KeyboardDatePicker
            style={{ width: 300 }}
            id="start-date-input"
            disableToolbar
            variant="outlined"
            label="Start Date"
            format="MM/dd/yyyy"
            margin="normal"
            value={formData.startDate}
            onChange={handleStartDateChange}
            KeyboardButtonProps={{
              "aria-label": "change start date",
            }}
          />
          <KeyboardDatePicker
            style={{ width: 300 }}
            id="end-date-input"
            disableToolbar
            variant="outlined"
            format="MM/dd/yyyy"
            margin="normal"
            value={formData.endDate}
            onChange={handleEndDateChange}
            label="End Date"
            KeyboardButtonProps={{
              "aria-label": "change end date",
            }}
          />
        </FormControl>
      </MuiPickersUtilsProvider>
    </div>
  );
}
