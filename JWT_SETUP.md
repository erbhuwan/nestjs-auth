# JWT Authentication Setup

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Application Configuration
APP_PORT=3000
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=nestjs_auth
DB_SYNCHRONIZE=false
DB_LOGGING=true
DB_SSL=false

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=15m
JWT_REFRESH_SECRET=your-super-secret-refresh-key-change-in-production
JWT_REFRESH_EXPIRES_IN=7d

# Bcrypt Configuration
BCRYPT_ROUNDS=12
```

## Database Setup

1. Start PostgreSQL database:
   ```bash
   docker compose up -d postgres
   ```

2. Run migrations:
   ```bash
   npm run migration:run
   ```

## API Endpoints

### Authentication
- `POST /v1/auth/register` - Register a new user
- `POST /v1/auth/login` - Login user
- `POST /v1/auth/refresh` - Refresh access token
- `POST /v1/auth/logout` - Logout user

### Users
- `GET /v1/users/profile` - Get current user profile
- `PUT /v1/users/profile` - Update current user profile
- `PUT /v1/users/change-password` - Change user password
- `GET /v1/users` - Get all users (Admin only)
- `GET /v1/users/:id` - Get user by ID (Admin only)
- `DELETE /v1/users/:id` - Delete user (Admin only)

## Swagger Documentation

Access the API documentation at: `http://localhost:3000/v1/docs`

## Features

- JWT-based authentication with access and refresh tokens
- Role-based access control (Admin/User)
- Password hashing with bcrypt
- User profile management
- Comprehensive API documentation
- Request/response logging
- Rate limiting
- Input validation
- Error handling
