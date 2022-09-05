import { Box, CardMedia, Container, Grid, Typography } from "@mui/material";
import DefaultUser from "../images/DefaultUser.png";
import DefaultPostImage from "../images/DefaultPostImage.png";
import { IPostConnection, IUser } from "../models";
import { useCurrentUser } from "../Hooks/currentUser";

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

          <Container component="main" sx={{ marginTop: 3 }}>
            <div className="loginHeader">
              <Typography
                sx={{
                  fontFamily: "Inter",
                  fontStyle: "normal",
                  fontWeight: "500",
                  fontSize: "26px",
                  color: "#FFFCFC",
                  padding: "10px 0px",
                  width: "max",
                }}
              >
                Volunteer post
              </Typography>
            </div>

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
                {connection?.volunteerPost?.title}
              </Typography>
              <Grid
                container
                sx={{
                  margin: "15px 0px",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <Grid
                  item
                  sx={{
                    width: "200px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "0px 10px",
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      height: "150px",
                      width: "auto",
                      borderRadius: "10px",
                    }}
                    image={volunteerPostImage}
                    onError={(
                      event: React.SyntheticEvent<HTMLImageElement, Event>
                    ) => (event.currentTarget.src = DefaultPostImage)}
                  />
                </Grid>
                <Grid item sx={{ width: "55%" }}>
                  <Typography
                    sx={{
                      fontFamily: "Inter",
                      fontStyle: "normal",
                      fontWeight: "400",
                      fontSize: "16px",
                    }}
                  >
                    {connection?.volunteerPost?.description}
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
                  <Typography
                    sx={{
                      fontFamily: "Inter",
                      fontStyle: "normal",
                      fontWeight: "400",
                      fontSize: "20px",
                      color: "#4F3328",
                      textAlign: "center",
                      marginTop: "10px",
                    }}
                  >
                    {`${connection?.volunteerPost?.user.name} ${connection?.volunteerPost?.user.surname}`}
                  </Typography>
                </Grid>
              </Grid>

              <Grid
                container
                sx={{
                  display: "flex",
                  justifyContent: "left",
                  width: "80%",
                }}
              >
                {connection?.volunteerPost?.tags.map((tag) => (
                  <Grid item key={tag.tagId}>
                    <Typography
                      sx={{
                        backgroundColor: "rgba(243, 189, 149, 0.36);",
                        padding: "3px 10px",
                        margin: "0px 10px",
                        borderRadius: "20px",
                        boxShadow: "0px 3px 6px black",
                        fontFamily: "Inter",
                        fontStyle: "normal",
                        fontWeight: "400",
                        fontSize: "17px",
                        marginBottom: "15px",
                      }}
                    >
                      {tag.name}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Container>

          <Container component="main" sx={{ marginTop: 3 }}>
            <div className="loginHeader">
              <Typography
                sx={{
                  fontFamily: "Inter",
                  fontStyle: "normal",
                  fontWeight: "500",
                  fontSize: "26px",
                  color: "#FFFCFC",
                  padding: "10px 0px",
                  width: "max",
                }}
              >
                Needful post
              </Typography>
            </div>

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
                {connection?.needfulPost?.title}
              </Typography>
              <Grid
                container
                sx={{
                  margin: "15px 0px",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <Grid
                  item
                  sx={{
                    width: "200px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "0px 10px",
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      height: "150px",
                      width: "auto",
                      borderRadius: "10px",
                    }}
                    image={needfulPostImage}
                    onError={(
                      event: React.SyntheticEvent<HTMLImageElement, Event>
                    ) => (event.currentTarget.src = DefaultPostImage)}
                  />
                </Grid>
                <Grid item sx={{ width: "55%" }}>
                  <Typography
                    sx={{
                      fontFamily: "Inter",
                      fontStyle: "normal",
                      fontWeight: "400",
                      fontSize: "16px",
                    }}
                  >
                    {connection?.needfulPost?.description}
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
                  <Typography
                    sx={{
                      fontFamily: "Inter",
                      fontStyle: "normal",
                      fontWeight: "400",
                      fontSize: "20px",
                      color: "#4F3328",
                      textAlign: "center",
                      marginTop: "10px",
                    }}
                  >
                    {`${connection?.needfulPost?.user.name} ${connection?.needfulPost?.user.surname}`}
                  </Typography>
                </Grid>
              </Grid>

              <Grid
                container
                sx={{
                  display: "flex",
                  justifyContent: "left",
                  width: "80%",
                }}
              >
                {connection?.needfulPost?.tags.map((tag) => (
                  <Grid item key={tag.tagId}>
                    <Typography
                      sx={{
                        backgroundColor: "rgba(243, 189, 149, 0.36);",
                        padding: "3px 10px",
                        margin: "0px 10px",
                        borderRadius: "20px",
                        boxShadow: "0px 3px 6px black",
                        fontFamily: "Inter",
                        fontStyle: "normal",
                        fontWeight: "400",
                        fontSize: "17px",
                        marginBottom: "15px",
                      }}
                    >
                      {tag.name}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Container>
        </Grid>
      </Box>
    </Container>
  );
}

export default PostConnectionDetails;
