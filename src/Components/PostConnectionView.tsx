import {
  Button,
  Card,
  CardActions,
  CardContent,
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
    <div>
      <Card
        sx={{
          height: '100%',
          display: 'flex',
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
            <div className="postUser">
              {/* <CardMedia
                  component="img"
                  sx={{
                    borderRadius: '50%',
                    width: '100px',
                    height: '100px',
                    overflow: 'hidden',
                  }}
                  image={`https://localhost:7266/api/Blob?name=${post.user.profileImage.imageId}.${post.user.profileImage.format}`}
                  onError={(event: React.SyntheticEvent<HTMLImageElement, Event>) => event.currentTarget.src = DefaultUser}
                /> */}
              <Typography
                sx={{
                  fontFamily: 'Inter',
                  fontStyle: 'normal',
                  fontWeight: '400',
                  fontSize: '16px',
                }}
              >
                {`${connection.volunteerPost.user.name} ${connection.volunteerPost.user.surname}`}
              </Typography>
            </div>
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
              {connection.message}
            </Typography>
          </div>
        </CardContent>
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{
            marginLeft: '20%',
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
                  padding: '5px 10px',
                  marginRight: '5px',
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
    </div>
  );
}

export default PostConnectionView;
