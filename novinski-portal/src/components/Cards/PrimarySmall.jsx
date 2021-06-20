import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";

import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import Typography from "@material-ui/core/Typography";

import { Link } from "react-router-dom";
const useStyles = makeStyles({
  root: {
    // maxWidth: 250,
    minHeight: 300,
    maxHeight: 400,
    marginBottom: "1rem",
  },
  cardActions: {
    justifyContent: "space-between",
    alignItems: "flex-end",
    display: "flex",
    marginTop: 25,
  },
  cardTitle: {
    maxHeight: 59,
    overflowY: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "normal",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
  },
  onHover: {
    cursor: "pointer",
  },
});

const PrimarySmall = ({ post, profile, id, handleDelete, publicProfile }) => {
  const classes = useStyles();
  const date = new Date(post.createdAt);
  const formatedDate =
    date &&
    date.toLocaleString("sr-Latn-RS", {
      day: "numeric", // numeric, 2-digit
      year: "numeric", // numeric, 2-digit
      month: "long", // numeric, 2-digit, long, short, narrow
      hour: "numeric", // numeric, 2-digit
      minute: "numeric", // numeric, 2-digit
    });

  return (
    <Card className={classes.root}>
      <CardActionArea component={Link} to={`/single-post/${id}`}>
        <CardMedia
          component="img"
          alt="Post image"
          height="190"
          image={post.image}
          title="Post Image"
        />
        <CardContent className={classes.cardTitle}>
          <Typography gutterBottom variant="h5">
            {post.title}
          </Typography>
          <div className={classes.cardActions}></div>
        </CardContent>
      </CardActionArea>
      <CardContent className={classes.cardActions}>
        <Typography variant="body2">{formatedDate}</Typography>
        {!profile ? (
          <Typography variant="body2">{`${post.author.firstName} ${post.author.lastName}`}</Typography>
        ) : publicProfile ? (
          <></>
        ) : (
          <DeleteOutlinedIcon
            color="secondary"
            onClick={() => handleDelete(id)}
            className={classes.onHover}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default PrimarySmall;
