import { Button } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";

interface UploadImageButtonProps {
  isSelected: boolean;
}

export function UploadImageButton(props: UploadImageButtonProps) {
  if (props.isSelected) {
    return (
      <Button
        fullWidth
        type="submit"
        variant="contained"
        color="primary"
        sx={{
          backgroundColor: "#db4237",
          "&:hover": {
            backgroundColor: "#9c2f27",
          },
        }}
      >
        <ImageIcon />
        {"Upload photo    "}
      </Button>
    );
  }
  return null;
}
