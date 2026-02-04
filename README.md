
https://github.com/user-attachments/assets/7bab8138-5f53-4545-ad94-4df73b50173b

TikTok Ads Creative Flow (Frontend Assignment)

This project is a frontend application that simulates a TikTok Ads creative setup flow.

The purpose of this assignment is not to build a complete Ads Manager, but to demonstrate how frontend logic is handled in real-world scenarios such as authentication, validation, conditional rules, and error handling.

The focus is on clarity, correctness, and reasoning, rather than visual polish.

What This Project Does

The application allows a user to:

Connect a TikTok Ads account using a simulated OAuth flow

Create a minimal ad with required creative details

Enforce business rules directly in the UI

Handle common API and authentication errors gracefully

All OAuth flows and API calls are mocked to keep the focus purely on frontend behavior.

OAuth Flow (Simulated)

The app provides a Connect TikTok Ads Account button

Clicking the button simulates an OAuth Authorization Code flow

A mock access token is generated and stored locally

Ad submission is blocked until authentication is completed

Missing or expired tokens show clear, user-friendly errors

No real TikTok account, client ID, or backend service is required.

Ad Creation & Validation Logic

The ad creation form includes the following required fields:

Campaign Name

Required

Minimum 3 characters

Objective

Traffic

Conversions

Ad Text

Required

Maximum 100 characters

CTA (Call to Action)

Required

Music Selection

Validated using a mocked API

Music Selection Rules

Music handling is the key conditional part of this assignment:

Existing music IDs are validated before submission

Custom or uploaded music is simulated using a generated ID

Ads without music are allowed only when the objective is Traffic

Music is mandatory when the objective is Conversions

Invalid or geo-restricted music IDs return clear, human-readable error messages.
Raw API error responses are never shown to the user.

Error Handling

The application handles several real-world failure scenarios, including:

Missing or expired OAuth tokens

Missing permissions

Invalid or geo-restricted music IDs

Error presentation follows these rules:

Field-level validation errors are shown inline

System-level errors are displayed using a global error banner

Success Flow

On successful ad creation, a confirmation message with a generated Ad ID is displayed

The form is reset after success

The submit button is disabled to prevent duplicate submissions

Technical Details

Built using React

No backend services are used

OAuth and API interactions are fully mocked

State is managed using React hooks

Styling is intentionally minimal to prioritize behavior and clarity

What I Would Improve With More Time

Better loading indicators and skeleton states

More detailed retry and recovery flows

Basic analytics to understand where users face issues

Demo Video

A short demo video explaining the OAuth flow, validation logic, and error handling is available here:

How to Run the Project:
cd client
npm install
npm run dev

The application will be available at:
http://localhost:5173

Final Note

This project was built under time constraints with a focus on real-world frontend decision-making.
The goal was to demonstrate how authentication, validation, and error handling are handled in production-like scenarios.

Demo Video Link:
👉Uploading 04.02.2026_16.15.52_REC.mp4…


