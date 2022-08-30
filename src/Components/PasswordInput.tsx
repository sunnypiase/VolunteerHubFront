import { IconButton, InputAdornment, TextField, TextFieldProps } from '@mui/material';
import { FieldProps } from 'formik';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';

function PasswordInput({
    placeholder,
    field
}: FieldProps & TextFieldProps) {
    const [passwordIsShown, setPasswordIsShown] = useState(false);

    const handleIconClick = () => {
        setPasswordIsShown(!passwordIsShown);
    }

    return (
        <TextField
            sx={{
                backgroundColor: 'rgba(243, 189, 149, 0.72)',
                borderRadius: '20px',
                margin: '20px 0px',
                width: '60%',
                boxShadow: '0px 3px 4px grey'
            }}
            label={placeholder}
            placeholder={placeholder}
            type={passwordIsShown ? "text" : "password"}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton onClick={handleIconClick}>
                            {passwordIsShown ?
                                <VisibilityIcon sx={{ color: '#a18570' }} /> :
                                <VisibilityOffIcon sx={{ color: '#a18570' }} />
                            }
                        </IconButton>
                    </InputAdornment>
                )
            }}
            fullWidth
            {...field}
        />
    );
}

export default PasswordInput;