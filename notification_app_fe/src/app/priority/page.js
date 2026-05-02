"use client";

import React, { useState, useEffect } from 'react';
import { Typography, CircularProgress, Box, Alert, MenuItem, Select, FormControl, InputLabel, TextField, Button } from '@mui/material';
import NotificationCard from '@/components/NotificationCard';
import { clientLog } from '@/utils/logger';

const TYPE_WEIGHT = {
    "Placement": 3,
    "Result": 2,
    "Event": 1
};

export default function PriorityInbox() {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    
    const [limit, setLimit] = useState(10);
    const [type, setType] = useState('All');

    useEffect(() => {
        clientLog("info", "page", "Visited Priority Inbox page");
        fetchPriorityNotifications();
    }, []);

    const fetchPriorityNotifications = async () => {
        setLoading(true);
        setError('');
        try {
            let url = `/api/notifications?limit=${limit}`;
            if (type !== 'All') {
                url += `&notification_type=${type}`;
            }

            const res = await fetch(url);
            
            if (!res.ok) {
                const text = await res.text();
                throw new Error(`API error ${res.status}: ${text}`);
            }
            const data = await res.json();
            
            let fetched = data.notifications || [];
            
            fetched.sort((a, b) => {
                const weightA = TYPE_WEIGHT[a.Type] || 0;
                const weightB = TYPE_WEIGHT[b.Type] || 0;

                if (weightA !== weightB) {
                    return weightB - weightA;
                }

                const timeA = new Date(a.Timestamp).getTime();
                const timeB = new Date(b.Timestamp).getTime();
                return timeB - timeA;
            });

            setNotifications(fetched.slice(0, limit));
            
            clientLog("info", "api", "Fetched priority notifications");
        } catch (err) {
            setError(err.message);
            clientLog("error", "api", "Failed fetching priority");
        } finally {
            setLoading(false);
        }
    };

    const handleApply = () => {
        clientLog("info", "component", `Applied filter: ${type}, limit: ${limit}`);
        fetchPriorityNotifications();
    };

    return (
        <Box>
            <Typography variant="h5" gutterBottom fontWeight="bold">
                Priority Inbox
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, mb: 3, alignItems: 'center', bgcolor: '#fff', p: 2, borderRadius: 1, boxShadow: 1 }}>
                <TextField 
                    label="Limit (Top N)" 
                    type="number" 
                    value={limit} 
                    onChange={(e) => setLimit(Number(e.target.value))} 
                    slotProps={{ htmlInput: { min: 1, max: 10 } }}
                    size="small"
                />
                
                <FormControl size="small" sx={{ minWidth: 150 }}>
                    <InputLabel>Type</InputLabel>
                    <Select
                        value={type}
                        label="Type"
                        onChange={(e) => setType(e.target.value)}
                    >
                        <MenuItem value="All">All Types</MenuItem>
                        <MenuItem value="Placement">Placement</MenuItem>
                        <MenuItem value="Result">Result</MenuItem>
                        <MenuItem value="Event">Event</MenuItem>
                    </Select>
                </FormControl>

                <Button variant="contained" onClick={handleApply}>
                    Apply
                </Button>
            </Box>

            {loading && <Box sx={{ display: 'flex', justifyContent: 'center', m: 4 }}><CircularProgress /></Box>}
            
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

            {!loading && !error && notifications.length === 0 && (
                <Typography color="text.secondary">No priority notifications found.</Typography>
            )}

            {!loading && !error && notifications.map((notif, i) => (
                <NotificationCard key={notif.ID || i} notification={notif} />
            ))}
        </Box>
    );
}
