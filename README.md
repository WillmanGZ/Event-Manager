# Event System

This web application allows you to manage events in two vies, like admin and like user. User can choose wich event will join, admin can edit, create and delete events.

## Features

- Create new events.
- Join events as a user.
- View all events in a dynamic interface.
- Edit existing event details
- Delete events.
- Log in and register new users.
- Responsive and user-friendly interface.

## Getting Started

1. Clone or download this repository.
2. Install dependencies and JSON Server globally if you haven't:
   ```bash
   npm install
   npm install -g json-server
   ```
3. Start the JSON Server with the provided database (e.g., `database.json`):
   ```bash
   json-server --watch public/db.json --port 3000
   ```
4. Start the Vite development server:
   ```bash
   npm run dev
   ```
5. Open the local address provided by Vite (usually `http://localhost:5173`) in your web browser.
6. Start managing your events or joining as a user! All data will be persisted using JSON Server as a mock backend.

## Test Credentials

1. Admin: admin@gmail.com admin1234
2. Visitor: visitor@gmail.com visitor1234

You can make new credentials. Users created by register page will be visitors!

## License

This project is licensed under the MIT License.
