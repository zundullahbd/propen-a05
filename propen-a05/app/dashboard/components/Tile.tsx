// Tile.tsx
import React from 'react';
import { Grid, Typography } from '@material-ui/core';

interface TileProps {
  title: string;
  children: React.ReactNode;
}

const Tile: React.FC<TileProps> = ({ title, children }) => {
  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Typography variant="h6" align="center">
          {title}
        </Typography>
      </Grid>
      <Grid item>
        {children}
      </Grid>
    </Grid>
  );
};

export default Tile;
