import { Grid } from '@mui/material';
import React, { FC, ReactElement } from 'react';

export const Dashboard: FC = (): ReactElement => {
  return (
    <Grid container minHeight="100vh" p={0} m={0}>
      <Grid item md={8} px={4}>
        <h2>Content Area</h2>
      </Grid>
      <Grid
        item
        md={4}
        sx={{
          height: '100vh',
          position: 'fixed',
          right: 0,
          top: 0,
          width: '100%',
          backgroundColor: 'background.paper',
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <h2>Side Area</h2>
      </Grid>
    </Grid>
  );
};
