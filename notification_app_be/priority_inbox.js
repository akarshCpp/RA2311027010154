require('dotenv').config({ path: '../.env' });
const { Log } = require('logging-middleware');
const fs = require('fs');

const API_URL = "http://20.207.122.201/evaluation-service/notifications";

const TYPE_WEIGHT = {
    "Placement": 3,
    "Result": 2,
    "Event": 1
};

async function fetchNotifications() {
    await Log("backend", "info", "service", "Initiating fetch notifications request");
    
    const token = process.env.ACCESS_TOKEN;
    if (!token) {
        await Log("backend", "fatal", "auth", "Missing ACCESS_TOKEN in environment");
        throw new Error("Missing ACCESS_TOKEN");
    }

    const response = await fetch(API_URL, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    });

    if (!response.ok) {
        await Log("backend", "error", "service", "Failed to fetch notifications: " + response.status);
        throw new Error("Fetch failed");
    }

    const data = await response.json();
    await Log("backend", "info", "service", "Successfully fetched " + data.notifications.length + " notifications");
    return data.notifications;
}

function sortNotifications(notifications) {
    return notifications.sort((a, b) => {
        const weightA = TYPE_WEIGHT[a.Type] || 0;
        const weightB = TYPE_WEIGHT[b.Type] || 0;

        if (weightA !== weightB) {
            return weightB - weightA;
        }

        const timeA = new Date(a.Timestamp).getTime();
        const timeB = new Date(b.Timestamp).getTime();
        return timeB - timeA;
    });
}

async function main() {
    try {
        await Log("backend", "info", "handler", "Starting Priority Inbox processing");
        
        const notifications = await fetchNotifications();
        const sorted = sortNotifications(notifications);
        const top10 = sorted.slice(0, 10);
        
        await Log("backend", "info", "handler", "Extracted top " + top10.length + " priority notifications");
        
        fs.writeFileSync('output.json', JSON.stringify(top10, null, 2));
        await Log("backend", "info", "handler", "Saved top 10 notifications");
        
        process.stdout.write("Top 10 notifications have been saved to output.json\n");
    } catch (err) {
        let msg = err.message || "error";
        if (msg.length > 25) msg = msg.substring(0, 25);
        await Log("backend", "fatal", "handler", "Critical error: " + msg);
        process.exit(1);
    }
}

main();
