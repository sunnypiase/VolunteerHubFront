import { TextField, TextFieldProps } from '@mui/material';
import { FieldProps } from 'formik';

// interface Props extends FieldProps{
//   label: string;
//   placeholder: string;
// }

function ExampleMyField({
  placeholder,
  field,
  type,
}: FieldProps & TextFieldProps) {
  return (
    <TextField
      sx={{ mt: 3 }}
      label={placeholder}
      placeholder={placeholder}
      type={type}
      fullWidth
      {...field}
    />
  );
}

export default ExampleMyField;
