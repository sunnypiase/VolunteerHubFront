import {
  Box,
  Button,
  CardMedia,
  Grid,
  Rating,
  Typography,
} from "@mui/material";
import { IUser } from "../../models";
import { UserProfileImage } from "./UserProfileImage";
import { UserRating } from "./UserRating";

interface UserInfoLeftProps {
  user: IUser | undefined;
}

export function UserInfoLeft(props: UserInfoLeftProps) {
  return (
    <Grid
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Grid
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <UserProfileImage user={props.user} />
        <Button variant="contained" size="small" disabled>
          {props.user?.role ?? "unknown"}
        </Button>
      </Grid>

      <Grid>
        <UserRating />
      </Grid>

      <Button
        variant="contained"
        sx={{
          backgroundColor: "#57897d",
          "&:hover": {
            backgroundColor: "#044945",
          },
        }}
      >
        Comments
      </Button>
    </Grid>
  );
}
