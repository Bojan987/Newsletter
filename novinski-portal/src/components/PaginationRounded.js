import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import AppContext from "../context/AppContext";


const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(2),
    },
    display: "flex",
    justifyContent: "center",
  },
}));

export default function PaginationRounded(props) {
  const classes = useStyles();
  const context = useContext(AppContext);

  const pageChangeHandler = (event, page) => {
    props.page(page);
  };

  return (
    <div className={classes.root}>
      <Pagination count={Math.ceil(context.posts.length / props.rows)} shape="rounded" onChange={pageChangeHandler} />
      
    </div>
  );
}
