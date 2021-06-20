import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import CardContent from "@material-ui/core/CardContent";

import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    // maxWidth: 250,
    minHeight: 300,
    maxHeight: 300,
    marginBottom: "1rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  cardActions: {
    justifyContent: "space-between",
    alignItems: "flex-end",
    display: "flex",
  },
  cardContent: {
    maxHeight: 100,
    minHeight: 100,
    margin: "auto 0",
    overflowY: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "normal",
    display: "-webkit-box",
    WebkitLineClamp: 5,
    WebkitBoxOrient: "vertical",
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
  onHover:{
    cursor:'pointer'
  }
});

const CommentCard = ({ post,handleDelete }) => {
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
      <CardContent className={classes.cardTitle}>
        <Typography gutterBottom variant="h5">
          {post.postRelated.title}
        </Typography>
      </CardContent>
      <CardContent>
        <Typography
          gutterBottom
          variant="body2"
          className={classes.cardContent}
        >
          {post.content}
        </Typography>
      </CardContent>
      <CardContent className={classes.cardActions}>
        <Typography variant="body2">{formatedDate}</Typography>
        <DeleteOutlinedIcon color="secondary" onClick={()=>handleDelete({id:post._id})} className={classes.onHover}/>
      </CardContent>
    </Card>
  );
};

export default CommentCard;
