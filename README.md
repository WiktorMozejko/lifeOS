# lifeOS - Authentication System

Modern web application with user authentication system featuring login and registration.

## Features

- User registration with email validation
- Secure login with password hashing
- Session management
- Responsive design
- SQLite database
- Express.js backend

## Project Structure

```
lifeOS/
├── public/              # Frontend files
│   ├── index.html      # Main HTML page
│   ├── styles.css      # Styling
│   └── script.js       # Frontend JavaScript
├── src/
│   ├── db/
│   │   └── database.js # SQLite database setup
│   ├── routes/
│   │   └── auth.js     # Authentication routes
│   └── server.js       # Express server
├── package.json        # Dependencies
├── .env               # Environment variables
└── README.md          # This file
```

## Installation

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables in `.env`:
```
PORT=3000
SESSION_SECRET=your-secret-key-change-this
NODE_ENV=development
```

## Development

Run the development server with auto-reload:
```bash
npm run dev
```

Or start the production server:
```bash
npm start
```

The application will be available at `http://localhost:3000`

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user info

## Technologies

- **Backend**: Node.js, Express.js
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Database**: SQLite3
- **Security**: bcryptjs, express-session

## License

MIT
