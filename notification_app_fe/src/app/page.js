"use client";

import React, { useState, useEffect } from 'react';
import { Typography, CircularProgress, Box, Alert, Pagination } from '@mui/material';
import NotificationCard from '@/components/NotificationCard';
import { clientLog } from '@/utils/logger';

export default function AllNotifications() {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [page, setPage] = useState(1);
    const limit = 10;

    useEffect(() => {
        clientLog("info", "page", "Visited All Notifications page");
        fetchData(page);
    }, [page]);

    const fetchData = async (pageNum) => {
        setLoading(true);
        setError('');
        try {
            const url = `/api/notifications?limit=${limit}&page=${pageNum}`;
            const res = await fetch(url);
            
            if (!res.ok) {
                const text = await res.text();
                throw new Error(`API error ${res.status}: ${text}`);
            }
            const data = await res.json();
            setNotifications(data.notifications || []);
            clientLog("info", "api", "Fetched notifications successfully");
        } catch (err) {
            setError(err.message);
            clientLog("error", "api", "Failed to fetch notifications");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box>
            <Typography variant="h5" gutterBottom fontWeight="bold">
                All Notifications
            </Typography>

            {loading && <Box sx={{ display: 'flex', justifyContent: 'center', m: 4 }}><CircularProgress /></Box>}
            
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

            {!loading && !error && notifications.length === 0 && (
                <Typography color="text.secondary">No notifications found.</Typography>
            )}

            {!loading && !error && notifications.map((notif, i) => (
                <NotificationCard key={notif.ID || i} notification={notif} />
            ))}

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                <Pagination 
                    count={10} 
                    page={page} 
                    onChange={(e, value) => setPage(value)} 
                    color="primary" 
                />
            </Box>
        </Box>
    );
}
