"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
    const [viewedIds, setViewedIds] = useState(new Set());
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem("viewed_notifications");
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                setViewedIds(new Set(parsed));
            } catch (e) {
                console.error("Failed to parse viewed notifications", e);
            }
        }
        setIsLoaded(true);
    }, []);

    const markAsViewed = (id) => {
        setViewedIds(prev => {
            if (prev.has(id)) return prev;
            const next = new Set(prev);
            next.add(id);
            localStorage.setItem("viewed_notifications", JSON.stringify(Array.from(next)));
            return next;
        });
    };

    const isViewed = (id) => viewedIds.has(id);

    return (
        <NotificationContext.Provider value={{ markAsViewed, isViewed, isLoaded }}>
            {children}
        </NotificationContext.Provider>
    );
}

export function useNotificationContext() {
    return useContext(NotificationContext);
}
