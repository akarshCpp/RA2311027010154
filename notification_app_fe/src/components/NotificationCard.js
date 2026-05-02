"use client";

import React from 'react';
import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import { useNotificationContext } from '@/context/NotificationContext';
import { clientLog } from '@/utils/logger';

export default function NotificationCard({ notification }) {
    const { isViewed, markAsViewed } = useNotificationContext();
    const viewed = isViewed(notification.ID);

    const handleClick = () => {
        if (!viewed) {
            markAsViewed(notification.ID);
            clientLog("info", "component", "Marked notification as viewed");
        }
    };

    let chipColor = "default";
    if (notification.Type === "Placement") chipColor = "success";
    else if (notification.Type === "Result") chipColor = "warning";
    else if (notification.Type === "Event") chipColor = "info";

    return (
        <Card 
            onClick={handleClick}
            sx={{ 
                mb: 2, 
                cursor: 'pointer',
                transition: '0.3s',
                borderLeft: viewed ? '6px solid transparent' : '6px solid #1976d2',
                bgcolor: viewed ? 'background.paper' : '#f0f7ff',
                '&:hover': { boxShadow: 6 }
            }}
        >
            <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Chip label={notification.Type} color={chipColor} size="small" />
                    <Typography variant="caption" color="text.secondary">
                        {notification.Timestamp}
                    </Typography>
                </Box>
                <Typography variant="body1" fontWeight={viewed ? 'normal' : 'bold'}>
                    {notification.Message}
                </Typography>
            </CardContent>
        </Card>
    );
}
