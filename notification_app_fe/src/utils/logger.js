export async function clientLog(level, pkg, message) {
    try {
        const payload = { level, package: pkg, message };
        await fetch('/api/logger', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
    } catch (e) {
    }
}
