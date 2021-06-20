import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Grid, Typography,Snackbar } from "@material-ui/core";
import ButtonWrapper from "../../components/FormsUI/Button/ButtonWrapper";
import CheckboxWrapper from "../../components/FormsUI/Checkbox/CheckboxWrapper";
import { Alert } from "@material-ui/lab";
import TextfieldWrapper from "../../components/FormsUI/Textfield/TextfieldWrapper";
import { Link as RouterLink } from "react-router-dom";
import { Link } from "@material-ui/core";
import AppContext from "../../context/AppContext";
import {useHistory} from "react-router-dom";
import { axiosInstance } from "../../util/axios-instance";
// import AutoCompleteWrapper from "../../components/FormsUI/Select/AutoCompleteWrapper";

const useStyles = makeStyles((theme) => ({
  formWrapper: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(8),
  },
  gridAlign: {
    minHeight: "70vh",
    alignItems: "flex-start",
    justifyContent: "center",
  },
}));

const INITIAL_FORM_STATE = {
  firstName: "",
  // lastName: "",
  email: "",
  // phone: "",
  password: "",
  // address: "",
  // city: "",
  // country: "",
  newsletter: false,
};

const FORM_VALIDATION = Yup.object().shape({
  firstName: Yup.string().required("Required"),
  // lastName: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email.").required("Required"),
  password: Yup.string()
    .required("No password provided.")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(/^(?=.*\d)(?=.*[a-zA-Z]).{8,30}$/, "Password must contain at least 1 number"),
  // phone: Yup.number()
  //   .integer()
  //   .typeError("Please enter a valid phone number")
  //   .required("Required"),
  // address: Yup.string().required("Required"),
  // city: Yup.string().required("Required"),
  // country: Yup.string().required("Required"),
  newsletter: Yup.boolean(),
});

const Register = () => {

  const [snackbar, setSnackbar] = useState({ open: false, message: "default" });
  const [severity, setSeverity] = useState("info");
  const classes = useStyles();
  const history = useHistory()
  const ctx = React.useContext(AppContext);

  ctx.handleAuthHeader(true);


  const handleSnackBarOpen = () => {
    setSnackbar((previous) => {
      return {
        ...previous,
        open: !snackbar.open,
      };
    });
  };

  const handleRegisterSubmit = async (
    userInfo,
    { setErrors,resetForm }
  ) => {
    try {
      
       await axiosInstance.post(`/user/signUp`, userInfo);
      
      resetForm(INITIAL_FORM_STATE);
      setSeverity("success");
      setSnackbar({
        open: true,
        message: "Register successful! Please Check your Email.",
      });
      setTimeout(() => {
        
        history.push('/login')
      }, 6000);
    } catch (err) {
      console.log(err.response)
      let error ="email"
      if(err.response.data.errors){
        error = err.response.data.errors[0].includes('Password') && "password"   
      }
      if(err.response.data.errors){
        error = err.response.data.errors[0].includes('Name') && "firstName"   
      }
      
      setErrors({
        [error]:
            err.response && err.response.data.errors
                ? err.response.data.errors[0] 
                : err.response.data.error ? err.response.data.error : err.message
    })
    setSeverity("warning");
    setSnackbar({
      open: true,
      message: "Registration failed!",
    });
      
    }
  };

  return (
    <Grid container className={classes.gridAlign}>
      <Snackbar
        open={snackbar.open}
        onClose={handleSnackBarOpen}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={6000}
        key={"key"}
      >
        <Alert onClose={handleSnackBarOpen} severity={severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
      <Grid item xs={12}>
        <Container maxWidth="xs">
          <div className={classes.formWrapper}>
            <Formik
              initialValues={{
                ...INITIAL_FORM_STATE,
              }}
              validationSchema={FORM_VALIDATION}
              onSubmit={handleRegisterSubmit}
            >
              {({ isSubmitting}) => (
                <Form>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography variant="h2" align="center">
                        REGISTRATION
                      </Typography>
                    </Grid>
                    {/* <Grid item xs={12}>
                    <Typography variant="h6">Details</Typography>
                  </Grid> */}

                    <Grid item xs={12}>
                      <TextfieldWrapper name="firstName" label="First Name"  />
                    </Grid>

                    {/* <Grid item xs={6}>
                    <TextfieldWrapper name="lastName" label="Last Name" />
                  </Grid> */}

                    <Grid item xs={12}>
                      <TextfieldWrapper name="email" label="Email" />
                    </Grid>

                    <Grid item xs={12}>
                      <TextfieldWrapper
                        name="password"
                        label="Password"
                        type="password"
                      />
                    </Grid>
                    {/* <Grid item xs={12}>
                    <TextfieldWrapper name="phone" label="Phone" />
                  </Grid> */}

                    {/* <Grid item xs={12}>
                    <Typography variant="h6">Address</Typography>
                  </Grid> */}

                    {/* <Grid item xs={12}>
                    <AutoCompleteWrapper name="country" label="Country" />
                  </Grid> */}
                    {/* <TextfieldWrapper name="country" label="Countryy" /> bilo umesto autocomplete*/}

                    {/* <Grid item xs={6}>
                    <TextfieldWrapper name="city" label="City" />
                  </Grid>

                  <Grid item xs={6}>
                    <TextfieldWrapper name="address" label="Address" />
                  </Grid> */}

                    <Grid item xs={12}>
                      <CheckboxWrapper
                        name="newsletter"
                        label="I accept receiving newsletter on email address"
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <ButtonWrapper disabled={isSubmitting}>Submit Form</ButtonWrapper>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography align="center" variant="body2">
                        Creating an account you are agreeing to our{" "}
                        <Link
                          variant="body2"
                          component={RouterLink}
                          to="/terms"
                        >
                          {" "}
                          terms of Service
                        </Link>{" "}
                      </Typography>
                      <Typography align="center" variant="body2">
                        And You are accepting our{" "}
                        <Link
                          variant="body2"
                          component={RouterLink}
                          to="/terms"
                        >
                          {" "}
                          Privacy Policy
                        </Link>{" "}
                      </Typography>
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
          </div>
        </Container>
      </Grid>
    </Grid>
  );
};

export default Register;
