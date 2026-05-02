require('dotenv').config({ path: '../.env' });

const VALID_STACKS = ["backend", "frontend"];
const VALID_LEVELS = ["debug", "info", "warn", "error", "fatal"];
const BOTH_PACKAGES = ["auth", "config", "middleware", "utils"];
const BACKEND_PACKAGES = ["cache", "controller", "cron_job", "db", "domain", "handler", "repository", "route", "service"];
const FRONTEND_PACKAGES = ["api", "component", "hook", "page", "state", "style"];

async function Log(stack, level, packageName, message) {
    if (!VALID_STACKS.includes(stack)) {
        throw new Error("Invalid stack");
    }
    if (!VALID_LEVELS.includes(level)) {
        throw new Error("Invalid level");
    }

    let isValidPackage = false;
    if (BOTH_PACKAGES.includes(packageName)) {
        isValidPackage = true;
    } else if (stack === "backend" && BACKEND_PACKAGES.includes(packageName)) {
        isValidPackage = true;
    } else if (stack === "frontend" && FRONTEND_PACKAGES.includes(packageName)) {
        isValidPackage = true;
    }

    if (!isValidPackage) {
        throw new Error("Invalid package");
    }

    const token = process.env.ACCESS_TOKEN;
    if (!token) {
        throw new Error("Access token missing");
    }

    const payload = {
        stack: stack,
        level: level,
        package: packageName,
        message: message
    };

    try {
        const response = await fetch("http://20.207.122.201/evaluation-service/logs", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        });
        
        if (!response.ok) {
            const errBody = await response.text();
            throw new Error("Log API failed with status: " + response.status + " body: " + errBody);
        }
        
        return await response.json();
    } catch (error) {
        console.error("Logging failed:", error.message);
        throw error;
    }
}

module.exports = { Log };
