import React, { useEffect, useState } from 'react';
import { DataGrid, GridToolbar, GridToolbarColumnsButton, GridToolbarExport, GridToolbarFilterButton } from '@mui/x-data-grid';
import Papa from 'papaparse';
import { Box, MenuItem, Select } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import TableSkeleton from './TableSkeleton';

const Dashboard = () => {
    const [jsonData, setJsonData] = useState([]);
    const [columns, setColumns] = useState([]);

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
                        setJsonData(result.data);

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
