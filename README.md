# Task_Management_System

# Architecture

- **Auth Service** (Port 8081) – Handles authentication and JWT generation  
- **Employee Service** (Port 8082) – Manages employee data  
- **Task Service** (Port 8083) – Manages tasks with employee validation  
- **Frontend (Angular)** (Port 4200) – Angular application with Material Design UI

## Prerequisites

- Java 17+
- Node.js 18+
- MySQL 8.0+
- Maven 3.5+
- Angular CLI 17+

## Database Setup

**1. Start your MySQL server**

**2. Run the database setup script:**

```sql

-- Create separate databases for each microservice
CREATE DATABASE IF NOT EXISTS auth_db;
CREATE DATABASE IF NOT EXISTS employee_db;
CREATE DATABASE IF NOT EXISTS task_db;

-- Create MySQL user with proper permissions
CREATE USER 'taskapp'@'localhost' IDENTIFIED BY 'taskapp123';

-- Grant ALL privileges on each database
GRANT ALL PRIVILEGES ON auth_db.* TO 'taskapp'@'localhost';
GRANT ALL PRIVILEGES ON employee_db.* TO 'taskapp'@'localhost';
GRANT ALL PRIVILEGES ON task_db.* TO 'taskapp'@'localhost';

-- Flush privileges to apply changes
FLUSH PRIVILEGES;

-- Verify databases exist
SHOW DATABASES;

-- Verify user was created
SELECT User, Host FROM mysql.user WHERE User = 'taskapp';

-- Insert admin user into auth_db
USE auth_db;
INSERT IGNORE INTO users (username, password) VALUES 
('admin', '$2a$12$uZZFY4PpFCNfzF4Jt.52QeK0Sf72q6OpH3gnfdLxE3vJAEARrEg8G');

-- Insert sample employees into employee_db
USE employee_db;
INSERT IGNORE INTO employees (name, email, department) VALUES 
('Kamal Perera', 'kamal@gmail.com', 'Development'),
('Sahan Bandara', 'sahan11@gmail.com', 'Design');

-- Insert sample tasks into task_db
USE task_db;
INSERT IGNORE INTO tasks (title, description, status, due_date, employee_id) VALUES 
('Setup Project', 'Initialize the project structure and dependencies', 'TODO', '2025-07-15', 1),
('Design UI Mockups', 'Create wireframes and mockups for the application', 'IN_PROGRESS', '2025-07-20', 2),
('Write Unit Tests', 'Implement unit tests for core functionality', 'TODO', '2025-07-25', 3),
('Project Planning', 'Create project timeline and milestones', 'DONE', '2025-07-10', 4);
```
**Note: Spring Boot will auto create the tables. Run insert queries after the first boot.**

## Backend Services
**1. Auth Service (Port 8081)**
```bash

cd auth-service
mvn spring-boot:run
```

**2. Employee Service (Port 8082)**
```bash

cd employee-service
mvn spring-boot:run
```

**3. Task Service (Port 8083)**
```bash

cd task-service
mvn spring-boot:run
```

## Frontend
**1. Install dependencies**
```bash

cd frontend
npm install
``` 
**2. Install Angular Material**
```bash

ng add @angular/material
```

**3. Run the application**
```bash

ng serve
```

## Sample Credentials
**Login:**

- Username: admin
- Password: password

## Known Issues

- **CORS:** If you encounter CORS issues, ensure all services are running on specified ports
- **Database:** Make sure MySQL is running and databases are created
- **Data Insert:** Run insert queries after starting each backend service (tables will be auto-created)

## Development Notes

- Each service runs independently
- Frontend interacts with all backend services via secure REST API
- UI is built using Angular Material components
