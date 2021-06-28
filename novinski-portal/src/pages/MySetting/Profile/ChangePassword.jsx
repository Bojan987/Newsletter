import { Box, Grid, Typography, Snackbar } from "@material-ui/core";
import React, { useState } from "react";
import { useIntl } from "react-intl";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextfieldWrapper from "../../../components/FormsUI/Textfield/TextfieldWrapper";
import ButtonWrapper from "../../../components/FormsUI/Button/ButtonWrapper";
import DeleteProfileModal from "./DeleteProfileModal";
import DeactivateProfileModal from "./DeactivateProfileModal";
import { makeStyles } from "@material-ui/core";
import { axiosAuth } from "../../../util/axios-instance";
import { Alert } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  deleteAccount: {
    cursor: "pointer",
  },
  deactivateAccount: {
    cursor: "pointer",
  },
}));

const ChangePassword = () => {

  const intl=useIntl()
  const classes = useStyles();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openDeactivateModal, setOpenDeactivateModal] = useState(false);
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

  const handleOpen = (e) => {
    if (e.target.id === "deleteAccount") setOpenDeleteModal(true);
    else if (e.target.id === "deactivateAccount") setOpenDeactivateModal(true);
  };

  const handleClose = () => {
    setOpenDeleteModal(false);
    setOpenDeactivateModal(false);
  };

  const initialFormState = {
    password: "",
    newPassword: "",
    confirmPassword: "",
  };

  const formValidation = Yup.object().shape({
    password: Yup.string()
      .required(intl.formatMessage({ id: "noPassword" }))
      .min(8, intl.formatMessage({ id: "invalidPassword" }))
      .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
    newPassword: Yup.string()
      .required(intl.formatMessage({ id: "noPassword" }))
      .min(8, intl.formatMessage({ id: "invalidPassword" }))
      .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("newPassword"), null],
      intl.formatMessage({ id: "noMatchPasswords" })
    ),
  });

  const handlePasswordChange = async (data, { setErrors, resetForm }) => {
    try {
      await axiosAuth.put("/user/profile/changePassword", data);
      setSeverity("success");
      setSnackbar({
        open: true,
        message: "Your Password is changed successfuly",
      });
      resetForm(initialFormState);
    } catch (err) {
      console.log(err.response);
      let error = "password";
      if (err.response.data.error) {
        error = "password";
      }
      if (err.response.data.errors) {
        error =
          err.response.data.errors[0].includes("password") && "newPassword";
      }
      setErrors({
        [error]:
          err.response && err.response.data.errors
            ? err.response.data.errors[0]
            : err.response && err.response.data.error
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
      <Grid item xs={12} sm={8} md={12}>
        <Box pt={3}>
          <Formik
            initialValues={{
              ...initialFormState,
            }}
            validationSchema={formValidation}
            onSubmit={handlePasswordChange}
          >
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12} >
                  <TextfieldWrapper name="password" label={intl.formatMessage({ id: "password" })} />
                </Grid>

                <Grid item xs={12} >
                  <TextfieldWrapper name="newPassword" label={intl.formatMessage({ id: "newPassword" })} />
                </Grid>
                <Grid item xs={12} >
                  <TextfieldWrapper
                    name="confirmPassword"
                    label={intl.formatMessage({ id: "confirmPassword" })}
                  />
                </Grid>
                <Grid item xs={12} >
                  <Box ml="auto">
                    <ButtonWrapper>{intl.formatMessage({ id: "button.changePassword" })}</ButtonWrapper>
                  </Box>
                </Grid>
              </Grid>
            </Form>
          </Formik>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box mt={5}>
          <div>
            <Typography
              id="deleteAccount"
              component={"span"}
              variant="body1"
              color="primary"
              onClick={handleOpen}
              className={classes.deleteAccount}
            >
              {intl.formatMessage({ id: "deleteAccount" })}
            </Typography>
            <DeleteProfileModal
              open={openDeleteModal}
              handleClose={handleClose}
            />
          </div>
          <div>
            <Typography
              id="deactivateAccount"
              component={"span"}
              variant="body1"
              color="primary"
              onClick={handleOpen}
              className={classes.deactivateAccount}
            >
              {intl.formatMessage({ id: "deactivateAccount" })}
            </Typography>
            <DeactivateProfileModal
              open={openDeactivateModal}
              handleClose={handleClose}
            />
          </div>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ChangePassword;
