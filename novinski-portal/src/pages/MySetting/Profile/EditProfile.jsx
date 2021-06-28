import { Box, Button, Grid, Typography, Snackbar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import { makeStyles } from "@material-ui/core/styles";
import HighlightOffOutlinedIcon from "@material-ui/icons/HighlightOffOutlined";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextfieldWrapper from "../../../components/FormsUI/Textfield/TextfieldWrapper";
import ButtonWrapper from "../../../components/FormsUI/Button/ButtonWrapper";
import { axiosAuth, axiosInstance } from "../../../util/axios-instance";
import { useHistory } from "react-router-dom";
import { Alert } from "@material-ui/lab";
import Avatar from "@material-ui/core/Avatar";
import { useIntl } from "react-intl";


const useStyles = makeStyles((theme) => ({
  medium: {
    fontSize: "9rem",
    [theme.breakpoints.down("xs")]: {
      fontSize: "9rem",
    },
  },

  delete: {
    alignSelf: "flex-start",
    cursor: "pointer",
  },
  flex: {
    display: "flex",
    justifyContent: "center",
  },
  divider: {
    justifySelf: "center",
    alignSelf: "center",
  },
  grid: {
    display: "grid",
  },
  avatarImage: {
    width: 156,
    height: 156,
    objectFit: "cover",
    justifySelf: "center",
  },
  wrapper: {
    [theme.breakpoints.down("sm")]: {
      alignItems: "center",
      justifyContent: "center",
    },
  },
}));

const EditProfile = () => {
  const history = useHistory();
  const classes = useStyles();
  const [myUserInfo, setMyUserInfo] = useState({});
  const [snackbar, setSnackbar] = useState({ open: false, message: "default" });
  const [severity, setSeverity] = useState("info");
  const intl=useIntl()
  const [load,setLoad] = useState(false)
  const configButton = {
    variant: "contained",
    color: "primary",
    fullWidth: true,
  };

  const initialProfileState = {
    email: "",
    phone: "",
    description: "",
  };

  const profileValidation = Yup.object().shape({
    email: Yup.string().email("Invalid email."),
    phone: Yup.number()
      .integer()
      .typeError("Please enter a valid phone number"),
    description: Yup.string(),
  });
  //show - hide snackbar
  const handleSnackBarOpen = () => {
    setSnackbar((previous) => {
      return {
        ...previous,
        open: !snackbar.open,
      };
    });
  };

  useEffect(() => {
    //fetch my profile info
    const myProfileInfo = async () => {
      try {
        
        const myInfo = await axiosAuth("/user/profile/myProfile");
        setMyUserInfo(myInfo.data.me);
        console.log(myInfo);
        
        // if(myInfo.data.me.image){
        //   const imageUrl = await axiosInstance.get(`/images/${myInfo.data.me.image}`)
        //   console.log(imageUrl.data)
        //   setAvatarUrl(imageUrl.data)
        // }
      } catch (error) {
        
        console.log(error);
        history.push("/");
      }
    };

    myProfileInfo();
  }, [load,history]);

  const editProfile = async (data) => {
    try {
      setLoad(true)
      const res = await axiosAuth.put("/user/profile/editUser", data);
      console.log("edit: ", res);
      setSeverity("success");
      setSnackbar({
        open: true,
        message: intl.formatMessage({ id: "editUser.success" }),
      });
      setLoad(false)
    } catch (err) {
      console.log(err);
      setLoad(true)
      setSeverity("warning");
      setSnackbar({
        open: true,
        message: intl.formatMessage({ id: "editUser.fail" }),
      });
      setTimeout(() => {
        history.push("/");
      }, 2000);
      // setErrors({
      //   email:
      //     err.response && err.response.data.message
      //       ? err.response.data.message
      //       : err.message,
      //   phone:
      //     err.response && err.response.data.message
      //       ? err.response.data.message
      //       : err.message,
      //   description:
      //     err.response && err.response.data.message
      //       ? err.response.data.message
      //       : err.message,
      // });
    }
  };

  const uploadImage = async (event) => {
    try {
      const selectedFile = event.target.files[0];
      if (selectedFile.size > 1000000) {
        setSeverity("warning");
        setSnackbar({
          open: true,
          message: intl.formatMessage({ id: "imageUpload.warning" }),
        });
      } else {
        const fileData = new FormData();
        fileData.append("image", selectedFile, selectedFile.name);
        setLoad(true)
        const { data } = await axiosInstance.post(
          "/images/uploadImage",
          fileData,
          {onUploadProgress: progressEvent=>{
            console.log('upload progress:' + Math.round(progressEvent.loaded/progressEvent.total * 100) + '%')
          }}
        );
         await axiosAuth.put("/user/profile/editUser", {
          image: data.imageKey,
        });
        
        setSeverity("success");
        setSnackbar({
          open: true,
          message: intl.formatMessage({ id: "imageUpload.success" }),
        });
        setLoad(false)
      }
    } catch (error) {
      console.log(error.response);
      setLoad(true)
      setSeverity("warning");
        setSnackbar({
          open: true,
          message: intl.formatMessage({ id: "imageUpload.fail" }),
        });
    }
  };

  const deleteImage = async () => {
    try {
      if (!myUserInfo.image) {
        setSeverity("warning");
        setSnackbar({
          open: true,
          message: intl.formatMessage({ id: "imageDelete.none" }),
        });
      } else {
        setLoad(true)
         await axiosAuth.put("/user/profile/editUser", {
          image: "",
        });
  
        const payload = { userId: myUserInfo._id, modelName: "user" };
        await axiosInstance.post(
          `/images/${myUserInfo.image}`,
          payload
        );
        
        setSeverity("success");
        setSnackbar({
          open: true,
          message: intl.formatMessage({ id: "imageDelete.success" }),
        });
        setLoad(false)
      }
    } catch (error) {
      console.log(error)
      setSeverity("warning");
        setSnackbar({
          open: true,
          message: intl.formatMessage({ id: "imageDelete.fail" }),
        });
        setLoad(true)
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
        <Grid container spacing={2} className={classes.wrapper}>
          <Grid item xs={7} sm={6} className={classes.flex}>
            {myUserInfo && myUserInfo.image ? (
              <Avatar
                src={`http://localhost:5000/images/${myUserInfo.image}`}
                className={classes.avatarImage}
              />
            ) : (
              <AccountCircleOutlinedIcon className={classes.medium} />
            )}
            <HighlightOffOutlinedIcon className={classes.delete} onClick= {deleteImage}/>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Box pt={2}>
              {/* <Button {...configButton} type ='file' onChange={handleSelectFile}>Upload</Button> */}
              <label htmlFor="upload-photo">
                <input
                  style={{ display: "none" }}
                  id="upload-photo"
                  name="upload-photo"
                  type="file"
                  accept="image/*"
                  onChange={uploadImage}
                />

                <Button {...configButton} component="span">
                  {intl.formatMessage({ id: "button.upload" })}
                </Button>
              </label>
            </Box>
            <Box pt={1}>
              <Typography variant="body2">
                {intl.formatMessage({ id: "button.upload.description" })}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} sm={8} md={12}>
        <Box pt={3}>
          <Formik
            initialValues={{
              ...initialProfileState,
            }}
            validationSchema={profileValidation}
            onSubmit={editProfile}
          >
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextfieldWrapper
                    name="email"
                    label={intl.formatMessage({ id: "email" })}
                    value={
                      myUserInfo && myUserInfo.email ? myUserInfo.email : ""
                    }
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextfieldWrapper
                    name="phone"
                    label={intl.formatMessage({ id: "phone" })}
                    value={
                      myUserInfo && myUserInfo.phone ? myUserInfo.phone : ""
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextfieldWrapper
                    name="description"
                    label={intl.formatMessage({ id: "description" })}
                    rows="5"
                    multiline={true}
                    value={
                      myUserInfo && myUserInfo.description
                        ? myUserInfo.description
                        : ""
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <Box ml="auto">
                    <ButtonWrapper>{intl.formatMessage({ id: "submitForm" })}</ButtonWrapper>
                  </Box>
                </Grid>
              </Grid>
            </Form>
          </Formik>
        </Box>
      </Grid>
    </Grid>
  );
};

export default EditProfile;
