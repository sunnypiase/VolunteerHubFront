import { Box, Grid, Input, Stack, TextField } from "@mui/material";
import axios, { AxiosError } from "axios";
import { ErrorMessage, Form, Formik, FormikHelpers } from "formik";
import { useState } from "react";
import { IUser } from "../../models";
import AccountProfileItem from "./AccountProfileItem";

interface UserInfoTableProps {
  user: IUser | undefined;
}

export interface IUserUpdate {
  name: string;
  surname: string;
  email: string;
  password: string;
  phoneNumber: string;
  address: string;
  role: string;
}

export function UserInfoTable(props: UserInfoTableProps) {
  return (
    <Stack sx={{ display: "flex", flexDirection: "column" }}>
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
