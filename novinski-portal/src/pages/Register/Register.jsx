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
import { useIntl } from "react-intl";

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



const Register = () => {

  const intl=useIntl()
  const [snackbar, setSnackbar] = useState({ open: false, message: "default" });
  const [severity, setSeverity] = useState("info");
  const classes = useStyles();
  const history = useHistory()
  const ctx = React.useContext(AppContext);

  ctx.handleAuthHeader(true);

  const INITIAL_FORM_STATE = {
    firstName: "",
    lastName: "",
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
    lastName: Yup.string().required("Required"),
    email: Yup.string().email(intl.formatMessage({ id: "invalidEmail" })).required("Required"),
    password: Yup.string()
      .required(intl.formatMessage({ id: "noPassword" }))
      .min(8, intl.formatMessage({ id: "invalidPassword" }))
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
        message: intl.formatMessage({ id: "registration.success" }),
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
      message: intl.formatMessage({ id: "registration.fail" }),
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
                        {intl.formatMessage({ id: "registration.title" })}
                      </Typography>
                    </Grid>
                    {/* <Grid item xs={12}>
                    <Typography variant="h6">Details</Typography>
                  </Grid> */}

                    <Grid item xs={12} sm={6}>
                      <TextfieldWrapper name="firstName" label={intl.formatMessage({ id: "firstName" })}  />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                    <TextfieldWrapper name="lastName" label={intl.formatMessage({ id: "lastName" })} />
                  </Grid>

                    <Grid item xs={12}>
                      <TextfieldWrapper name="email" label="Email" />
                    </Grid>

                    <Grid item xs={12}>
                      <TextfieldWrapper
                        name="password"
                        label={intl.formatMessage({ id: "password" })}
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
                        label={intl.formatMessage({ id: "notifications" })}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <ButtonWrapper disabled={isSubmitting} type='submit'>{intl.formatMessage({ id: "registerMe" })}</ButtonWrapper>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography  variant="body2">
                        {intl.formatMessage({ id: "terms.message" })}
                        <Link
                          variant="body2"
                          component={RouterLink}
                          to="/terms"
                        >
                          {" "}
                          {intl.formatMessage({ id: "terms.link" })}
                        </Link>{" "}
                      </Typography>
                      <Typography  variant="body2">
                        {intl.formatMessage({ id: "privacy.message" })}
                        <Link
                          variant="body2"
                          component={RouterLink}
                          to="/terms"
                        >
                          {intl.formatMessage({ id: "privacy.link" })}
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
