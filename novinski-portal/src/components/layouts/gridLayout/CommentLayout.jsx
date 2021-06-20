import { Grid } from "@material-ui/core";
import React from "react";
import CommentCard from "../../Cards/CommentCard";

const CommentLayout = ({data,handleDelete}) => {
  return (
    <Grid container spacing={5}>
      {data.map((el) => {
        return (
          <Grid item xs={12} sm={6} md={4} lg={3} key={el._id}>
            <CommentCard post={el} handleDelete={handleDelete} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default CommentLayout;