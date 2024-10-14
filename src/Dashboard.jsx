import React, { useEffect, useState } from 'react';
import { DataGrid, GridToolbar, GridToolbarColumnsButton, GridToolbarExport, GridToolbarFilterButton } from '@mui/x-data-grid';
import Papa from 'papaparse';
import { Box, Grid, MenuItem, Select, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import TableSkeleton from './TableSkeleton';

const Dashboard = () => {
    const [jsonData, setJsonData] = useState([]);
    const [columns, setColumns] = useState([]);
    const [redeemedCount, setRedeemedCount] = useState(0);
    const [notRedeemedCount, setNotRedeemedCount] = useState(0);
    const [inactiveCount, setInactiveCount] = useState(0);
    const [active, setActiveCount] = useState(0);
    const [completedCount, setCompletedCount] = useState(0);

    const csvFilePath = '/test.csv';

    useEffect(() => {
        const fetchCsvAndConvert = async () => {
            try {
                const response = await fetch(csvFilePath);
                const csvData = await response.text();

                Papa.parse(csvData, {
                    header: true,
                    skipEmptyLines: true,
                    complete: function (result) {
                        const data = result.data;

                        // Sorting: Put the rows with 'All Skill Badges & Games Completed' as "Yes" at the top
                        const sortedData = [...data].sort((a, b) => {
                            return b['All Skill Badges & Games Completed'] === "Yes" ? 1 : -1;
                        });

                        setJsonData(sortedData);

                        let redeemed = 0, notRedeemed = 0, inactive = 0, active = 0, completed = 0;

                        sortedData.forEach((row) => {
                            if (row["Access Code Redemption Status"] === "Yes") {
                                redeemed++;
                                if (!row["Names of Completed Skill Badges"] || row["Names of Completed Skill Badges"].trim() === "") {
                                    inactive++;
                                } else {
                                    active++;
                                }
                            } else if (row["Access Code Redemption Status"] === "No") {
                                notRedeemed++;
                            }
                            if (row['All Skill Badges & Games Completed'] === "Yes")
                                completed++;
                        });

                        setRedeemedCount(redeemed);
                        setNotRedeemedCount(notRedeemed);
                        setInactiveCount(inactive);
                        setActiveCount(active);
                        setCompletedCount(completed);

                        const columns = Object.keys(result.data[0] || {}).map((key) => ({
                            field: key,
                            headerName: key.charAt(0).toUpperCase() + key.slice(1),
                            width: key === "Names of Completed Skill Badges" ? 250 : 150,
                            renderCell: (params) => {
                                if (key === "Names of Completed Skill Badges") {
                                    const badges = params.value ? params.value.split('|') : [];
                                    return (
                                        <Select
                                            defaultValue=""
                                            displayEmpty
                                            sx={{
                                                fontSize: '14px',
                                                fontFamily: 'Poppins, sans-serif',
                                                color: '#1976d2',
                                                backgroundColor: 'white',
                                                border: 'none',
                                                borderRadius: '5px',
                                                padding: '5px 10px',
                                            }}
                                        >
                                            <MenuItem value="" disabled sx={{ fontFamily: 'Poppins, sans-serif' }}>
                                                <span style={{ color: 'green' }}>
                                                    Completed Badges
                                                </span>
                                            </MenuItem>
                                            {badges.length > 0 ? (
                                                badges.map((badge, index) => (
                                                    <MenuItem
                                                        key={index}
                                                        value={badge}
                                                        sx={{
                                                            fontSize: '14px',
                                                            fontFamily: 'Poppins, sans-serif',
                                                            color: '#333',
                                                            '&:hover': {
                                                                backgroundColor: '#e3f2fd',
                                                                color: '#1976d2',
                                                            },
                                                        }}
                                                    >
                                                        {badge}
                                                    </MenuItem>
                                                ))
                                            ) : (
                                                <MenuItem value="none" disabled sx={{ fontFamily: 'Poppins, sans-serif' }}>
                                                    <span style={{ color: '#999' }}>No badges completed</span>
                                                </MenuItem>
                                            )}
                                        </Select>
                                    );
                                }
                                if (key === "Access Code Redemption Status") {
                                    return params.value === "Yes" ? (
                                        <CheckCircleIcon sx={{ color: 'green' }} />
                                    ) : (
                                        <CancelIcon sx={{ color: 'red' }} />
                                    );
                                }

                                if (key === "User Name") {
                                    const redemptionStatus = params.row['Access Code Redemption Status'];
                                    const completedBadges = params.row['Names of Completed Skill Badges'];
                                    const completedOrNot = params.row['All Skill Badges & Games Completed'] === "Yes";

                                    let textColor = 'black';
                                    if (redemptionStatus === 'Yes' && completedBadges) {
                                        textColor = 'green';
                                    } else if (redemptionStatus === 'Yes' && !completedBadges) {
                                        textColor = 'orange';
                                    } else if (redemptionStatus === 'No') {
                                        textColor = 'red';
                                    }

                                    return (
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            {completedOrNot && (
                                                <CheckCircleIcon sx={{ color: 'green', marginRight: '8px' }} />
                                            )}
                                            <span style={{ color: textColor, fontFamily: 'Poppins, sans-serif' }}>
                                                {params.value}
                                            </span>
                                        </div>
                                    );

                                }

                                return params.value;
                            },
                        }));
                        setColumns(columns);
                    },
                });
            } catch (error) {
                console.error('Error reading file:', error);
            }
        };

        fetchCsvAndConvert();
    }, []);


    return (
        <div style={{ height: 650, width: '100%', fontFamily: 'Poppins, sans-serif' }}>

            <Box sx={{ marginBottom: 2 }}>
                <Grid container spacing={1} justifyContent="flex-end">
                    <Grid item xs={6} sm={2} md={1.3}>
                        <Typography
                            variant="subtitle2"
                            sx={{
                                fontFamily: 'Poppins, sans-serif',
                                color: 'green',
                                textAlign: 'center',
                                fontSize: { xs: '12px', sm: '14px', md: '14px' } // Responsive font size
                            }}
                        >
                            Completed: {completedCount}
                        </Typography>
                    </Grid>
                    <Grid item xs={6} sm={2} md={1.3}>
                        <Typography
                            variant="subtitle2"
                            sx={{
                                fontFamily: 'Poppins, sans-serif',
                                color: 'green',
                                textAlign: 'center',
                                fontSize: { xs: '12px', sm: '14px', md: '14px' }
                            }}
                        >
                            Active: {active}
                        </Typography>
                    </Grid>
                    <Grid item xs={6} sm={2} md={1.3}>
                        <Typography
                            variant="subtitle2"
                            sx={{
                                fontFamily: 'Poppins, sans-serif',
                                textAlign: 'center',
                                fontSize: { xs: '12px', sm: '14px', md: '14px' }
                            }}
                        >
                            Redeemed: {redeemedCount}
                        </Typography>
                    </Grid>
                    <Grid item xs={6} sm={2} md={1.3}>
                        <Typography
                            variant="subtitle2"
                            sx={{
                                fontFamily: 'Poppins, sans-serif',
                                color: 'orange',
                                textAlign: 'center',
                                fontSize: { xs: '12px', sm: '14px', md: '14px' }
                            }}
                        >
                            Redeemed but Inactive: {inactiveCount}
                        </Typography>
                    </Grid>
                    <Grid item xs={6} sm={2} md={1.3}>
                        <Typography
                            variant="subtitle2"
                            sx={{
                                fontFamily: 'Poppins, sans-serif',
                                color: 'red',
                                textAlign: 'center',
                                fontSize: { xs: '12px', sm: '14px', md: '14px' }
                            }}
                        >
                            Not Redeemed: {notRedeemedCount}
                        </Typography>
                    </Grid>
                </Grid>
            </Box>



            {jsonData.length > 0 ? (
                <DataGrid
                    rows={jsonData.map((row, index) => ({ id: index, ...row }))}
                    sx={{ fontFamily: "poppins" }}
                    columns={columns}
                    pageSize={30}
                    slots={{
                        toolbar: GridToolbar,
                    }}

                />
            ) : (
                <TableSkeleton />
            )}
        </div>
    );
};

export default Dashboard;
