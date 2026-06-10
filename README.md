# Google Forms Lite Clone

A simplified Google Forms clone built with React, TypeScript, Redux (RTK), and GraphQL.

## Project Structure

This is a monorepo containing:
- `client`: React frontend application.
- `server`: Node.js GraphQL server.

## Technologies

- **Frontend:** React, TypeScript, Redux Toolkit (RTK Query), React Router, Tailwind CSS.
- **Backend:** Node.js, Apollo Server, GraphQL, In-memory data store.

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm

### Installation

1. Clone the repository.
2. Install dependencies for all workspaces from the root:
   ```bash
   npm install
   ```

### Running the Application

You can run both the client and server concurrently using the following command from the root directory:

```bash
npm start
```

- **Client:** [http://localhost:3000](http://localhost:3000)
- **Server (GraphQL Playground):** [http://localhost:4000/](http://localhost:4000/)

## Core Features

- **Homepage:** List all created forms with links to view/fill and view responses.
- **Form Builder:** 
  - Create new forms with titles and descriptions.
  - Add/remove questions of various types: TEXT, MULTIPLE_CHOICE, CHECKBOX, DATE.
  - **Drag & Drop:** Visually reorder questions using dnd-kit.
  - Manage options for choice-based questions.
- **Form Filler:** 
  - Dynamic rendering based on question types.
  - **Validation:** Ensures required questions are answered before submission.
  - User feedback on success/error.
- **Form Responses:** View all submitted responses organized by question.

## Technical Highlights

- **Monorepo:** Organized using npm workspaces.
- **GraphQL:** Clean schema definition with Apollo Server.
- **State Management:** Redux Toolkit with RTK Query for efficient data fetching and caching.
- **Code Generation:** Automatic TypeScript types and hooks generation from GraphQL operations.
- **Hooks & Services:** Business logic is decoupled from UI components into custom hooks (`useFormBuilder`, `useFormFiller`).
- **Styling:** Modern and responsive UI built with Tailwind CSS and Lucide icons.

## Notes

- Data is stored in-memory on the server and will be lost when the server restarts.
- RTK Query is used for data fetching, with code generation from the GraphQL schema.
