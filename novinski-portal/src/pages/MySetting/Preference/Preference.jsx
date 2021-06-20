import { Grid, Snackbar } from "@material-ui/core";
import React from "react";
import CheckboxWrapper from "../../../components/FormsUI/Checkbox/CheckboxWrapper";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import ButtonWrapper from "../../../components/FormsUI/Button/ButtonWrapper";
import { axiosAuth } from "../../../util/axios-instance";
import { Alert } from "@material-ui/lab";
import { useState } from "react";

const initialNotificationState = {
  newsNotifications: false,
  commentsNotification: false,
};

const notificationValidation = Yup.object().shape({
  newsNotifications: Yup.boolean(),
  commentsNotification: Yup.boolean(),
});

const Preference = () => {
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

  const handlePreferenceSubmit = async (data) => {
    try {
      await axiosAuth.put("/user/profile/setPreferences", data);

      setSeverity("success");
      setSnackbar({
        open: true,
        message: "Your Preferences are changed successfuly",
      });
    } catch (err) {
      console.log(err.response);
    }
  };

  return (
    <Grid container>
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
      <Formik
        initialValues={{
          ...initialNotificationState,
        }}
        validationSchema={notificationValidation}
        onSubmit={handlePreferenceSubmit}
      >
        <Form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <CheckboxWrapper
                name="newsNotifications"
                label="Obavesti me o novostima na platformi"
              />
            </Grid>

            <Grid item xs={12}>
              <CheckboxWrapper
                name="commentsNotification"
                label="Obavesti me o odgovorima na moje komentare"
              />
            </Grid>
            <Grid item xs={12} sm={7} md={6}>
              <Grid container justify="flex-end">
                <Grid item xs={12} sm={5} md={4} lg={4}>
                  <ButtonWrapper>Submit Form</ButtonWrapper>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Form>
      </Formik>
    </Grid>
  );
};

export default Preference;
