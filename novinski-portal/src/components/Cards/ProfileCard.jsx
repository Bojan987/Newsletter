import React, { useEffect, useState } from "react";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";
import { Link } from "@material-ui/core";
import { useTheme } from "@material-ui/core";
import { useMediaQuery } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) => ({
  small: {
    fontSize: "3rem",
  },
  medium: {
    fontSize: "5rem",
  },
  big: {
    fontSize: "9rem",
  },
  role: {
    textDecoration: "underline",
    marginLeft: 20,
    fontSize: "0.8rem",
  },
  avatarImage: {
    width: 120,
    height: 120,
    objectFit: "cover",
    // justifySelf: "center",
  }
}));

const ProfileCard = ({ size, isAdmin, data }) => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  const [links, setLinks] = useState({
    facebook: "http://facebook.com",
    instagram: "http://instagram.com",
    twitter: "http://twitter.com",
  });

  useEffect(() => {
    if (data.socialAccounts) {
      data.socialAccounts.forEach((el) => {
        if (el.name && el.name === "facebook") {
          if (el.link && !el.link.includes("http://")) {
            el.link = "http://" + el.link;
          }
          setLinks((previous) => {
            return {
              ...previous,
              facebook: el.link ? el.link : links.facebook,
            };
          });
        }
        if (el.name && el.name === "twitter") {
          if (el.link && !el.link.includes("http://"))
            el.link = "http://" + el.link;
          setLinks((previous) => {
            return { ...previous, twitter: el.link ? el.link : links.twitter };
          });
        }
        if (el.name && el.name === "instagram") {
          if (el.link && !el.link.includes("http://"))
            el.link = "http://" + el.link;
          setLinks((previous) => {
            return {
              ...previous,
              instagram: el.link ? el.link : links.instagram,
            };
          });
        }
      });
    }
  }, [data.socialAccounts,links.facebook,links.instagram,links.twitter]);

  return (
    <Grid container alignItems="center">
      <Grid item xs={12} sm={3}>
        <Grid container justify={matches ? "center" : "flex-start"}>
        {data.image ? (
              <Avatar
                src={`http://localhost:5000/images/${data.image}`}
                className={classes.avatarImage}
              />
            ) : (
              <AccountCircleOutlinedIcon className={classes[size]} />
            )}
          
        </Grid>
      </Grid>
      <Grid item xs={12} sm={9}>
        <Grid container spacing={1}>
          <Grid item>
            <Typography variant="h5" component="span" color="primary">
              {data.firstName} {data.lastName}
            </Typography>
            {/* { isAdmin &&  */}
            <Typography
              varian="body2"
              component="span"
              className={classes.role}
            >
              {data && data.role && data.role.toUpperCase()}
            </Typography>

            {/* } */}
          </Grid>
          <Grid item>
            <Typography variant="body1">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam animi
              repellendus saepe debitis non earum illo consequuntur tenetur.
              Sed, eveniet. Explicabo nostrum ea veniam? Doloremque voluptas
              nemo dolores aliquid minima!
            </Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={2}>
              <Grid item>
                <Link
                  href={links.facebook}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <FacebookIcon color="primary" />
                </Link>
              </Grid>
              <Grid item>
                <Link
                  href={links.instagram}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <InstagramIcon color="primary" />
                </Link>
              </Grid>
              <Grid item>
                <Link
                  href={links.twitter}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <TwitterIcon color="primary" />
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProfileCard;
