import { Box, Typography } from '@mui/material';

interface AccountProfileItemProps {
  labelName: string;
  labelValue: string;
}

export default function AccountProfileItem(props: AccountProfileItemProps) {
  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography sx={{ mb: 1 }} variant="subtitle1" paragraph>
          {props.labelName}
        </Typography>
        <Box
          sx={{
            alignContent: 'center',
            borderRadius: '16px',
          }}
        >
          <Typography variant="subtitle2" color="text.secondary" paragraph>
            {props.labelValue}
          </Typography>
        </Box>
      </Box>
    </>
  );
}
