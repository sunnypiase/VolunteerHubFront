import { Container, Grid } from '@mui/material';
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
