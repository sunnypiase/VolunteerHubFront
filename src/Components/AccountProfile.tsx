import { Container, Grid, CardMedia, Typography } from "@mui/material";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../Hooks/currentUser";
import { useIsAuthorize } from "../Hooks/isAuthorize";
import { IUser } from "../models";
import { UserInfoLeft } from "./Profile/UserInfoLeft";
import { UserInfoRight } from "./Profile/UserInfoRight";
import { UserInfoTable } from "./Profile/UserInfoTable";
import { UserPosts } from "./Profile/UserPosts";

function AccountProfile() {
  const { currentUser } = useCurrentUser();
  //const { isAuthorized } = useIsAuthorize();
  const navigate = useNavigate();
  console.log("user" + currentUser);

  const navigateToIndex = () => {
    console.log("navigate");
    navigate("/");
  };

  /*React.useEffect(() => {
    if (!useIsAuthorize()) {
      navigateToIndex();
    }
  }, [navigateToIndex]); */

  return (
    <Container
      sx={{
        backgroundColor: "#ffeddf",
      }}
    >
      <div className="loginHeader">
        <Typography
          sx={{
            fontFamily: "Inter",
            fontStyle: "normal",
            fontWeight: "500",
            fontSize: "36px",
            color: "#FFFCFC",
            padding: "10px 0px",
            width: "max",
          }}
        >
          Your profile
        </Typography>
      </div>
      <Container
        sx={{
          py: 8,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
        maxWidth="md"
      >
        <UserInfoLeft user={currentUser} />
        <UserInfoTable user={currentUser} />
        <UserInfoRight />
      </Container>
    </Container>
  );
}

export default AccountProfile;
