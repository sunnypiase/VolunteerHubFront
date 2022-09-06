import { Badge, Container, Grid } from '@mui/material';
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
  const { error, loading, currentUserConnections } =
    useCurrentPostConnections();

  const [currentConnectionModal, setCurrentConnectionModal] = useState<
    IPostConnection | undefined
  >();

  const { currentUser } = useCurrentUser();

  return (
    <>
      {error && <CustomErrorMessage error={error} />}
      {loading && <SiteLoader />}
      <Container
        sx={{
          width:'100%',
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
