# Frontend Test Submission Documentation

## Project Overview
This project is a React-based URL Shortener web application built for the Affordmed Campus Hiring Evaluation. It allows users to shorten up to 5 URLs at once, set custom shortcodes and validity periods, and view statistics for all shortened URLs.

## Features
- Shorten up to 5 URLs concurrently
- Set custom shortcodes and validity (default 30 minutes)
- Client-side validation for URLs, shortcodes, and validity
- Display shortened URLs and expiry dates
- Statistics page showing all shortened URLs, click counts, and click details
- Robust error handling and user-friendly messages
- Clean, responsive UI with custom CSS
- **Mandatory Logging Integration:** All important events and errors are logged to the test server using the provided Logging Middleware and your access token

## Logging Middleware Integration
- The app uses a custom `logEvent` function in both `UrlShortener.js` and `StatisticsPage.js` to send logs to the test server API:
  - Endpoint: `http://20.244.56.144/evaluation-service/logs`
  - Authorization: Bearer token (your access token)
- All errors, successful shortens, and statistics events are logged as required

## How to Run
1. Install dependencies:
   ```
   npm install
   ```
2. Start the app:
   ```
   npm start
   ```
3. The app runs on `http://localhost:3000`

## Design Decisions
- Used React functional components and hooks for state management
- CSS for styling (can be extended with Material UI if desired)
- Navigation between URL Shortener and Statistics pages for a natural user experience
- All validation and error handling is done client-side for speed and usability
- Logging is integrated as per requirements, with all events sent to the test server

## Screenshots
- Attach screenshots of:
  - The URL Shortener page in use
  - The Statistics page
  - Example log events (errors, successful shortens)

## Folder Structure
- `src/` - React source code
- `public/` - Static files
- `README.txt` - This documentation
- `Screenshots/` - Add your screenshots here

## Submission
- Push all changes to the `main` branch of your GitHub repository
- Submit your repository link as instructed

---
If you need more details or want to add anything, update this README before submission.
