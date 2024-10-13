import * as React from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Grid from '@mui/material/Grid';

export default function TableSkeleton() {
    return (
        <Box sx={{ width: '100%' }}>
            {/* Table header skeleton */}
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <Skeleton variant="rectangular" height={40} />
                </Grid>
                <Grid item xs={3}>
                    <Skeleton variant="rectangular" height={40} />
                </Grid>
                <Grid item xs={3}>
                    <Skeleton variant="rectangular" height={40} />
                </Grid>
                <Grid item xs={3}>
                    <Skeleton variant="rectangular" height={40} />
                </Grid>
            </Grid>

            {/* Table rows skeleton */}
            {Array.from({ length: 6 }).map((_, index) => (
                <Grid container spacing={2} key={index} sx={{ marginTop: 1 }}>
                    <Grid item xs={3}>
                        <Skeleton variant="rectangular" height={40} animation="wave" />
                    </Grid>
                    <Grid item xs={3}>
                        <Skeleton variant="rectangular" height={40} animation="wave" />
                    </Grid>
                    <Grid item xs={3}>
                        <Skeleton variant="rectangular" height={40} animation="wave" />
                    </Grid>
                    <Grid item xs={3}>
                        <Skeleton variant="rectangular" height={40} animation="wave" />
                    </Grid>
                </Grid>
            ))}
        </Box>
    );
}
