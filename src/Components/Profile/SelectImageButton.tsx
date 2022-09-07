import { Button } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";

interface SelectImageButtonProps {
  isSelected: boolean;
}

export function SelectImageButton(props: SelectImageButtonProps) {
  if (!props.isSelected) {
    return (
      <Button
        component="span"
        variant="contained"
        sx={{
          backgroundColor: "#57897d",
          "&:hover": {
            backgroundColor: "#044945",
          },
        }}
      >
        <ImageIcon />
        Select new photo
      </Button>
    );
  }
  return null;
}
