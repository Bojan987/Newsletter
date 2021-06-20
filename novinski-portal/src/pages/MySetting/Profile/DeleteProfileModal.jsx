import React from "react";
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import SelectWrapper from "../../../components/FormsUI/Select/SelectWrapper";
// import { FormattedMessage } from "react-intl";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Button, Grid, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import ButtonWrapper from "../../../components/FormsUI/Button/ButtonWrapper";
import TextfieldWrapper from "../../../components/FormsUI/Textfield/TextfieldWrapper";
import { axiosAuth } from "../../../util/axios-instance";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: 600,
    [theme.breakpoints.down(610)]: {
      width: "90%",
    },
  },
}));

const DeleteProfileModal = ({ handleClose, open }) => {
  const classes = useStyles();
  const history = useHistory();
  const reasons = [
    "Lose Korisnicko iskustvo",
    "Usluga nije zadovoljavajuca",
    "nedostaje support",
    "drugo",
  ];
  const initialLeaveState = {
    leavingReason: reasons[0],
    currentPass: "",
    confirmPass: "",
  };

  const leavingValidation = Yup.object().shape({
    leavingReason: Yup.string().required("Please Provide Reason."),
    currentPass: Yup.string()
      .required("No password provided.")
      .min(8, "Password is too short - should be 8 chars minimum.")
      .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
    confirmPass: Yup.string().oneOf(
      [Yup.ref("currentPass"), null],
      "Passwords must match"
    ),
  });

  const handleDeleteAccount = async (data, { setErrors, resetForm }) => {
    try {
      const res = await axiosAuth.post("/user/profile/deleteAccount", data);
      console.log("delete: ", res, data);

      resetForm(initialLeaveState);
      handleClose();
      localStorage.clear();
      history.push("/");
    } catch (err) {
      let error = "currentPass";
      if (err.response.data.error) {
        error = err.response.data.error.includes("match")
          ? "confirmPass"
          : "currentPass";
      }
      // history.push('/')
      setErrors({
        [error]:
          err.response && err.response.data.error
            ? err.response.data.error
            : err.message,
      });
    }
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div className={classes.paper}>
          <Formik
            initialValues={{
              ...initialLeaveState,
            }}
            validationSchema={leavingValidation}
            onSubmit={handleDeleteAccount}
          >
            <Form>
              <Grid container spacing={3}>
                <Grid item xs={7}>
                  <Typography variant="h2">Brisanje Naloga</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="body1">
                    Zao nam je sto odlazite. Nadamo se ponovnom susretu
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={3}>
                      <Box py={5}>
                        <Typography>Razlog odlaska</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={9}>
                      {
                        <SelectWrapper
                          options={reasons}
                          name="leavingReason"
                          label="Molimo Vas izaberite Razlog"
                        />
                      }
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <TextfieldWrapper
                    name="currentPass"
                    label="Please Provide Password"
                    type="password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextfieldWrapper
                    name="confirmPass"
                    label="Please Confirm Password"
                    type="password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Grid
                    container
                    spacing={3}
                    justify="center"
                    alignItems="center"
                  >
                    <Grid item xs={6}>
                      <Button
                        variant="outlined"
                        fullWidth
                        onClick={handleClose}
                      >
                        Odustani
                      </Button>
                    </Grid>
                    <Grid item xs={6}>
                      <ButtonWrapper> Obrisi</ButtonWrapper>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Form>
          </Formik>
        </div>
      </Fade>
    </Modal>
  );
};

export default DeleteProfileModal;
