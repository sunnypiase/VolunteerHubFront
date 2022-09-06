import {  Container, Grid } from '@mui/material';
import axios, { AxiosError } from 'axios';
import { useState } from 'react';
import { useCurrentPostConnections } from '../Hooks/currentPostConnections';
import { useCurrentUser } from '../Hooks/currentUser';
import { IPostConnection } from '../models';
import CustomErrorMessage from './CustomErrorMessage';
import CustomModal from './CustomModal';
import PostConnectionDetails from './PostConnectionDetails';
import PostConnectionView from './PostConnectionView';
import SiteLoader from './SiteLoader';

function AccountMessages() {
  const { error, loading, currentUserConnections, setCurrentUserConnections } =
    useCurrentPostConnections();

  const [currentConnectionModal, setCurrentConnectionModal] = useState<
    IPostConnection | undefined
  >();

  const { currentUser } = useCurrentUser();

  const handleDeletePostConnection = async (id: number) => {
    try {
      const response = await axios.delete(
        'https://localhost:7266/api/PostConnection?id=' + id,
        {
          withCredentials: true,
        }
      );
      const newPostConnections = currentUserConnections.filter((pc) => pc.postConnectionId !== id);
      setCurrentUserConnections(newPostConnections);

      if (response.status === 200) {
        console.log('post connection deleted successfuly');
      }
    } catch (e: unknown) {
      const error = e as AxiosError;
      console.log(error);
    }

  }

  return (
    <>
      {error && <CustomErrorMessage error={error} />}
      {loading && <SiteLoader />}
      <Container
        sx={{
          width: '100%',
          "@media": {
            maxWidth: "none",
          },
        }}
      >
        <Grid
          container
          direction="column"
          sx={{
            width: "100%",
            margin: "0px auto",
          }}
        >
          {currentUserConnections.map((postCon) => {
            return (
              <Grid
                item
                key={postCon.postConnectionId}
                sx={{
                  width: '100%',
                  padding: '0px!important',
                  margin: '20px',
                }}
              >
                <PostConnectionView
                  connection={postCon}
                  key={postCon.postConnectionId}
                  setCurrentConnection={(currentConnection: IPostConnection) =>
                    setCurrentConnectionModal(currentConnection)
                  }
                  handleDeletePostConnection={handleDeletePostConnection}
                  isDetailsVisible={true}
                />
              </Grid>
            );
          })}
          {/* set modal for post view */}
          {currentConnectionModal !== undefined && (
            <CustomModal
              h1CustomClass="modal-title"
              isAutoModalHeight={false}
              title="Post Connection Details"
              onClose={() => setCurrentConnectionModal(undefined)}
            >
              <PostConnectionDetails
                connection={currentConnectionModal}
                currentUser={currentUser}
              />
            </CustomModal>
          )}
        </Grid>
      </Container>
    </>
  );
}

export default AccountMessages;
