import {
  Box,
  CardMedia,
  Container,
  Grid,
  Modal,
  Typography,
} from "@mui/material";
import DefaultUser from "../images/DefaultUser.png";
import DefaultPostImage from "../images/DefaultPostImage.png";
import { IPostConnection, IUser } from "../models";
import { useCurrentUser } from "../Hooks/currentUser";
import { PostDetailsMini } from "./PostDetailsMini";
import { DetailedHTMLProps, HTMLAttributes } from "react";
import CustomModal from "./CustomModal";

const MODAL_STYLES = {
  position: "absolute",
  backgroundColor: "#FFF",
  padding: "15px",
  zIndex: "1000",
  width: "35%",
  borderRadius: ".5em",
};
const OVERLAY_STYLE = {
  position: "fixed",
  display: "flex",
  justifyContent: "center",
  top: "0",
  left: "0",
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0,0,0, .8)",
  zIndex: "1000",
  overflowY: "auto",
};

interface ConnectionDetailsProps {
  connection: IPostConnection | undefined;
  currentUser: IUser | undefined;
}

interface UserInfo {
  fullName: String;
  email: String;
  phoneNumber: String;
}

function PostConnectionDetails({
  connection,
  currentUser,
}: ConnectionDetailsProps) {
  const volunteerPostImage = `https://localhost:7266/api/Blob?name=${connection?.volunteerPost?.postImage.imageId}.${connection?.volunteerPost?.postImage.format}`;
  const needfulPostImage = `https://localhost:7266/api/Blob?name=${connection?.needfulPost?.postImage.imageId}.${connection?.needfulPost?.postImage.format}`;

  const otherParty: UserInfo = {
    fullName:
      currentUser?.role == 0
        ? `${connection?.needfulPost.user.name} ${connection?.needfulPost.user.surname}`
        : `${connection?.volunteerPost.user.name} ${connection?.volunteerPost.user.surname}`,
    email:
      currentUser?.role == 0
        ? `${connection?.needfulPost.user.email}`
        : `${connection?.volunteerPost.user.email}`,
    phoneNumber:
      currentUser?.role == 0
        ? `${connection?.needfulPost.user.phoneNumber}`
        : `${connection?.volunteerPost.user.phoneNumber}`,
  };

  return (
    <Container component="main" sx={{ marginTop: 3 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          sx={{
            color: "#4F3328",
            fontFamily: "Inter",
            fontStyle: "normal",
            fontWeight: "600",
            fontSize: "24px",
            textAlign: "center",
          }}
        >
          {connection?.title}
        </Typography>
        <Grid
          container
          sx={{
            margin: "15px 0px",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Grid item sx={{ width: "66%" }}>
            <Typography
              sx={{
                fontFamily: "Inter",
                fontStyle: "normal",
                fontWeight: "400",
                fontSize: "16px",
              }}
            >
              {connection?.message}
            </Typography>
          </Grid>
          <Grid
            item
            sx={{
              width: "20%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography sx={{ mb: 1 }} variant="h6" paragraph>
                Other party contacts:
              </Typography>
              <Typography sx={{ mb: 1 }} variant="subtitle1" paragraph>
                Full Name
              </Typography>
              <Box
                sx={{
                  alignContent: "center",
                  borderRadius: "16px",
                }}
              >
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  paragraph
                >
                  {otherParty.fullName}
                </Typography>
              </Box>

              <Typography sx={{ mb: 1 }} variant="subtitle1" paragraph>
                Phone number
              </Typography>
              <Box
                sx={{
                  alignContent: "center",
                  borderRadius: "16px",
                }}
              >
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  paragraph
                >
                  {otherParty.phoneNumber}
                </Typography>
              </Box>

              <Typography sx={{ mb: 1 }} variant="subtitle1" paragraph>
                Email
              </Typography>
              <Box
                sx={{
                  alignContent: "center",
                  borderRadius: "16px",
                }}
              >
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  paragraph
                >
                  {otherParty.email}
                </Typography>
              </Box>
            </Box>
          </Grid>

          <PostDetailsMini
            post={connection?.volunteerPost}
            postImage={volunteerPostImage}
            label={"Volunteer Post"}
          />
          <PostDetailsMini
            post={connection?.needfulPost}
            postImage={needfulPostImage}
            label={"Needful Post"}
          />
        </Grid>
      </Box>
    </Container>
  );
}

export default PostConnectionDetails;
