const { Log } = require('./index.js');

async function testLogger() {
    try {
        const result = await Log("backend", "error", "handler", "received string, expected bool");
        console.log(result);
    } catch (e) {
        console.error(e);
    }
}

testLogger();
