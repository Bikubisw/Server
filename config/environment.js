const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');
const logDirectory = path.join(__dirname, '../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
const accessLogstream = rfs.createStream('access.log', {
    interval: '1d',
    path: logDirectory
});
const development = {
    name: 'development',
    asset_path: './assets',
    session_cookie_key: 'blahsomething',
    db: 'Codial_development',
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: "bikrambiswas043@gmail.com",
            pass: "22101997@biku"
        }
    },
    google_client_ID: "139051006773-ke41j5cgdure465m4h4tiav9ketq6uip.apps.googleusercontent.com",
    google_client_Secret: "E8VLm_PZf_flKzUwm7Us6Xia",
    google_callbackURL: "http://localhost:8000/users/auth/google/callback",
    jwt_secret: 'codial',
    morgan: {
        mode: 'dev',
        options: {
            stream: accessLogstream
        }
    }
}
const production = {
    name: 'production',
    asset_path: process.env.CODIAL_ASSET_PATH,
    session_cookie_key: process.env.CODIAL_SESSION_COOKIE_KEY,
    db: process.env.CODIAL_DB,
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.CODIAL_GMAIL_USERNAME,
            pass: process.env.CODIAL_GMAIL_PASSWORD
        }
    },
    google_client_ID: process.env.GOOGLE_CLIENT_ID,
    google_client_Secret: process.env.GOOGLE_CLIENT_SECRET,
    google_callbackURL: process.env.GOOGLE_CALL_BACK_URL,
    jwt_secret: process.env.CODIAL_JWT_SECRET,
    morgan: {
        mode: 'combined',
        options: {
            stream: accessLogstream
        }
    }

}
module.exports = eval(process.env.CODIAL_ENVIRONMENT) == undefined ? development : eval(process.env.CODIAL_ENVIRONMENT);