import {
  Badge,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import { IPostConnection } from '../models';

interface PostSimpleViewProps {
  connection: IPostConnection;
  setCurrentConnection: (currentConnection: IPostConnection) => void;
  isDetailsVisible: boolean;
}

function PostConnectionView({
  connection,
  setCurrentConnection,
  isDetailsVisible,
}: PostSimpleViewProps) {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Card
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            width: '50%',
            flexDirection: 'column',
            backgroundColor: '#FBDBC3',
            borderRadius: '20px',
            boxShadow: '0px 4px 4px rgba(243, 189, 149, 0.58)',
          }}
        >
          <CardContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            {!connection.userHasSeen && (
              <Grid container justifyContent="flex-end">
                <Badge
                  badgeContent={'new'}
                  color="error"
                  sx={{ my: 1, mr: 1 }}
                ></Badge>
              </Grid>
            )}
            <Typography
              sx={{
                fontFamily: 'Inter',
                fontStyle: 'normal',
                fontWeight: '500',
                fontSize: '30px',
                textAlign: 'center',
                marginBottom: '10px',
              }}
            >
              {connection.header}
            </Typography>

            <div className="postContent">
              <Typography
                align="left"
                sx={{
                  fontFamily: 'Inter',
                  fontStyle: 'normal',
                  fontWeight: '400',
                  fontSize: '22px',
                  width: '80%',
                }}
              >
                {connection.title}
              </Typography>
            </div>
          </CardContent>

          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{
              marginLeft: '75%',
            }}
          >
            {isDetailsVisible && (
              <CardActions>
                <Button
                  size="small"
                  onClick={() => setCurrentConnection(connection)}
                  sx={{
                    backgroundColor: 'rgba(17, 102, 96, 0.7)',
                    borderRadius: '20px',
                    color: '#fffcfc',
                    fontSize: '20px',
                    fontFamily: 'Inter',
                    fontStyle: 'normal',
                    fontWeight: '400',
                    '&:hover': {
                      backgroundColor: '#044945',
                    },
                  }}
                >
                  Details
                </Button>
              </CardActions>
            )}
          </Stack>
        </Card>
      </Box>
    </>
  );
}

export default PostConnectionView;
