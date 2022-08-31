import { Rating, Typography } from "@mui/material";

export function UserRating() {
  return (
    <>
      <Typography variant="subtitle1" align="center">
        Rating
      </Typography>
      <Rating name="simple-controlled" />
    </>
  );
}
