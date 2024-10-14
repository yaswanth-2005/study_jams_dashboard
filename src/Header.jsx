import React from 'react';
import { Box, Typography } from '@mui/material';

const Header = () => {
    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '20px',
                    marginBottom: '0px',
                    flexDirection: { xs: 'column', sm: 'row' }
                }}
            >
                <img
                    src='/gdg.png'
                    alt="GDG Logo"
                    style={{ width: '100px', marginRight: '20px' }}
                />

                <Box textAlign={{ xs: 'center', sm: 'left' }}>
                    <Typography
                        variant="h4"
                        component="h1"
                        sx={{
                            fontFamily: 'Poppins, sans-serif',
                            fontWeight: 'bold',
                            color: 'black',
                        }}
                    >
                        Google Developer Groups
                    </Typography>

                    <Typography
                        variant="h6"
                        component="h6"
                        sx={{
                            fontFamily: 'Poppins, sans-serif',
                            color: 'blue',
                            marginTop: '8px',
                        }}
                    >
                        Vishnu Institute of Technology
                    </Typography>
                </Box>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    // padding: '20px',
                    marginBottom: '10px',
                    textAlign: 'center'
                }}
            >

                <Typography
                    variant="h6"
                    component="h6"
                    sx={{
                        fontFamily: 'Poppins, sans-serif',
                        color: 'black',
                        marginTop: '5px'
                    }}
                >
                    GenAi Study Jams report
                </Typography>
            </Box>
        </>
    );
};

export default Header;


