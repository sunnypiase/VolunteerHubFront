import { Button, Container, Grid } from '@mui/material';
import { useState } from 'react';
import CustomErrorMessage from '../Components/CustomErrorMessage';
import CustomModal from '../Components/CustomModal';
import PostConnectionDetails from '../Components/MessageComponents/PostConnectionDetails';
import PostConnectionView from '../Components/MessageComponents/PostConnectionView';
import SiteLoader from '../Components/SiteLoader';
import VHBar from '../Components/VHBar';
import { useCurrentPostConnections } from '../Hooks/currentPostConnections';
import { useCurrentUser } from '../Hooks/currentUser';
import { IPostConnection } from '../models';

function AccountPostsMessages() {
  const {
    error,
    loading,
    currentUserConnections,
    handleDeletePostConnection,
    renewHasSeenStatus,
    markAllAsRead,
  } = useCurrentPostConnections();

  const [currentConnectionModal, setCurrentConnectionModal] = useState<
    IPostConnection | undefined
  >();

  const { currentUser } = useCurrentUser();

  return (
    <>
      <VHBar />
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
              width: '90%',
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
                    setCurrentConnection={(
                      currentConnection: IPostConnection
                    ) => setCurrentConnectionModal(currentConnection)}
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
    </>
  );
}

export default AccountPostsMessages;
