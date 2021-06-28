import React, { useContext } from "react";
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import SelectWrapper from "../../../components/FormsUI/Select/SelectWrapper";
import { useIntl } from "react-intl";
import { makeStyles } from "@material-ui/core/styles";
import {LangContext} from '../../../intl/IntlWrapper'
import {
  Box,
  Button,
  Grid,
  Typography,
} from "@material-ui/core";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import ButtonWrapper from "../../../components/FormsUI/Button/ButtonWrapper";
import TextfieldWrapper from "../../../components/FormsUI/Textfield/TextfieldWrapper";
import { useHistory } from "react-router";
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
    [theme.breakpoints.down(610)] :{
      width:'90%'
    }
    
  },
  
}));

const DeactivateProfileModal = ({ handleClose, open }) => {

  const intl=useIntl()
  const classes = useStyles();
  const history = useHistory()
  const initialLeaveState = {
    leavingReason: "",
    currentPass: "",
    confirmPass: "",
  };

  const {locale} = useContext(LangContext)
  
  
  const leavingReasonsRS = [
    "Lose Korisnicko iskustvo",
    "Usluga nije zadovoljavajuca",
    "Losa podrska",
    "Nesto drugo",
  ]
  const leavingReasonsEN = [
    "Bad User experiance",
    "Unsatisfactory service",
    "Missing Support",
    "Other",
  ]
  const leavingValidation = Yup.object().shape({
    leavingReason: Yup.string().required(intl.formatMessage({ id: "leavingReason.label" })),
    currentPass: Yup.string()
      .required(intl.formatMessage({ id: "noPassword" }))
      .min(8, intl.formatMessage({ id: "invalidPassword" }))
      .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
      confirmPass: Yup.string().oneOf(
      [Yup.ref("currentPass"), null],
      intl.formatMessage({ id: "noMatchPasswords" })
    ),
  });

  const handleDeactivateAccount = async (data, { setErrors, resetForm }) => {
    try {
      const res = await axiosAuth.post("/user/profile/disableAccount", data);
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
            onSubmit={handleDeactivateAccount}
          >
            <Form>
              <Grid container spacing={3}>
                <Grid item xs={7}>
                  <Typography variant="h2">{intl.formatMessage({ id: "deactivateAccount.title" })}</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="body1">
                  {intl.formatMessage({ id: "deactivateAccount.message" })}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={3}>
                      <Box py={5}>
                        <Typography>{intl.formatMessage({ id: "leavingReason" })}</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={9}>
                      <SelectWrapper
                        options={locale ==='en-US' ? leavingReasonsEN : leavingReasonsRS}
                        name="leavingReason"
                        label={intl.formatMessage({ id: "leavingReason.label" })}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <TextfieldWrapper
                    name="currentPass"
                    label={intl.formatMessage({ id: "password.leavingLabel" })}
                    type='password'
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextfieldWrapper
                    name="confirmPass"
                    label={intl.formatMessage({ id: "confirmPassword.leavingLabel" })}
                    type='password'
                  />
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={3} justify="center" alignItems='center'>
                    <Grid item xs={6}>
                      <Button variant="outlined" fullWidth onClick={handleClose}>
                       {intl.formatMessage({ id: "button.close" })}
                      </Button>
                    </Grid>
                    <Grid item xs={6}>
                      <ButtonWrapper> {intl.formatMessage({ id: "button.deactivate" })}</ButtonWrapper>
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

export default DeactivateProfileModal;
