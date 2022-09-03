import { IconButton, InputAdornment, TextField } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';

interface PasswordInputFlexibleProps {
    required: boolean;
    fullWidth: boolean;
    name: string;
    label: string;
    id: string;
    value: string;
    className: string;
    onChange: {
        (e: React.ChangeEvent<any>): void;
        <T = string | React.ChangeEvent<any>>(field: T): T extends React.ChangeEvent<any> ? void : (e: string | React.ChangeEvent<any>) => void;
    };
    onBlur: {
        (e: React.FocusEvent<any, Element>): void;
        <T = any>(fieldOrEvent: T): T extends string ? (e: any) => void : void;
    };
}

function PasswordInputFlexible(props: PasswordInputFlexibleProps) {
    const [passwordIsShown, setPasswordIsShown] = useState(false);

    const handleIconClick = () => {
        setPasswordIsShown(!passwordIsShown);
    }

    return (
        <TextField
            className={props.className}
            required={props.required}
            fullWidth={props.fullWidth}
            name={props.name}
            label={props.label}
            type={passwordIsShown ? "text" : "password"}
            id={props.id}
            value={props.value}
            onChange={props.onChange}
            onBlur={props.onBlur}
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
        />
    );
}

export default PasswordInputFlexible;