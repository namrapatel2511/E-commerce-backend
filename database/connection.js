const mysql2 = require("mysql2");
require('dotenv').config(); // Load environment variables

let connectionParams;

const useLocalhost = process.env.USE_LOCALHOST === 'true'; // Fix this logic

if (useLocalhost) {
    console.log("Using Localhost MySQL Connection");
    connectionParams = {
        user: "root",
        host: "host.docker.internal", // Ensures connection to MySQL running on host
        password: "123456789",
        database: "e_commerce",
    };
} else {
    console.log("Using Docker/MySQL Server Connection");
    connectionParams = {
        user: process.env.DB_SERVER_USER,
        host: process.env.DB_SERVER_HOST, // Should be the service name if using Docker Compose
        password: process.env.DB_SERVER_PASSWORD,
        database: process.env.DB_SERVER_DATABASE,
    };
}

const pool = mysql2.createConnection(connectionParams);

pool.connect((err) => {
    if (err) {
        console.log("Database Connection Failed:", err.message);
    } else {
        console.log("DB Connection Successful");
    }
});

module.exports = pool;
