import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";

import { axiosAuth } from "../../../util/axios-instance";
import FacebookAccount from "./networks/FacebookAccount";
import InstagramAccount from "./networks/InstagramAccount";
import TwitterAccount from "./networks/TwitterAccount";
import LinkedinAccount from "./networks/LinkedinAccount";
import CircularProgress from "@material-ui/core/CircularProgress";



// const urlValidation = Yup.object().shape({
//   network: Yup.string(),
//   link: Yup.string().matches(
//     /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
//     "Enter correct url!"
//   ),
// });
// const urlValidation = Yup.object().shape({
//   network: Yup.string(),
//   link: Yup.string().matches(
//     /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
//     "Enter correct url!"
//   ),
// });
// const urlValidation = Yup.object().shape({
//   network: Yup.string(),
//   link: Yup.string().matches(
//     /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
//     "Enter correct url!"
//   ),
// });

const SocialNetworks = () => {
  
  const [loader, setLoader] = useState(false);
  const [socialAccounts, setSocialAccounts] = useState([]);
  const [noBorder, setNoBorder] = useState({
    facebook: false,
    twitter: false,
    instagram: false,
    linkedin: false,
  });
  const [edit, setEdit] = useState({
    facebook: false,
    twitter: false,
    instagram: false,
    linkedin: false,
  });

  const handleDelete = async (el) => {
    try {
      setLoader(true);
      const deleteSocialNetwork = await axiosAuth.delete(
        "/user/profile/deleteSocialAccount",
        { data: el }
      );
      console.log(deleteSocialNetwork.data);
      setNoBorder((previous) => {
        return {
          ...previous,
          [el.name]: false,
        };
      });
      setEdit((previous) => {
        return {
          ...previous,
          [el.name]: false,
        };
      });
      setLoader(false);
    } catch (error) {
      console.log(error.response);
      setLoader(true);
    }
  };
  const handleAddorEdit = (socialNetwork) => async (
    socialNetworkInfo,
    { setErrors }
  ) => {
    console.log(edit[socialNetwork]);
    try {
      if (edit[socialNetwork]) {
        const res = await axiosAuth.put(
          `/user/profile/editSocialAccounts`,
          socialNetworkInfo
        );
        console.log(res.data);
        setEdit((previous) => {
          return {
            ...previous,
            [socialNetwork]: false,
          };
        });
        setNoBorder((previous) => {
          return {
            ...previous,
            [socialNetwork]: true,
          };
        });
      }

      if (!edit[socialNetwork]) {
        const res = await axiosAuth.put(
          `/user/profile/addSocialAccount`,
          socialNetworkInfo
        );
        setNoBorder((previous) => {
          return {
            ...previous,
            [socialNetwork]: true,
          };
        });
        console.log(res.data);
      }

      const { data } = await axiosAuth(
        "http://127.0.0.1:5000/user/profile/getSocialAccounts"
      );
      setSocialAccounts(data.socAcc);
    } catch (err) {
      console.log(err.response);
      setErrors({
        link:
          err.response && (err.response.data.error || err.response.data.message)
            ? err.response.data.error
              ? err.response.data.error
              : err.response.data.message
            : err.message,
      });
    }
  };

 

  useEffect(() => {
    const fetchSocialAccounts = async () => {
      const { data } = await axiosAuth(
        "http://127.0.0.1:5000/user/profile/getSocialAccounts"
      );
      setSocialAccounts(data.socAcc);
    };
    fetchSocialAccounts();
  }, [loader]);

  useEffect(() => {
    socialAccounts.forEach((el) => {
      if (el.name === "facebook") {
        setNoBorder((previous) => {
          return {
            ...previous,
            facebook: true,
          };
        });
      }
      if (el.name === "linkedin") {
        setNoBorder((previous) => {
          return {
            ...previous,
            linkedin: true,
          };
        });
      }
      if (el.name === "twitter") {
        setNoBorder((previous) => {
          return {
            ...previous,
            twitter: true,
          };
        });
      }
      if (el.name === "instagram") {
        setNoBorder((previous) => {
          return {
            ...previous,
            instagram: true,
          };
        });
      }
    });
  }, [socialAccounts]);

  const handleInputConfig = (socialNetwork) => {
    const isNetworkAdded = socialAccounts.some((el) => socialNetwork === el.name); //boolean - true if account exists
    if (isNetworkAdded) {
      const account = socialAccounts.find((el) => el.name === socialNetwork);
      return {
        name: "link",
        noBorder: noBorder[socialNetwork.toLowerCase()],
        value: account.link,
        label: `Your ${socialNetwork} profile link`,
        disabled: noBorder[socialNetwork.toLowerCase()],
      };
    } else return { name: "link", label: `Your ${socialNetwork} profile link` ,value:''};
  };

  const socialAccountsConfig = {
    handleAddorEdit,
    handleInputConfig,
    setNoBorder,
    setEdit,
    noBorder,
    handleDelete,
  };

  return (
    <Grid container spacing={4}>
      {loader ? (
        <CircularProgress/>
      ) : (
        socialAccounts  && (
          <>
            <FacebookAccount {...socialAccountsConfig} />

            <TwitterAccount {...socialAccountsConfig} />

            <InstagramAccount {...socialAccountsConfig} />

            <LinkedinAccount {...socialAccountsConfig} />
          </>
        )
      )}
    </Grid>
  );
};

export default SocialNetworks;
