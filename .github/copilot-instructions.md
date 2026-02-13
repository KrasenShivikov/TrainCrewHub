# TrainCrewHub: 
A comprehensive platform for managing train crew schedules, assignments, and communication. TrainCrewHub streamlines the scheduling process, allowing for efficient crew management.

# Architecture and Technology Stack:
- Frontend: JS app.
- Backend: Supabase.
- Database: PostreSQL.
- Authentication: Supabase Auth.
- Hosting: Netlify.
- Api: Supabase RESTful API.
- Version Control: GitHub.

Use modular code structure, with separate files for components, services, and utilities. Use ES6 modules to organize code.

# UI Guidelines:
- Use HTML, CSS, Bootstrap, and Vanilla JS for the frontend development.
- Implement a modern, responsive and intuitive design for easy navigation.
- Use consistent color schemes and typography throughout the application.
- Use appropriate Icons, effects and visual cues to enhance user experience and guide users through the application.
- Provide clear and concise error messages for user actions.
- Use Semantic HTML elements to enhance accessibility and SEO.

# Page and Nanigation Guidelines:
- Split the application into multiple pages for better organization and user experience.
- Implement pages as reusaable components that can be rendered dinamically based on the current route.
- Use roating to navigate between pages. 
- Use URLs like: /login, /register, /dashboard, etc.


# Backend and Database Guidelines:
- Use Supabase for backend services and PostgreSQL for database management.
- After apllaying migration in Supabase database, keep the copy of migration SQL file in the code.
- Use Supabase MCP (Migration Control Panel) to manage database schema changes and migrations.
- Use Supabase Storage for file uploads and management.


# Authentication and Authorization Guidelines:
- Use Supabase Auth for user authentication and authorization.
- Implement RLS (Row Level Security) policies to restrict access to data based on user roles and permissions.
- Implement user roles with separate DB Table 'user_roles' + enum 'roles' with values like 'admin', ' crew_member', crew_manager', 'crew_instructor' etc. to manage access control and permissions.