import { Container, Grid } from '@mui/material';
import { useCurrentPostConnections } from '../Hooks/currentPostConnections';
import { IPost, IPostConnection } from '../models';
import CustomErrorMessage from './CustomErrorMessage';
import CustomModal from './CustomModal';
import PostConnectionView from './PostConnectionView';
import SiteLoader from './SiteLoader';
import { useState } from 'react';
import PostConnectionDetails from './PostConnectionDetails';

function AccountMessages() {
  const { error, loading, currentUserConnections } =
    useCurrentPostConnections();

  const [currentConnectionModal, setCurrentConnectionModal] = useState<
    IPostConnection | undefined
  >();

  return (
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
              title="Connection details"
              onClose={() => setCurrentConnectionModal(undefined)}
            >
              <PostConnectionDetails connection={currentConnectionModal} />
            </CustomModal>
          )}
        </Grid>
      </Container>
    </>
  );
}

export default AccountMessages;
