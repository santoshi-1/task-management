import { Avatar, Box, Typography } from '@mui/material';
import React, { FC, ReactElement } from 'react';
import Proptypes from 'prop-types';

interface IProfile {
  name: string;
}

export const Profile: FC<IProfile> = (
  props,
): ReactElement => {
  const { name = 'Santoshi' } = props;

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      mt={2}
    >
      <Avatar
        sx={{
          width: '76px',
          height: '76px',
          backgroundColor: 'primary.main',
          marginBottom: '6px',
        }}
      >
        <Typography variant="h5" color="text.primary">
          {`${name.substring(0, 1)}`}
        </Typography>
      </Avatar>
      <Typography variant="h6" color="text.primary">
        {`Welcome, ${name}`}
      </Typography>
      <Typography variant="body2" color="text.primary">
        This is your personal tasks manager
      </Typography>
    </Box>
  );
};

Profile.propTypes = {
  name: Proptypes.string.isRequired,
};
