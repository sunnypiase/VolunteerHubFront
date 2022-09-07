import { Button, Container, Grid } from '@mui/material';
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
  const {
    error,
    loading,
    currentUserConnections,
    handleDeletePostConnection,
    renewHasSeenStatus,
    setCurrentUserConnections,
  } = useCurrentPostConnections();

  const [currentConnectionModal, setCurrentConnectionModal] = useState<
    IPostConnection | undefined
  >();

  const { currentUser } = useCurrentUser();

  const handleModalClose = () => {
    setCurrentConnectionModal(undefined);
  };

  const handleModalOpen = (currentConnection: IPostConnection) => {
    setCurrentConnectionModal(currentConnection);
  };

  const markAllAsRead = () => {
    let connectionIds = currentUserConnections.map((connection) => {
      if (connection.userHasSeen === false) {
        return connection.postConnectionId;
      }
      return undefined;
    }).filter((id) => id !== undefined);
    renewHasSeenStatus(connectionIds as number[]);
  };

  return (
    <>
      {error && <CustomErrorMessage error={error} />}
      {loading && <SiteLoader />}
      <Button
        variant="contained"
        sx={{
          position: 'fixed',
          bottom: '2%',
          right: '2%',
          zIndex: 2000,
          backgroundColor: 'rgba(17, 102, 96, 0.7)',
          borderRadius: '15px',
          padding: '5px 10px',
          color: '#fffcfc',
          fontSize: '15px',
          fontFamily: 'Inter',
          fontStyle: 'normal',
          fontWeight: '400',
          '&:hover': {
            backgroundColor: '#044945',
          },
        }}
        onClick={markAllAsRead}
      >
        Mark all as read
      </Button>
      <Container
        sx={{
          '@media': {
            maxWidth: 'none',
          },
        }}
      >
        <Grid
          container
          direction="column"
          sx={{
            width: '80%',
            margin: '0px auto',
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
                    handleModalOpen(currentConnection)
                  }
                  isDetailsVisible={true}
                  handleDeletePostConnection={handleDeletePostConnection}
                  renewHasSeenStatus={renewHasSeenStatus}
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
              onClose={() => handleModalClose()}
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
