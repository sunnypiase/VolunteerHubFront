import { Button, Grid, Typography } from "@mui/material";
import { IUser } from "../../models";
import AccounPosts from "../AccountPosts";

interface UserPostsProps {
  user: IUser | undefined;
}

export function UserPosts(props: UserPostsProps) {
  return (
    <>
      <Grid
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <Typography variant="subtitle1" align="center">
          Your Posts
        </Typography>
        <AccounPosts />
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#57897d",
            "&:hover": {
              backgroundColor: "#044945",
            },
          }}
        >
          More
        </Button>
      </Grid>
    </>
  );
}
