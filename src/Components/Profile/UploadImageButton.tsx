import { Button } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";

interface UploadImageButtonProps {
  isSelected: boolean;
}

export function UploadImageButton({isSelected}: UploadImageButtonProps) {
  if (isSelected) {
    return (
      <Button
        fullWidth
        type="submit"
        variant="contained"
        color="primary"
        sx={{
          backgroundColor: "#57897d",
          "&:hover": {
            backgroundColor: "#044945",
          },
        }}
      >
        <ImageIcon />
        {"Upload photo"}
      </Button>
    );
  }
  return null;
}
