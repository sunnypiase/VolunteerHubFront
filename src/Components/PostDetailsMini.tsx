import { Box, CardMedia, Container, Grid, Typography } from "@mui/material";
import { IPost, IPostConnection } from "../models";
import DefaultPostImage from "../images/DefaultPostImage.png";

interface PostDetailsMiniProps {
  post: IPost | undefined;
  postImage: string;
  label: string;
}

export function PostDetailsMini(props: PostDetailsMiniProps) {
  return (
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
          {props.label}
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
          {props.post?.title}
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
              image={props.postImage}
              onError={(event: React.SyntheticEvent<HTMLImageElement, Event>) =>
                (event.currentTarget.src = DefaultPostImage)
              }
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
              {props.post?.description}
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
              {`${props.post?.user.name} ${props.post?.user.surname}`}
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
          {props.post?.tags.map((tag) => (
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
  );
}
