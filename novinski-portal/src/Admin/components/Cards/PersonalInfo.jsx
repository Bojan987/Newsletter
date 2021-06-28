import { Divider, Grid, Typography } from "@material-ui/core";
import React from "react";
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { makeStyles,useTheme,useMediaQuery } from "@material-ui/core";
import { useIntl} from 'react-intl';
import { LangContext } from '../../../intl/IntlWrapper'

const useStyles = makeStyles((theme) => ({
  divider: {
    display:'flex',
    justifyContent:'center',
    alignItems:'center'
  },
  overflow: {
    overflow: "hidden",
  },
  success: {
    color: theme.palette.success.dark,
  },
  warning: {
    color: theme.palette.warning.dark,
  },
  boxBorder:{
      borderTop:`1px solid rgba(0, 0, 0, 0.12)`,
      borderBottom:`1px solid rgba(0, 0, 0, 0.12)`,
      margin:'1rem 0',
      padding:'1rem',
  },
  paddingY:{
    padding:'0.2rem 0',
    '&:not(:last-child)': {
      borderBottom:`0.5px dotted rgba(0, 0, 0, 0.12)`,
      borderWidth:'20px'
  }
   ,
  }
}));

const PersonalInfo = ({user}) => {
  const classes = useStyles();
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('xs'));
  const smallScreen = useMediaQuery(theme.breakpoints.down(410))
  const date = new Date(user.lastLogin);
  const intl = useIntl()
  const langctx = React.useContext(LangContext)
  const formatedDateRs =
    date &&
    date.toLocaleString("sr-Latn-RS", {
      day: "numeric", // numeric, 2-digit
      year: "numeric", // numeric, 2-digit
      month: "long", // numeric, 2-digit, long, short, narrow
      hour: "numeric", // numeric, 2-digit
      minute: "numeric", // numeric, 2-digit
    });
    
    const formatedDateEn =
    date &&
    date.toLocaleString("en-US", {
      day: "numeric", // numeric, 2-digit
      year: "numeric", // numeric, 2-digit
      month: "long", // numeric, 2-digit, long, short, narrow
      hour: "numeric", // numeric, 2-digit
      minute: "numeric", // numeric, 2-digit
    });
  
  return (
    <Grid container className={classes.boxBorder} spacing={theme.breakpoints.down(960) ? 0 : 5}>
      <Grid item xs={12} sm={12} md={5}>
        <Grid container className={classes.paddingY}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="primary">
            {intl.formatMessage({id: "email"})}
            </Typography>
          </Grid>
          <Grid item xs={9} sm={6}>
            <Typography variant="body1" className={classes.overflow}>
              {user.email}
            </Typography>
          </Grid>
          <Grid item xs={2}>
           {!smallScreen ? <Typography
              variant="body1"
              className={
                user.emailConfirmed
                  ? classes.success
                  : classes.warning
              }
            >
              {user.emailConfirmed ? intl.formatMessage({id: "confirmed"}) : intl.formatMessage({id: "unconfirmed"})}
            </Typography>:
            <Grid container alignItems='center' justify='flex-end'>

              <FiberManualRecordIcon fontSize='small' className={
               user.emailConfirmed
                 ? classes.success
                 : classes.warning
             }/>
            </Grid>
             }
          </Grid>
          
        </Grid>
        <Grid container className={classes.paddingY}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="primary">
            {intl.formatMessage({id: "phone"})}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1" className={classes.overflow}>
              {user.phone ? user.phone : intl.formatMessage({id: "noPhone"})}
            </Typography>
          </Grid>
        </Grid>
        <Grid container className={classes.paddingY}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="primary">
            {intl.formatMessage({id: "country"})}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1" className={classes.overflow}>
              {user.country ? user.country : intl.formatMessage({id: "noCountry"})}
            </Typography>
          </Grid>
        </Grid>
        <Grid container className={classes.paddingY}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="primary">
            {intl.formatMessage({id: "city"})}
            </Typography>
          </Grid>{" "}
          <Grid item xs={12} sm={6}>
            <Typography variant="body1" className={classes.overflow}>
              {user.city ? user.city :intl.formatMessage({id: "noCity"})}
            </Typography>
          </Grid>
        </Grid>
        <Grid container className={classes.paddingY}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="primary">
            {intl.formatMessage({id: "address"})}
            </Typography>
          </Grid>{" "}
          <Grid item xs={12} sm={6}>
            <Typography variant="body1" className={classes.overflow}>
              {user.address ? user.address :intl.formatMessage({id: "noAddress"})}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}  md={1} className={classes.divider}>
        <Divider orientation={matches?"horizontal":"vertical"}  />
      </Grid>
      <Grid item xs={12}  md={5}>
      <Grid container className={classes.paddingY}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="primary">
            {intl.formatMessage({id: "lastLogin"})}
            </Typography>
          </Grid>{" "}
          <Grid item xs={12} sm={6}>
            <Typography variant="body1" className={classes.overflow}>
              {langctx.locale==='en-US' && formatedDateEn ? formatedDateEn : langctx.locale==='sr-RS' && formatedDateRs ? formatedDateRs : "Unknown" }
            </Typography>
          </Grid>
        </Grid>
        <Grid container className={classes.paddingY}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="primary">
            {intl.formatMessage({id: "lastIp"})}
            </Typography>
          </Grid>{" "}
          <Grid item xs={12} sm={6}>
            <Typography variant="body1" className={classes.overflow}>
              {user.lastIpAddress ? user.lastIpAddress : intl.formatMessage({id: "noAddress"}) }
            </Typography>
          </Grid>
        </Grid>
        <Grid container className={classes.paddingY}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="primary">
            {intl.formatMessage({id: "status"})}
            </Typography>
          </Grid>{" "}
          <Grid item xs={12} sm={6}>
            <Typography variant="body1" className={`${classes.overflow} ${user.accountStatus === 'active'
                  ? classes.success
                  : classes.warning} `}>
              {user.accountStatus ? user.accountStatus :"Unknown"}
            </Typography>
          </Grid>
        </Grid>

      </Grid>
    </Grid>
  );
};

export default PersonalInfo;
