# Logging Middleware Documentation

## What is Logging Middleware?
Logging Middleware is a tool that helps you record important events, errors, and information from your application. For this project, it sends these logs to a test server using an API.

## What does it do?
- Captures events like errors, warnings, and info from your frontend application.
- Sends these events to a test server for tracking and debugging.

## How did I test it?
I used Postman (a free app) to send log messages to the test server API. Here’s how:

### 1. Got my Authorization Token
- Registered and received my `clientID` and `clientSecret`.
- Used these to get my `access_token` from the test server.

### 2. Sent a Log Message
- Created a POST request in Postman to: `http://20.244.56.144/evaluation-service/logs`
- Added an `Authorization` header: `Bearer <my_access_token>`
- In the body (raw, JSON), I sent:
  {
    "stack": "frontend",
    "level": "error",
    "package": "component",
    "message": "Button click failed due to missing props"
  }
- Clicked "Send" and received a response:
  {
    "logID": "...",
    "message": "log created successfully"
  }

### 3. Screenshots
- I took screenshots of my Postman request and response and saved them in this folder for submission.

## How to use this Middleware
- You can use Postman to send any log message to the test server using the same method.
- Change the `level`, `package`, and `message` as needed for different events.

---

**Screenshots are attached in this folder.**

If you need help, ask for step-by-step instructions for Postman or any other tool.
