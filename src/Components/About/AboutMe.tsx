import { CardMedia, Container, Typography } from "@mui/material";
import DefaultUser from "../../images/DefaultUser.png";


const onAvaHover = {
  "&:hover": {
    border: "1px solid #00FF00",
    color: 'gray',
    backgroundColor: 'lightblue'
  },
};

function AboutMe() {
  return (
    <Container
      sx={{
        marginTop: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: "70%",        
      }}
    >
      <CardMedia
        component="img"
        sx={{          
          "&:hover": {
            transform: "scale(1.17)",
            transitionDuration: "500ms",
          },
          transitionDuration: "500ms",
          width: "auto",
          borderRadius: "10px",
          marginBottom: "17%",
        }}
        image={DefaultUser}
        onError={(event: React.SyntheticEvent<HTMLImageElement, Event>) =>
          (event.currentTarget.src = DefaultUser)
        }
      />
      <Typography>GO TO JIM</Typography>
    </Container>
  );
}

export default AboutMe;
