import { Button } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";

interface UploadImageButtonProps {
  isSelected: boolean;
}

export function UploadImageButton(props: UploadImageButtonProps) {
  if (props.isSelected) {
    return (
      <Button
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
        Upload new photo
      </Button>
    );
  }
  return null;
}
