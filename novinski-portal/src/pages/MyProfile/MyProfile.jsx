import {
  Button,
  Grid,
  Tab,
  Tabs,
  Typography,
  useMediaQuery,
  useTheme,
  Snackbar,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import ProfileCard from "../../components/Cards/ProfileCard";
import { makeStyles } from "@material-ui/core/styles";
import TabPanel from "../../components/TabPanel/TabPanel";
import PrimarySmallLayout from "../../components/layouts/gridLayout/PrimarySmallLayout";
import { Alert } from "@material-ui/lab";
import CommentLayout from "../../components/layouts/gridLayout/CommentLayout";
import { useHistory } from "react-router-dom";
import { axiosAuth } from "../../util/axios-instance";
import { Pagination, PaginationItem } from "@material-ui/lab";
import { useIntl, FormattedMessage } from "react-intl";

const useStyles = makeStyles({
  pageMargin: {
    marginTop: "2rem",
  },
  paginationItem: {
    borderRadius: 5,
  },
});

const MyProfile = () => {
  const configButton = {
    variant: "contained",
    color: "primary",
    fullWidth: true,
  };
  const intl = useIntl();
  const [value, setValue] = useState(0);
  const [myUserInfo, setMyUserInfo] = useState({});
  const [journalistData, setJournalistData] = useState({});
  const [load, setLoad] = useState(false);
  const [page, setPage] = useState(1);
  const history = useHistory();
  const [snackbar, setSnackbar] = useState({ open: false, message: "default" });
  const [severity, setSeverity] = useState("info");
  // const userId = localStorage.getItem("userId");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("xs"));

  useEffect(() => {
    const myProfileInfo = async () => {
      try {
        const myInfo = await axiosAuth("/user/profile/myProfile");
        setMyUserInfo(myInfo.data);
        console.log(myInfo.data);

        if (myInfo.data.me.role === "journalist") {
          const journalistInfo = await axiosAuth("/post/journalistPosts", {
            params: {
              page,
              idAuthor: myInfo.data.me._id,
            },
          });
          console.log(journalistInfo.data);
          setJournalistData(journalistInfo.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    myProfileInfo();
  }, [page, load]);

  const handleDeleteComment = async (id) => {
    try {
      setLoad(true);
      await axiosAuth.delete("/comment/deleteComment", { data: id });

      setLoad(false);
      setSeverity("success");
      setSnackbar({
        open: true,
        message: intl.formatMessage({ id: "comment.delete" }),
      });
      setPage(1);
    } catch (error) {
      setLoad(true);
      setSeverity("warning");
      setSnackbar({
        open: true,
        message: intl.formatMessage({ id: "comment.delete.fail" }),
      });
      console.log(error.response);
    }
  };

  const handleDeleteBookmark = async (postId) => {
    console.log(postId, myUserInfo.me._id);
    try {
      setLoad(true);
      const deleteBookmark = await axiosAuth.post("/user/deleteBookmark", {
        bookmarkId: postId,
        userId: myUserInfo.me._id,
      });
      console.log(deleteBookmark);
      setLoad(false);
      setSeverity("success");
      setSnackbar({
        open: true,
        message: intl.formatMessage({ id: "bookmark.delete" }),
      });
      setPage(1);
    } catch (error) {
      setLoad(true);
      setSeverity("warning");
      setSnackbar({
        open: true,
        message: intl.formatMessage({ id: "bookmark.delete.fail" }),
      });
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
      setLoad(false);
      setSeverity("success");
      setSnackbar({
        open: true,
        message: intl.formatMessage({ id: "post.delete" }),
      });
      setPage(1);
    } catch (error) {
      setLoad(true);
      setSeverity("warning");
      setSnackbar({
        open: true,
        message: intl.formatMessage({ id: "bookmark.delete.fail" }),
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
    <Grid container spacing={2} className={classes.pageMargin}>
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
        <FormattedMessage id="myProfile" default="default text">
          {(message) => <Typography variant="h2">{message}</Typography>}
        </FormattedMessage>
      </Grid>
      <Grid item xs={12} md={8}>
        {myUserInfo.me && (
          <ProfileCard size="big" data={myUserInfo.me} avatar={"avatar"} />
        )}
      </Grid>
      <Grid item xs={12} md={8}>
        <Grid container justify={matches ? "flex-start" : "flex-end"}>
          <Grid item xs={12} sm={2}>
            <Button
              {...configButton}
              onClick={() => {
                history.push("/settings");
              }}
            >
              {intl.formatMessage({ id: "button.edit" })}
            </Button>
          </Grid>
        </Grid>
      </Grid>
      {myUserInfo.me && myUserInfo.me.role === "visitor" ? (
        <>
          <Grid item xs={12} sm={8}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="myprofile tabs"
            >
              <Tab
                label={intl.formatMessage({ id: "bookmarks" })}
                disableRipple
              />
              <Tab
                label={intl.formatMessage({ id: "comments" })}
                disableRipple
              />
            </Tabs>
          </Grid>
          <Grid item xs={12}>
            <TabPanel value={value} index={0}>
              {myUserInfo.me && myUserInfo.me.bookmarks.length > 0 ? (
                <PrimarySmallLayout
                  data={myUserInfo.me.bookmarks}
                  profile={true}
                  handleDelete={handleDeleteBookmark}
                />
              ) : (
                <FormattedMessage id="bookmarks.empty" default="default text">
                  {(message) => (
                    <Typography variant="h2" color="primary">
                      {message}
                    </Typography>
                  )}
                </FormattedMessage>
              )}
            </TabPanel>
            <TabPanel value={value} index={1}>
              {myUserInfo.myComments && myUserInfo.myComments.length > 0 ? (
                <CommentLayout
                  data={myUserInfo.myComments}
                  handleDelete={handleDeleteComment}
                />
              ) : (
                <FormattedMessage id="comments.empty" default="default text">
                  {(message) => (
                    <Typography variant="h2" color="primary">
                      {message}
                    </Typography>
                  )}
                </FormattedMessage>
              )}
            </TabPanel>
          </Grid>
        </>
      ) : (
        <>
          <Grid item xs={12} sm={8}>
            <FormattedMessage id="myPosts" default="default text">
              {(message) => <Typography variant="h2">{message}</Typography>}
            </FormattedMessage>
          </Grid>
          <Grid item xs={12}>
            {journalistData.postsPaginated && (
              <PrimarySmallLayout
                data={journalistData.postsPaginated}
                profile={true}
                handleDelete={handleDeletePost}
              />
            )}
          </Grid>
          <Grid item xs={12}>
            <Grid container justify="center">
              <Grid item>
                {journalistData.numberOfPosts > 12 && (
                  <Pagination
                    count={Math.ceil(journalistData.numberOfPosts / 12)}
                    page={page}
                    color="secondary"
                    variant="outlined"
                    defaultPage={page}
                    renderItem={(item) => (
                      <PaginationItem
                        {...item}
                        className={classes.paginationItem}
                      />
                    )}
                    onChange={(e, value) => {
                      setPage(value);
                    }}
                  />
                )}
              </Grid>
            </Grid>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default MyProfile;
