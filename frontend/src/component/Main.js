import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Stepper, Step, StepLabel, Button } from "@material-ui/core";
import NameStep from "./NameStep";
import WheelsStep from "./WheelsStep";
import VehicleTypeStep from "./VehicleTypeStep";
import VehicleModelStep from "./VehicleModelStep";
import DateRangeStep from "./DateRangeStep";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "80%",
    margin: "auto",
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

const steps = [
  { label: "Name", component: NameStep },
  { label: "Wheels", component: WheelsStep },
  { label: "Vehicle Type", component: VehicleTypeStep },
  { label: "Vehicle Model", component: VehicleModelStep },
  { label: "Date Range", component: DateRangeStep },
];

function getStepContent(stepIndex, formData, setFormData) {
  const StepComponent = steps[stepIndex].component;
  return <StepComponent formData={formData} setFormData={setFormData} />;
}

toast.info("Welcome to Vehicle Rental System ");

export default function BookingForm() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [success, setSuccess] = useState(false);

  console.log(activeStep);
  console.log(steps.length);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    wheels: "",
    vehicleType: "",
    vehicleModel: "",
    startDate: null,
    endDate: null,
  });

  console.log(formData);

  // useEffect(() => {
  //   if (success) {
  //     toast.success("Booking Successful");
  //     setFormData("");
  //   }
  // }, [success]);

  const handleNext = () => setActiveStep((prevStep) => prevStep + 1);
  const handleBack = () => setActiveStep((prevStep) => prevStep - 1);
  // const handleReset = () => setActiveStep(0);

  const handleSubmit = () => {
    setSuccess(false);
    axios
      .post(`${process.env.REACT_APP_API_URL}/bookings`, formData)
      .then((response) => {
        console.log(response);
        if (response.data) {
          toast.info(response.data);
          // setSuccess(true);
          setTimeout(() => {
            setActiveStep(0);
            setFormData("");
          }, 2000);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(error);
        setTimeout(() => {
          setActiveStep(0);
        }, 1000);
      });
  };

  const isNextDisabled = () => {
    switch (activeStep) {
      case 0:
        return formData.firstName === "" || formData.lastName === "";
      case 1:
        return formData.wheels === "";
      case 2:
        return formData.vehicleType === "";
      case 3:
        return formData.vehicleModel === "";
      case 4:
        return formData.startDate === null || formData.endDate === null;

      default:
        return false;
    }
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep}>
        {steps.map((step) => (
          <Step key={step.label}>
            <StepLabel>{step.label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length ? (
        <div>
          <Button onClick={handleSubmit}>Submit</Button>
        </div>
      ) : (
        <div style={{ marginTop: 100 }}>
          {getStepContent(activeStep, formData, setFormData)}
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              marginTop: 150,
            }}
          >
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              className={classes.backButton}
            >
              Back
            </Button>
            <Button
              disabled={isNextDisabled() || success}
              variant="contained"
              color="primary"
              onClick={activeStep === steps.length ? handleSubmit : handleNext}
            >
              {activeStep === steps.length ? "Submit" : "Next"}
            </Button>
          </div>
          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={true}
            pauseOnFocusLoss
            pauseOnHover
            theme="light"
            limit={1}
            closeButton={false}
          />
        </div>
      )}
    </div>
  );
}
