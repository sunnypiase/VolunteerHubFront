import {
  Badge,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';
import { IPostConnection } from '../models';

interface PostSimpleViewProps {
  connection: IPostConnection;
  setCurrentConnection: (currentConnection: IPostConnection) => void;
  handleDeletePostConnection: (id: number) => Promise<void>;
  isDetailsVisible: boolean;
}

function PostConnectionView({
  connection,
  setCurrentConnection,
  handleDeletePostConnection,
  isDetailsVisible,
}: PostSimpleViewProps) {


  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: 'center',
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Card
          sx={{
            display: "flex",
            justifyContent: 'center',
            alignItems: "center",
            height: "100%",
            width: "60%",
            flexDirection: "column",
            backgroundColor: "#FBDBC3",
            borderRadius: "20px",
            boxShadow: "0px 4px 4px rgba(243, 189, 149, 0.58)",
          }}
        >
          <CardContent
            sx={{
              width: '100%',
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
              padding: '15px 15px 5px',
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
                fontFamily: "Inter",
                fontStyle: "normal",
                fontWeight: "500",
                fontSize: "30px",
                textAlign: "center",
                marginBottom: "10px",
              }}
            >
              {connection.header}
            </Typography>
            <div className="postContent">
              <Typography
                align="center"
                sx={{
                  fontFamily: "Inter",
                  fontStyle: "normal",
                  fontWeight: "400",
                  fontSize: "22px",
                  width: "100%",
                }}
              >
                {connection.title}
              </Typography>
            </div>
          </CardContent>

          {isDetailsVisible && (
            <CardActions
              sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
              <Button onClick={() => handleDeletePostConnection(connection.postConnectionId)}
                sx={{
                  backgroundColor: '#FF7171',
                  borderRadius: "20px",
                  padding: '5px 10px',
                  color: "#fffcfc",
                  fontSize: "20px",
                  fontFamily: "Inter",
                  fontStyle: "normal",
                  fontWeight: "400",
                  width: '15%',
                  '&:hover': {
                    backgroundColor: '#EF4B4B',
                  },
                }}>
                Delete
              </Button>
              <Button
                onClick={() => setCurrentConnection(connection)}
                sx={{
                  backgroundColor: "rgba(17, 102, 96, 0.7)",
                  borderRadius: "20px",
                  padding: '5px 10px',
                  color: "#fffcfc",
                  fontSize: "20px",
                  fontFamily: "Inter",
                  fontStyle: "normal",
                  fontWeight: "400",
                  width: '15%',
                  "&:hover": {
                    backgroundColor: "#044945",
                  },
                }}
              >
                Details
              </Button>
            </CardActions>
          )}
        </Card>
      </Box>
    </>
  );
}

export default PostConnectionView;
