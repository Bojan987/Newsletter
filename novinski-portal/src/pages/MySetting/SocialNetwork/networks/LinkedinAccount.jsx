import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Grid, Typography } from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import { makeStyles } from "@material-ui/core";
import IconButtonWrapper from "../../../../components/FormsUI/Button/IconButtonWrapper";
import TextfieldWrapper from "../../../../components/FormsUI/Textfield/TextfieldWrapper";

const useStyles = makeStyles((theme) => ({
  hide: {
    display: "flex",
    alignItems: "center",
    height: 90,
    [theme.breakpoints.down(440)]: {
      display: "none",
    },
  },

  show: {
    display: "flex",
    alignItems: "center",
    height: 90,
    [theme.breakpoints.up(440)]: {
      display: "none",
    },
  },
  socialAccountHeight: {
    height: 90,
  },
  flexAlign: {
    alignItems: "center",
    height: 56,
  },
  editWrapper: {
    height: "100%",
  },
  onHover: {
    cursor: "pointer",
  },
}));

const linkedinState = {
  name: "linkedin",
  link: "",
};

const urlValidation = Yup.object().shape({
  // facebook: Yup.string().matches(
  //   /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
  //   "Enter correct url!"
  // ),
  name: Yup.string(),
  link: Yup.string()
    .matches(
      /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      "Enter correct url!"
    )
    .required("No link provided."),
});

const LinkedinAccount = ({
  handleAddorEdit,
  handleInputConfig,
  setNoBorder,
  setEdit,
  noBorder,
  handleDelete,
}) => {
  const classes = useStyles();

  return (
    <>
      <Grid item xs={12}>
        <Formik
          initialValues={{
            ...linkedinState,
          }}
          validationSchema={urlValidation}
          onSubmit={handleAddorEdit("linkedin")}
        >
          <Form>
            <Grid container spacing={4} className={classes.socialAccountHeight}>
              <Grid item xs={3} sm={2} md={1} className={classes.hide}>
                <Typography variant="body1">Linkedin</Typography>
              </Grid>
              <Grid item xs={2} className={classes.show}>
                <LinkedInIcon fontSize="large" />
              </Grid>
              <Grid item sm={5} md={3}>
                <TextfieldWrapper {...handleInputConfig("linkedin")} />
              </Grid>
              <Grid item xs={1} sm={2} md={2}>
                {noBorder?.linkedin ? (
                  <Grid
                    container
                    justify="flex-start"
                    alignItems="center"
                    className={classes.editWrapper}
                  >
                    <Grid item>
                      <EditIcon
                        className={classes.onHover}
                        onClick={() => {
                          setNoBorder((previous) => {
                            return {
                              ...previous,
                              linkedin: false,
                            };
                          });
                          setEdit((previous) => {
                            return {
                              ...previous,
                              linkedin: true,
                            };
                          });
                        }}
                      />
                    </Grid>
                    <Grid item>
                      <DeleteIcon
                        onClick={() => {
                          handleDelete({ name: "linkedin" });
                        }}
                        className={classes.onHover}
                      />
                    </Grid>
                  </Grid>
                ) : (
                  <Grid container className={classes.flexAlign}>
                    <IconButtonWrapper name="link">
                      <AddCircleOutlineIcon className={classes.onHover} />
                    </IconButtonWrapper>
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Form>
        </Formik>
      </Grid>
    </>
  );
};

export default LinkedinAccount;
