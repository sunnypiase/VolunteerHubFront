import { TextField, TextFieldProps } from '@mui/material';
import { FieldProps } from 'formik';

function FormikField({
  placeholder,
  field,
  type,
}: FieldProps & TextFieldProps) {
  return (
    <TextField
      sx={{
        backgroundColor: 'rgba(243, 189, 149, 0.72)',
        borderRadius: '20px',
        margin: '20px 0px',
        width: '60%',
        boxShadow: '0px 3px 4px grey',
      }}
      label={placeholder}
      placeholder={placeholder}
      type={type}
      fullWidth
      {...field}
    />
  );
}

export default FormikField;
