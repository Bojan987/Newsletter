import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Grid, Typography, Snackbar } from "@material-ui/core";
import ButtonWrapper from "../../components/FormsUI/Button/ButtonWrapper";
import TextfieldWrapper from "../../components/FormsUI/Textfield/TextfieldWrapper";
import AppContext from "../../context/AppContext";
import { useHistory, useParams } from "react-router";
import { axiosInstance } from "../../util/axios-instance";
import { Alert } from "@material-ui/lab";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  formContainer: {
    minHeight: "70vh",
    alignItems: "flex-start",
  },
  formWrapper: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(8),
  },
  alignAll: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
}));

const ResetPassword = () => {
  const classes = useStyles();
  const ctx = React.useContext(AppContext);
  const history = useHistory();
  const { email, code } = useParams();
  const [snackbar, setSnackbar] = useState({ open: false, message: "default" });
  const [severity, setSeverity] = useState("info");
  ctx.handleAuthHeader(true);

  const handleSnackBarOpen = () => {
    setSnackbar((previous) => {
      return {
        ...previous,
        open: !snackbar.open,
      };
    });
  };

  const INITIAL_FORM_STATE = {
    password: "",
    confirmPassword: "",
    email: email,
    resetCode: code,
  };

  const FORM_VALIDATION = Yup.object().shape({
    password: Yup.string()
      .required("No password provided.")
      .min(8, "Password is too short - should be 8 chars minimum.")
      .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords must match"
    ),
    email: Yup.string(),
    // resetCode:Yup.number().integer(),
  });

  const handleSubmit = async (data, { setErrors, resetForm }) => {
    console.log(data);
    try {
      const res = await axiosInstance.post("/user/newPassword", data);
      console.log("reset: ", res);
      resetForm(INITIAL_FORM_STATE);
      setSeverity("success");
      setSnackbar({
        open: true,
        message: "Your Password is changed successfuly",
      });

      setTimeout(() => {
        history.push(`/login/`);
      }, 1500);
    } catch (err) {
      console.log(err.response);
      setErrors({
        password:
          err.response && err.response.data
            ? err.response.data.error
            : err.message,
      });
      setSeverity("warning");
      setSnackbar({
        open: true,
        message: "Changing password Failed!",
      });
    }
  };

  return (
    <Grid container className={classes.formContainer}>
      <Snackbar
        open={snackbar.open}
        onClose={handleSnackBarOpen}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={4000}
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
              onSubmit={handleSubmit}
            >
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="h2" align="center">
                      RESET PASSWORD
                    </Typography>
                  </Grid>

                  <Grid item xs={12}>
                    <TextfieldWrapper name="password" label="New Password" />
                  </Grid>

                  <Grid item xs={12}>
                    <TextfieldWrapper
                      name="confirmPassword"
                      label="Confirm Password"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <ButtonWrapper>Submit Form</ButtonWrapper>
                  </Grid>
                </Grid>
              </Form>
            </Formik>
          </div>
        </Container>
      </Grid>
    </Grid>
  );
};

export default ResetPassword;
