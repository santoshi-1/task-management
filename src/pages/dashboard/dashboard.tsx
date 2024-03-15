import { Grid } from '@mui/material';
import React, { FC, ReactElement } from 'react';
import { SideBar } from '../../components/sideBar/sidebar';
import { TaskArea } from '../../components/taskArea/taskArea';

export const Dashboard: FC = (): ReactElement => {
  return (
    <Grid container minHeight="100vh" p={0} m={0}>
      <TaskArea />
      <SideBar />
    </Grid>
  );
};
