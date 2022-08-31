import { CardMedia, Typography } from "@mui/material";
import { IUser } from "../../models";

interface UserProfileImageProps {
  user: IUser | undefined;
}

export function UserProfileImage(props: UserProfileImageProps) {
  return (
    <>
      <CardMedia
        component="img"
        sx={{
          borderRadius: "50%",
          width: "100px",
          height: "100px",
          overflow: "hidden",
        }}
        image={`https://localhost:7266/api/Blob?name=${props.user?.profileImage.imageId}.${props.user?.profileImage.format}`}
        alt="UserImage"
      />
      <Typography variant="body2">Upload new photo</Typography>
    </>
  );
}
