import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Grid, Typography, Snackbar } from "@material-ui/core";
import ButtonWrapper from "../../components/FormsUI/Button/ButtonWrapper";
import TextfieldCode from "../../components/FormsUI/Textfield/TextfieldCode";
import { useHistory, useParams } from "react-router";
import AppContext from "../../context/AppContext";
import { axiosInstance } from "../../util/axios-instance";
import { Alert } from "@material-ui/lab";
import { useState } from "react";
import { useIntl } from "react-intl";

const useStyles = makeStyles((theme) => ({
  formContainer: {
    minHeight: "70vh",
    alignItems: "flex-start",
    justifyContent: "center",
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

const ResetCode = () => {
  const classes = useStyles();
  const history = useHistory();
  const { email } = useParams();
  const ctx = React.useContext(AppContext);
  const intl = useIntl()
  const [snackbar, setSnackbar] = useState({ open: false, message: "default" });
  const [severity, setSeverity] = useState("info");

  const handleSnackBarOpen = () => {
    setSnackbar((previous) => {
      return {
        ...previous,
        open: !snackbar.open,
      };
    });
  };

  const INITIAL_FORM_STATE = {
    resetCode: "",
    email: email,
  };

  const FORM_VALIDATION = Yup.object().shape({
    resetCode: Yup.number()
      .integer()
      .typeError("Please enter a number")
      .required("Required"),
    email: Yup.string(),
  });
  ctx.handleAuthHeader(true);

  const handleSubmit = async (data) => {
    try {
      const res = await axiosInstance.post("/user/check", data);
      console.log("reset: ", res, data);

      history.push(`/reset-password/${email}/${data.resetCode}`);
    } catch (err) {
      console.log(err.response);
      setSeverity("warning");
      setSnackbar({
        open: true,
        message: "OTP you provided is incorrect!",
      });
      setTimeout(() => {
        history.push("/forgot-password");
      }, 2000);
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
                    {intl.formatMessage({ id: "forgotPassword.title",defaultMessage:'FORGOT PASSWORD' })}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2">
                    {intl.formatMessage({ id: "otp.message",defaultMessage:'Please provide the code we have sent on your email' })}
                    </Typography>
                  </Grid>

                  <Grid
                    item
                    container
                    xs={12}
                    wrap="nowrap"
                    justify="space-between"
                    alignItems="center"
                  >
                    <TextfieldCode name="resetCode" />
                  </Grid>

                  <Grid item xs={12}>
                    <ButtonWrapper>
                    {intl.formatMessage({ id: "admin.confirm",defaultMessage:'Please provide the code we have sent on your email' })}
                    </ButtonWrapper>
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

export default ResetCode;
