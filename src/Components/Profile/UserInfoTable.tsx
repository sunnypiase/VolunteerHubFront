import { Grid, Stack } from "@mui/material";
import { IUser } from "../../models";
import AccountProfileItem from "./AccountProfileItem";

interface UserInfoTableProps {
  user: IUser | undefined;
}

export function UserInfoTable(props: UserInfoTableProps) {
  return (
    <Stack sx={{ display: "flex", flexDirection: "column", ml: 8, mr: 8 }}>
      <AccountProfileItem
        labelName={"Name"}
        labelValue={props.user?.name ?? "unknown"}
      />
      <AccountProfileItem
        labelName={"Surname"}
        labelValue={props.user?.surname ?? "unknown"}
      />
      <AccountProfileItem
        labelName={"Email"}
        labelValue={props.user?.email ?? "unknown"}
      />
      <AccountProfileItem
        labelName={"Address"}
        labelValue={props.user?.address ?? "unknown"}
      />
      <AccountProfileItem
        labelName={"Phone Number"}
        labelValue={props.user?.phoneNumber ?? "unknown"}
      />
    </Stack>
  );
}
