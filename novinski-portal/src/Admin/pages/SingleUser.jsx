import React, { useEffect, useState } from "react";
import ProfileCard from "../../components/Cards/ProfileCard";
import {
  Button,
  Grid,
  
  makeStyles,
  
  Snackbar,
  Tab,
  Tabs,
  Typography,
} from "@material-ui/core";
import TabPanel from "../../components/TabPanel/TabPanel";
import PrimarySmallLayout from "../../components/layouts/gridLayout/PrimarySmallLayout";
import CommentLayout from "../../components/layouts/gridLayout/CommentLayout";

import PersonalInfo from "../components/Cards/PersonalInfo";
import { useHistory, useParams } from "react-router";
import { axiosAuth } from "../../util/axios-instance";

import { Alert } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  smallScreenFonts: {
    fontSize: "1rem",
    [theme.breakpoints.down("xs")]: {
      fontSize: "90%",
      fontWeight: 500,
    },
    [theme.breakpoints.down(370)]: {
      fontSize: "90%",
      fontWeight: 600,
    },
  },
  fonts: {
    fontSize: "1rem",
  },
}));

const SingleUser = () => {
  const [value, setValue] = useState(0);
  const classes = useStyles();
  const { id } = useParams();
  const [snackbar, setSnackbar] = useState({ open: false, message: "default" });
  const [severity, setSeverity] = useState("info");
  const [user, setUser] = useState({});
  
  const [load, setLoad] = useState(false);
  
  const history = useHistory();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const userProfile = async () => {
      try {
        const myInfo = await axiosAuth(`/user/getSingleUser/${id}`);
        setUser(myInfo.data);
        console.log(myInfo.data);
      } catch (error) {
        console.log(error);
      }
    };

    userProfile();
  }, [load,id]);

  const handleDeleteComment = async (id) => {
    try {
      setLoad(true);
      const deleteComment = await axiosAuth.delete("/comment/deleteComment", {
        data: id,
      });
      console.log(deleteComment);
      setLoad(false);
    } catch (error) {
      setLoad(true);
      console.log(error.response);
    }
  };

  const handleDeleteBookmark = async (postId) => {
    try {
      setLoad(true);
      const deleteBookmark = await axiosAuth.post("/user/deleteBookmark", {
        bookmarkId: postId,
        userId: id,
      });
      console.log(deleteBookmark);
      setLoad(false);
    } catch (error) {
      setLoad(true);
      console.log(error.response);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      setLoad(true);
      const deletePost = await axiosAuth.delete("/post/deletePost", {
        data: { id: postId },
      });
      console.log(deletePost);
      setSeverity("success");
      setSnackbar({
        open: true,
        message: "Post Deleted successfully",
      });
      setLoad(false);
    } catch (error) {
      setLoad(true);
      setSeverity("warning");
      setSnackbar({
        open: true,
        message: "Failed to Delete post",
      });
      console.log(error.response);
    }
  };

  const handleDisableAccout = async () => {
    try {
      setLoad(true);
      const disableAccount = await axiosAuth.post("/user/disableAccount", {
        id: id,
      });
      console.log(disableAccount);
      setSeverity("success");
      setSnackbar({
        open: true,
        message: "Account Disabled successfully",
      });

      setLoad(false);
    } catch (error) {
      setLoad(true);
      setSeverity("warning");
      setSnackbar({
        open: true,
        message: "Failed to Disable this account",
      });
      console.log(error.response);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      setLoad(true);
      const deleteAccount = await axiosAuth.delete(`/user/deleteAccount/${id}`);
      setSeverity("success");
      setSnackbar({
        open: true,
        message: "Account Deleted successfully",
      });
      console.log(deleteAccount);
      setLoad(false);
    } catch (error) {
      setLoad(true);
      setSeverity("warning");
      setSnackbar({
        open: true,
        message: "Failed to Delete account",
      });
      console.log(error.response);
    }
  };

  const handleSnackBarOpen = () => {
    setSnackbar((previous) => {
      return {
        ...previous,
        open: !snackbar.open,
      };
    });
  };

  return (
    <Grid container spacing={3}>
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
      <Grid item xs={12} md={8}>
        {user.user && (
          <ProfileCard size="big" isAdmin={true} data={user.user} />
        )}
      </Grid>
      <Grid item xs={12}>
        {user.user && <PersonalInfo user={user.user} />}
      </Grid>

      {user.user && user.user.role === "visitor" ? (
        <>
          <Grid item xs={12}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="user tabs"
              indicatorColor="primary"
              textColor='primary'
              
            >
              {/* <Tab
            label="Objave"
            disableRipple
            className={classes.smallScreenFonts}
          /> */}
              <Tab
                label="Sacuvane Objave"
                disableRipple
                className={classes.smallScreenFonts}
              />
              <Tab label="Komentari" disableRipple className={classes.smallScreenFonts} />
            </Tabs>
          </Grid>
          <Grid item xs={12}>
            {/* <TabPanel value={value} index={0}>
          <PrimarySmallLayout data={posts.slice(0, 8)} />
        </TabPanel> */}
            <TabPanel value={value} index={0}>
              {user.user && user.user.bookmarks.length > 0 ? (
                <PrimarySmallLayout
                  data={user.user.bookmarks}
                  profile={true}
                  handleDelete={handleDeleteBookmark}
                />
              ) : (
                <Typography variant="h2" color='primary'>Nema Sacuvanih Objava</Typography>
              )}
            </TabPanel>
            <TabPanel value={value} index={1}>
              {user.comments && user.comments.length > 0 ? (
                <CommentLayout
                  data={user.comments}
                  handleDelete={handleDeleteComment}
                />
              ) : (
                <Typography variant="h2" color='primary'>Nema Komentara</Typography>
              )}
            </TabPanel>
          </Grid>
        </>
      ) : (
        <>
          <Grid item xs={12} sm={8}>
            <Typography variant="h2">Moje objave</Typography>
          </Grid>
          <Grid item xs={12}>
            {user.posts && user.posts.length > 0 ? (
              <PrimarySmallLayout
                data={user.posts}
                profile={true}
                handleDelete={handleDeletePost}
              />
            ) : (
              <Typography variant="h2" color='primary'>Nemate ni jednu objavu</Typography>
            )}
          </Grid>
        </>
      )}
      <Grid item xs={12}>
        <Grid container alignItems="center" justify="flex-end" spacing={2}>
          <Grid item xs={6} sm={4} md={2}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => {
                history.push(`/edit-user/${user.user._id}`);
              }}
            >
              Izmeni
            </Button>
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleDisableAccout}
            >
              Deaktiviraj
            </Button>
          </Grid>
          <Grid item xs={12} sm={4} md={2}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleDeleteAccount}
            >
              obrisi
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SingleUser;
