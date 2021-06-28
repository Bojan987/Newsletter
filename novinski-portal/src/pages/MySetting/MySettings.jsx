import { Box, Divider, Grid, Tab, Tabs, Typography } from "@material-ui/core";
import React, { useState } from "react";
import TabPanel from "../../components/TabPanel/TabPanel";
import { useIntl, FormattedMessage } from "react-intl";
import { makeStyles } from "@material-ui/core/styles";
import EditProfile from "./Profile/EditProfile";
import ChangePassword from "./Profile/ChangePassword";
import Preference from "./Preference/Preference";
import SocialNetworks from "./SocialNetwork/SocialNetworks";

const useStyles = makeStyles((theme) => ({
  medium: {
    fontSize: "6rem",
  },

  delete: {
    alignSelf: "flex-start",
  },
  flex: {
    display: "flex",
  },
  divider: {
    justifySelf: "center",
    alignSelf: "center",
  },
  grid: {
    display: "grid",
  },
  pageMinHeight: {
    minHeight: "50vh",
  },
  smallScreenFonts: {
    fontSize: "0.9rem",
    [theme.breakpoints.down("xs")]: {
      fontSize: "75%",
      fontWeight: 500,
    },
    [theme.breakpoints.down(370)]: {
      fontSize: "60%",
      fontWeight: 600,
    },
  },
}));

const MySettings = () => {
  const [value, setValue] = useState(0);
  const intl = useIntl();
  const classes = useStyles();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Box pt={5}>
          <FormattedMessage id="settings" default="default text">
            {(message) => <Typography variant="h2">{message}</Typography>}
          </FormattedMessage>
        </Box>
      </Grid>
      <Grid item xs={12} sm={5} md={4} lg={3}>
        <Box py={2}>
          <FormattedMessage id="settings.description" default="default text">
            {(message) => <Typography variant="body1"> {message}</Typography>}
          </FormattedMessage>
        </Box>
      </Grid>
      <Grid item xs={12} md={10}>
        <Box pb={5}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="settings tabs"
          >
            <Tab
              label={intl.formatMessage({ id: "settings.profile" })}
              disableRipple
              className={classes.smallScreenFonts}
            />
            <Tab
              label={intl.formatMessage({ id: "settings.preferences" })}
              disableRipple
              className={classes.smallScreenFonts}
            />
            <Tab
              label={intl.formatMessage({ id: "settings.socialNetworks" })}
              disableRipple
              className={classes.smallScreenFonts}
            />
          </Tabs>
        </Box>
      </Grid>
      <Grid item xs={12} lg={10} className={classes.pageMinHeight}>
        <TabPanel value={value} index={0}>
          <Grid container>
            <Grid item xs={12} md={5}>
              <EditProfile />
            </Grid>
            <Grid item xs={1} className={classes.grid}>
              <Divider orientation="vertical" className={classes.divider} />
            </Grid>
            <Grid item xs={12} md={5}>
              <ChangePassword />
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Preference />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <SocialNetworks />
        </TabPanel>
      </Grid>
    </Grid>
  );
};

export default MySettings;
