backend/
│── src/
│   ├── app.js                # Express configuration
│   ├── server.js             # App entry point (HTTP server)
│   │
│   ├── config/
│   │   ├── db.js              # MongoDB connection
│   │   ├── env.js             # Env loader (optional)
│   │
│   ├── routes/
│   │   ├── index.js
│   │   └── user/routes.js
│   │
│   ├── controllers/
│   │   └── user/controller.js
│   │
│   ├── services/
│   │   └── user/service.js
│   │
│   ├── models/
│   │   └── use/model.js
│   │
│   ├── middlewares/
│   │   ├── auth/middleware.js
│   │   ├── globalError/middleware.js
│   │   └── rateLimit/middleware.js
│   │   └── token/middleware.js
│   │
│   ├── validators/
│   │   └── user.validator.js
│   │
│   ├── utils/
│   │   ├── logger.js
│   │   └── response.js
│   │   └── error.js
│   │
│   └── constants/
│       └── roles.js
│
├── tests/
│   └── user/test.js
│
├── .env
├── .env.example
├── .gitignore
├── README.md
└── package.json


| Header                            | Purpose                                                                     |
| --------------------------------- | --------------------------------------------------------------------------- |
| `Content-Security-Policy`         | Controls which scripts, styles, and resources can load, preventing XSS.     |
| `X-Content-Type-Options: nosniff` | Stops browsers from guessing file types.                                    |
| `X-Frame-Options: DENY`           | Prevents clickjacking by blocking your site from being embedded in iframes. |
| `Strict-Transport-Security`       | Forces HTTPS if your site is served over SSL.                               |
| `Referrer-Policy`                 | Controls how much referrer info is sent to other sites.                     |



| Variable         | Purpose                                                                                                  |
| ---------------- | -------------------------------------------------------------------------------------------------------- |
| `EMAIL_SENDER`   | The email address you will send emails from (e.g., your Gmail).                                          |
| `EMAIL_PASSWORD` | The password for the email account. **If using Gmail with 2FA, create an App Password.**                 |
| `EMAIL_HOST`     | SMTP server hostname. For Gmail: `smtp.gmail.com`. Required if you’re not using `service`.               |
| `EMAIL_PORT`     | SMTP server port. Usually 587 for TLS, 465 for SSL.                                                      |
| `EMAIL_SERVICE`  | Optional. Service provider name (like `Gmail`) if you want Nodemailer to handle host/port automatically. |



