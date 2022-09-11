import { Alert, AlertTitle, Box, CardMedia, Grid } from "@mui/material";
import axios from "axios";
import { Form, Formik } from "formik";
import { useEffect, useRef, useState } from "react";
import { IUser } from "../../models";
import { SelectImageButton } from "./SelectImageButton";
import { UploadImageButton } from "./UploadImageButton";
import DefaultUser from "../../images/DefaultUser.png";

interface UserProfileImageProps {
  user: IUser | undefined;
}

export function UserProfileImage({ user }: UserProfileImageProps) {
  const imageInput = useRef<HTMLInputElement>(null);
  const [imageBlobUrl, setImageBlobUrl] = useState(DefaultUser);
  const [fileToSend, setFileToSend] = useState<FormData>();
  const [imageSelected, setImageSelected] = useState(false);
  const [imageSelectedFirst, setImageSelectedFirst] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");

  useEffect(() => {
    if (!imageSelectedFirst) {
      setImageBlobUrl(
        `${process.env.REACT_APP_API_URL!.trim()}/api/Blob?name=${user?.profileImage.imageId
        }.${user?.profileImage.format}`
      );
    }
  });

  const handleImageChange = async (
    event: React.FormEvent<HTMLInputElement>
  ) => {
    const files = imageInput.current?.files;

    if (files) {
      const formData = new FormData();
      formData.append("profileImageFile", files[0]);
      formData.append("email", user!.email);
      setImageBlobUrl(URL.createObjectURL(files[0]));
      setFileToSend(formData);
    }

    setImageSelected((prev) => !prev);
    if (!imageSelectedFirst) {
      setImageSelectedFirst(true);
    }
  };

  const handleNewImageUpload = async () => {
    setImageSelected((prev) => !prev);
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL!.trim()}/api/users/image`,
        fileToSend,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setAlertTitle("success");
      }
    } catch (e: unknown) {
      setAlertTitle("error");
    }
  };

  return (
    <Grid display="flex" flexDirection="column">
      {user?.profileImage && (
        <Box display="flex" alignSelf="center">
          <CardMedia
            component="img"
            sx={{
              borderRadius: "50%",
              width: "100px",
              height: "100px",
              overflow: "hidden",
              mb: 3,
            }}
            image={imageBlobUrl}
            onError={(
              event: React.SyntheticEvent<
                HTMLImageElement,
                Event
              >
            ) => (event.currentTarget.src = DefaultUser)}
          />
        </Box>
      )}
      <Formik
        initialValues={{}}
        onSubmit={() => {
          handleNewImageUpload();
        }}
      >
        <Form>
          <input
            hidden
            id="uploadImage"
            name="uploadImage"
            accept="image/*"
            type="file"
            ref={imageInput}
            onInput={(e) => {
              handleImageChange(e);
            }}
          />
          <label htmlFor="uploadImage">
            <SelectImageButton isSelected={imageSelected} />
            <UploadImageButton isSelected={imageSelected} />
          </label>
        </Form>
      </Formik>
      {alertTitle === "success" &&
        <Alert severity="success" onClose={() => { setAlertTitle(""); }}
          sx={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            backgroundColor: '#006A4E',
            color: 'white'
          }}>
          <AlertTitle>
            Success
          </AlertTitle>
          Profile image changed
        </Alert>
      }
      {alertTitle === "error" &&
        <Alert severity="error" onClose={() => { setAlertTitle(""); }}
          sx={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            backgroundColor: '#AA0000',
            color: 'white'
          }}>
          <AlertTitle>
            Error
          </AlertTitle>
          An error occurred while changing the image
        </Alert>
      }
    </Grid>
  );
}
