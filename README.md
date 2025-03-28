# Investor Dashboard Frontend

## Overview

This Next.js application provides a comprehensive dashboard for investors to manage their deal flow, track investments, and interact with startups. Built with modern React patterns and Next.js 15, it offers a responsive, performant, and user-friendly interface.

## Tech Stack

- **Framework**: Next.js 15
- **UI Components**: Custom components with Shadcn UI
- **Styling**: Tailwind CSS
- **State Management**: React Hooks
- **Authentication**: JWT-based auth with secure token storage
- **API Communication**: Fetch API with centralized configuration

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn
- Backend API running (see API setup documentation)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-organization/investor-dashboard.git
   cd investor-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the root directory with the following variables:
   ```
   NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api/v1
   NEXT_PUBLIC_AUTH_DOMAIN=your-auth-domain
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Build for Production

```bash
npm run build
# or
yarn build
```

## Project Structure

```
project/
├── app/                    # Next.js app directory
│   ├── api/                # API routes
│   ├── auth/               # Authentication pages
│   ├── dashboard/          # Dashboard pages
│   │   ├── investor/       # Investor-specific pages
│   │   │   ├── deals/      # Deal management
│   │   │   ├── portfolio/  # Portfolio management
│   │   │   └── settings/   # User settings
│   │   └── startup/        # Startup-specific pages
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Landing page
├── components/             # Reusable UI components
│   ├── ui/                 # Basic UI components
│   ├── dashboard/          # Dashboard-specific components
│   └── forms/              # Form components
├── lib/                    # Utility functions and hooks
│   ├── api-config.ts       # API configuration
│   ├── auth.ts             # Authentication utilities
│   └── utils.ts            # General utilities
├── public/                 # Static assets
└── styles/                 # Global styles
```

## Key Features

### Investor Dashboard

- **Deal Pipeline**: Kanban-style view of investment opportunities
- **Deal List**: Tabular view with sorting and filtering
- **Deal Details**: Comprehensive view of startup information
- **Investment Management**: Track and manage investments
- **Meeting Scheduler**: Schedule and manage meetings with startups

### Authentication

- Secure login/signup flow
- JWT token management
- Role-based access control

### Data Visualization

- Investment portfolio breakdown
- Performance metrics
- ROI tracking

## Development Guidelines

### Component Structure

- Use Client Components (`'use client'`) for interactive UI elements
- Keep Server Components as the default for static content and data fetching
- Follow the container/presentational pattern where appropriate

### API Communication

- All API calls should use the `API_BASE_URL` from `lib/api-config.ts`
- Handle loading and error states appropriately
- Use try/catch blocks for error handling

### Styling

- Use Tailwind CSS for styling
- Follow the project's color scheme and design system
- Ensure responsive design for all components

### State Management

- Use React hooks for local state
- Consider SWR or React Query for remote state management
- Avoid prop drilling by using context where appropriate

## Deployment

The application can be deployed to Vercel with minimal configuration:

```bash
npm run build
vercel --prod
```

For other hosting providers, build the application and deploy the `.next` directory.

## Contributing

1. Create a feature branch from `main`
2. Make your changes
3. Submit a pull request
4. Ensure CI checks pass

## Troubleshooting

### Common Issues

- **API Connection Issues**: Ensure the backend API is running and the `API_BASE_URL` is correctly set
- **Authentication Errors**: Check that your JWT token is valid and not expired
- **Build Errors**: Make sure all dependencies are installed and compatible

### Debugging

- Use the browser's developer tools to inspect network requests and console errors
- Check the terminal output for build and runtime errors
- Use React DevTools for component debugging

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For questions or support, please contact the development team at dev@example.com.