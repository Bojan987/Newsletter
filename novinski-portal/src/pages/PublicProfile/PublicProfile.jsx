import { Grid, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import ProfileCard from "../../components/Cards/ProfileCard";
import { makeStyles } from "@material-ui/core/styles";
import PrimarySmallLayout from "../../components/layouts/gridLayout/PrimarySmallLayout";
import { Pagination, PaginationItem } from "@material-ui/lab";
import { useParams } from "react-router-dom";
import {  axiosInstance } from "../../util/axios-instance";
import { FormattedMessage } from "react-intl";

const useStyles = makeStyles({
  pageMargin: {
    marginTop: "2rem",
  },
  loaderWrapper: {
    minHeight: "60vh",
    minWidth: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  paginationItem: {
    borderRadius: 5,
  },
});

const PublicProfile = () => {
  const classes = useStyles();
  
  const {id} = useParams()
  

  const [page, setPage] = useState(1);
  const [paginatedPosts, setPaginatedPosts] = useState([]);
  const [journalistInfo, setJournalistInfo] = useState([]);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(8);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const journalistProfile = async () => {
      try {
        setLoad(true)
        const journalistDetails = await axiosInstance(
          `/user/getJournalistProfile/${id}`
        );
        setJournalistInfo(journalistDetails.data);
        setLoad(false)
        
      } catch (error) {
        console.log(error);
        setLoad(true)
      }
    };

    journalistProfile();
    
  }, [id]);
    useEffect(()=>{
      
        if(journalistInfo.journalistsPosts){
    
          const postsOnPage = journalistInfo.journalistsPosts.slice(start,end)
          setPaginatedPosts(postsOnPage)
        }
      
    },[start,end,journalistInfo.journalistsPosts])

    
  return (
    <Grid container spacing={5} className={classes.pageMargin}>
      {load ? (
        <div className={classes.loaderWrapper}>
          <CircularProgress />
        </div>
      ) : (
        <>
          <Grid item xs={12} md={8}>
            {journalistInfo.existingJournalist && (
              <ProfileCard
                size="big"
                data={journalistInfo.existingJournalist}
              />
            )}
          </Grid>
          <Grid item xs={12}>
            
          <FormattedMessage id="posts" default="default text">
              {(message) => (
                <Typography variant="h4">{message}</Typography>
              )}
            </FormattedMessage>
            
          </Grid>

          <Grid item>
            {journalistInfo.existingJournalist && (
              <PrimarySmallLayout
                data={paginatedPosts}
                profile={true}
                publicProfile={true}
              />
            )}
          </Grid>
          <Grid item xs={12}>
            <Grid container justify="center">
              <Grid item>
                {journalistInfo.journalistsPosts&&<Pagination
                  count={Math.ceil(journalistInfo.journalistsPosts.length / 8)}
                  page={page}
                  color="secondary"
                  variant="outlined"
                  shape="rounded"
                  renderItem={(item) => (
                    <PaginationItem
                      {...item}
                      shape="rounded"
                      className={classes.paginationItem}
                    />
                  )}
                  onChange={(e, value) => {
                    setStart((value - 1) * 8);
                    setEnd(value * 8);
                    setPage(value);
                  }}
                />}
              </Grid>
            </Grid>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default PublicProfile;
