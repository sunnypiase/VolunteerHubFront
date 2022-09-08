import { Container, Typography } from "@mui/material";
import AboutMe from "./AboutMe";

function AboutUs() {
  return (
    <Container
      sx={{
        "@media": {
          maxWidth: "80%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          minHeight: "100%",
        },
        marginTop: "5%"
      }}
    >
        <AboutMe></AboutMe>
        <AboutMe></AboutMe>
        <AboutMe></AboutMe>
        <AboutMe></AboutMe>
    </Container>
  );
}

export default AboutUs;
