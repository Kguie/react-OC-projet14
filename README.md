# WealthHealth Employee Management System

A modern React application for managing employee records with a clean, responsive interface. This project demonstrates advanced React patterns and state management using modern development tools.

## Features

- **Employee Registration**: Complete form to add new employees with personal and address information
- **Employee Directory**: View and manage all registered employees in a data table
- **Responsive Design**: Mobile-friendly interface built with Tailwind CSS
- **Form Validation**: Comprehensive form validation using React Hook Form
- **State Management**: Global state management with Jotai
- **Type Safety**: Full TypeScript implementation for enhanced development experience
- **Custom Components**: Reusable UI components including date pickers, dropdowns, and modals
- **Testing**: Comprehensive test suite with Vitest and React Testing Library

## Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS for utility-first styling
- **Form Management**: React Hook Form for efficient form handling
- **State Management**: Jotai for atomic state management
- **Routing**: React Router DOM for client-side navigation
- **HTTP Client**: Axios for API communications
- **Testing**: Vitest + React Testing Library + Jest DOM
- **Icons**: Lucide React for modern icons
- **Date Handling**: date-fns for date manipulation

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm package manager

### Setup

1. Clone the repository:
   ```bash
   git clone <https://github.com/Kguie/react-OC-projet14.git>
   cd wealth-health
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint for code quality checks
- `npm test` - Run the test suite with Vitest

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── createEmployeeForm/  # Employee creation form components
│   ├── datePicker/          # Custom date picker components
│   ├── dropdownMenu/        # Dropdown menu components
│   ├── modal/               # Modal dialog components
│   └── ...
├── pages/                # Application pages/routes
│   ├── home/               # Employee creation page
│   ├── employeeList/       # Employee listing page
│   └── Error/              # Error page
├── store/                # Global state management
├── utils/                # Utility functions and hooks
│   ├── hooks/api/          # API-related hooks
│   ├── router/             # Routing configuration
│   └── test/               # Test utilities
└── main.tsx              # Application entry point
```

## Testing

This library is thoroughly tested with **Vitest** and **React Testing Library**:

```bash
npm run test           # watch mode  
npm run test:run       # single run  
npm run test:coverage  # with coverage reports  
```

## Key Features Implementation

### Custom Components
- **DatePicker**: Custom date picker with calendar navigation
- **DropdownMenu**: Accessible dropdown with search functionality
- **Modal**: Reusable modal component with proper focus management
- **Form Components**: Typed form inputs with validation

### State Management
- Uses Jotai for efficient, atomic state management
- Employee data is managed globally and persisted across routes

### Form Handling
- React Hook Form integration for performance and validation
- Custom form components with proper error handling
- Date validation and formatting with date-fns

## Development

### Code Quality
- ESLint configuration for consistent code style
- TypeScript for type safety and better development experience
- Comprehensive testing with Vite Testing Library

### Performance
- Vite for fast development server and optimized builds
- React 18 with concurrent features
- Efficient re-rendering with proper component structure

## Build and Deployment

To build the application for production:

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment to any static hosting service.


## Authors

[GUIEBA Kévin](https://github.com/Kguie/)


## License

MIT © [Kevin Guieba](mailto:kevin.guieba@gmail.com)

