import { Button, Grid } from "@mui/material";
import { IUser } from "../../models";
import { UserProfileImage } from "./UserProfileImage";

interface UserInfoLeftProps {
  user: IUser | undefined;
}

export function UserInfoLeft(props: UserInfoLeftProps) {
  const getRoleName = (role: number | undefined) => {
    switch (role) {
      case 0:
        return "Volunteer";
      case 1:
        return "Needful";
      case 2:
        return "Admin";

      default:
        return "unknown";
    }
  };
  return (
    <Grid
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        mt: "35px",
      }}
    >
      <Grid
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <UserProfileImage user={props.user} />

        <Button variant="contained" size="small" disabled sx={{
          mt: 3,
          fontSize: '0.875rem',
          borderRadius: '15px',
          backgroundColor: '#9c5e48!important',
          color: 'white!important'
        }}>
          {getRoleName(props.user?.role)?.toString()}
        </Button>
      </Grid>
    </Grid>
  );
}
