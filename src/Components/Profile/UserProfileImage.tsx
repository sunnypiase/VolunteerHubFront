import { CardMedia, Grid } from '@mui/material';
import axios, { AxiosError } from 'axios';
import { Form, Formik } from 'formik';
import { useRef, useState } from 'react';
import { IUser } from '../../models';
import { SelectImageButton } from './SelectImageButton';
import { UploadImageButton } from './UploadImageButton';

interface UserProfileImageProps {
  user: IUser | undefined;
}

export function UserProfileImage(props: UserProfileImageProps) {
  const imageInput = useRef<HTMLInputElement>(null);
  const [imageBlobUrl, setImageBlobUrl] = useState('');
  const [fileToSend, setFileToSend] = useState<FormData>();
  const [imageSelected, setImageSelected] = useState(false);
  const [imageName, setImageName] = useState('');

  const handleImageChange = async (
    event: React.FormEvent<HTMLInputElement>
  ) => {
    const files = imageInput.current?.files;

    if (files) {
      setImageName(files![0].name ?? '');

      const formData = new FormData();
      formData.append('profileImageFile', files[0]);
      formData.append('email', props.user!.email);
      setImageBlobUrl(URL.createObjectURL(files[0]));
      setFileToSend(formData);
    }

    setImageSelected((prev) => !prev);
  };

  const handleNewImageUpload = async () => {
    try {
      const response = await axios.put(
        'https://localhost:7266/api/users/image',
        fileToSend,
        {
          withCredentials: true,
        }
      );
      window.location.reload();
    } catch (e: unknown) {
      const error = e as AxiosError;
    }
  };

  return (
    <Grid>
      {props.user?.profileImage && (
        <CardMedia
          component="img"
          sx={{
            borderRadius: '50%',
            width: '100px',
            height: '100px',
            overflow: 'hidden',
            mb: 3,
          }}
          image={`https://localhost:7266/api/Blob?name=${props.user?.profileImage.imageId}.${props.user?.profileImage.format}`}
          alt="UserImage"
        />
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
            <br></br>
          </label>
          {imageName}
        </Form>
      </Formik>
    </Grid>
  );
}
