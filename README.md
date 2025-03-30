# Project Management Software

## Overview
This is a full-stack Project Management Software built using NestJS (Backend) and Angular (Frontend). The application allows users to create, edit, delete, and manage projects with authentication and role-based access control (Admin & Viewer).

## Tech Stack
### Backend:
- NestJS (Node.js Framework)
- TypeScript
- PostgreSQL (Database)
- TypeORM (ORM for database management)
- Passport.js (Authentication with JWT)
- Socket.IO (Real-time updates)

### Frontend:
- Angular (TypeScript-based frontend framework)
- Angular Components
- Reactive Forms (Form handling)
- RxJS (State management & Observables)
- RouterModule (Routing)

## Features
### Authentication
- Login functionality with JWT-based authentication
- Role-based access control (Admin & Viewer)
- Secure API endpoints with Passport.js and JWT

### Project Management
- Admin can:
  - Create new projects
  - Edit existing projects
  - Delete projects
- Viewer can:
  - View projects (Read-only access)

### Real-time Updates
- Socket.IO integration for live updates
- Users get instant feedback when projects are created/updated

## Installation & Setup
### 1. Clone the Repository
git clone https://github.com/your-username/project-management.git
cd project-management

### 2. Setup Backend (NestJS)
#### Install dependencies:
cd backend
npm install

#### Configure Environment Variables:
update the .env file in the backend directory

#### Run the server:
npm run start:dev

### 3. Setup Frontend (Angular)
#### Install dependencies:
npm install

#### Run the Angular app:
ng serve --open

The application will be available at: http://localhost:4200
