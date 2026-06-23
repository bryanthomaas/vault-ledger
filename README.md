# Vault Ledger

Vault Ledger is a production-grade personal finance application built with a React Native frontend and a Node.js backend. It focuses on highly secure, automated financial tracking with a premium user interface.

## Architecture and Stack

The application is structured as a monorepo to enforce type safety across the network boundary and isolate frontend and backend concerns.

Frontend:
* React Native (Expo)
* React Native Reanimated
* React Native Skia
* Zustand for state management

Backend:
* Node.js with Express.js
* Firebase Admin SDK (Firestore Database)
* TypeScript
* Event-driven worker architecture

## Core Features

### Biometric Security and Interface Design
The application enforces hardware-level security through FaceID and TouchID integration. The user interface implements a dark mode glassmorphism design system using translucent panels, blur effects, and skeleton loaders for all data fetching states to ensure a fluid user experience without standard loading spinners.

### Fluid Asset Tracking
The dashboard features an interactive asset tracker graph built with React Native Skia. The chart renders smooth bezier curves and includes a scrubbable tooltip with haptic feedback to display exact net worth at specific historical dates.

### Rule-Based Automation Engine
An event-driven worker runs on the backend to process new transactions. If the user enables the round-up feature, the engine calculates the spare change to the nearest dollar. It then automatically executes an atomic ledger transfer into a secondary savings vault. The logic includes strict safeguards to prevent recursive round-ups on system-generated transfers.

### Predictive Forecasting
A backend forecasting service calculates the moving average of spending and saving velocity by analyzing the delta of the most recent historical transactions. It applies this velocity to project a six month predictive trajectory, which is rendered on the frontend chart.

### Financial Data Engine
The backend includes a service simulating a third-party financial OAuth linkage. Upon connection, a data seeding algorithm populates the NoSQL database with eighteen months of realistic, categorized historical transactions utilizing efficient batch writes.

## Project Structure

* apps/mobile: The React Native Expo application containing the UI components, state management, and navigation.
* apps/api: The Node.js Express backend containing controllers, automation workers, and the forecasting engine.
* packages/shared-types: Shared TypeScript interfaces ensuring data consistency across the database and the client.

## Getting Started

1. Clone the repository and install dependencies in the root directory.
2. Navigate to the apps/api directory, ensure you have the correct Node version, and start the development server.
3. Navigate to the apps/mobile directory and start the Expo server.
4. Run the application on an iOS or Android simulator to test the biometric authentication and UI features.
