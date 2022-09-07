import ModeEditIcon from "@mui/icons-material/ModeEdit";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { Box, Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

export function UserInfoRight() {
  const navigate = useNavigate();

  const navigateToEdit = () => {
    navigate("/account/edit");
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Grid
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Button
            variant="contained"
            startIcon={<PersonAddIcon />}
            sx={{
              backgroundColor: "#57897d",
              "&:hover": {
                backgroundColor: "#044945",
              },
              mb: 2,
            }}
          >
            Subscribe
          </Button>
          <Button
            variant="contained"
            startIcon={<ModeEditIcon />}
            sx={{
              backgroundColor: "#57897d",
              "&:hover": {
                backgroundColor: "#044945",
              },
            }}
          >
            Message
          </Button>
        </Grid>

        <Button
          variant="contained"
          sx={{
            backgroundColor: "#57897d",
            "&:hover": {
              backgroundColor: "#044945",
            },
          }}
          onClick={() => navigateToEdit()}
        >
          Edit
        </Button>
      </Box>
    </>
  );
}
