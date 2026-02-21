
# INFO6150 Assignment 3

## Assignment Summary
 This Assignment mainly focues on local crud oprations in session and local storages to allow users to add, edit, delete, and manage user data storage  in the browser.

# Part A: Calculator with Secure User Login

## Description
A two-page web application featuring a secure login gate and a high-precision arithmetic calculator. The application emphasizes strict data validation and a modern user experience.

## Features Implemented
* **Material Design UI:** Built using **MDBootstrap 5** (Material Design for Bootstrap) for a sleek, dark-themed glassmorphism aesthetic.
* **Secure Session Management:** Implements `sessionStorage` and `localStorage` (for "Remember Me" functionality) to maintain user states.
* **Strict Numeric Validation:** Uses advanced Regular Expressions (Regex) to block special characters and sanitize inputs in real-time.
* **Logic Optimization:** * Utilizes a **single ES6 Arrow Function** to handle all arithmetic operations.
    * Extensive use of **jQuery Chaining** for UI transitions (fade-ins/fade-outs).
* **Context-Aware Errors:** Error messages are scoped specifically to the input field being used and clear automatically on focus.

## Technologies Used
* HTML5 & CSS3 (Custom Dark Theme)
* MDBootstrap 5 (UI Framework)
* jQuery 3.7.1
* JavaScript ES6+

## How to Run
1.  Open `login.html` in any modern web browser.
2.  Use the test credentials provided in the "Test User" section of the card.
3.  Upon successful login, perform calculations on the dashboard.

# Part B: Event Stopwatch with Session Logging

## Description
A single-page stopwatch application designed for activity tracking. It allows users to time specific events, validate event metadata, and persist a historical log of their activities.

## Features Implemented
* **Modern Asynchronous Logic:** Eschews standard `setInterval` for a more modern approach using **Async/Await** and **Promise-based delay loops** to manage time increments.
* **Unified UI Design:** Leverages the same Material Design language from Part A for a consistent Husky-branded experience.
* **Performance Optimization:** Uses minimal **inline CSS** to fine-tune the Bootstrap grid system, ensuring a lightweight and efficient final commit.
* **Persistent History:** All timed sessions are stored in `localStorage`, allowing for data persistence across browser restarts.
* **Live Statistics:** Automatically calculates the total number of sessions and the cumulative time spent across all recorded activities.
* **Input Sanitization:** Strictly validates event names (min 3 chars) and blocks illegal characters using jQuery-driven validation.

## Technologies Used
* HTML5 & CSS3
* MDBootstrap 5
* JavaScript ES6+ (Promises, Async, Await)
* jQuery 3.7.1

## How to Run
1.  Open `index.html` in your browser.
2.  Enter the event name and select a date (defaults to today).
3.  Use the Start/Pause/Stop controls to log your time.
4.  View your session history and total stats at the bottom of the page.
