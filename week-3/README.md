# Week 3 — Task API with PostgreSQL & Docker

A backend Task Management API built using **Node.js, Express, PostgreSQL, and Docker**.

The project follows the **Repository Pattern**, allowing the application to switch its data storage implementation without changing the service or route logic.

## Tech Stack

* Node.js
* Express.js
* PostgreSQL
* `pg` — PostgreSQL client for Node.js
* `dotenv` — Environment variable management
* Docker
* Docker Compose

## Architecture

The application follows this flow:

```text
Client
  ↓
Express Routes
  ↓
Task Service
  ↓
Repository
  ↓
PostgreSQL
```

The repository layer separates the application's business logic from the database implementation.

The repository interface provides:

* `create()`
* `getAll()`
* `getById()`
* `delete()`

There are two repository implementations:

```text
MemoryRepository
PostgresRepository
```

The application is currently configured to use `PostgresRepository`.

## Project Structure

```text
week-3/
├── db/
│   └── init.sql
├── src/
│   ├── repositories/
│   │   ├── memoryRepository.js
│   │   └── postgresRepository.js
│   ├── routes/
│   │   └── taskRoutes.js
│   ├── services/
│   │   └── taskService.js
│   ├── container.js
│   ├── db.js
│   └── server.js
├── .env
├── .env.example
├── .gitignore
├── Dockerfile
├── docker-compose.yml
├── package.json
└── package-lock.json
```

## API Endpoints

Base URL:

```text
http://localhost:3000/api
```

### Create a task

```http
POST /tasks
```

Request body:

```json
{
  "title": "Complete backend assignment"
}
```

Example response:

```json
{
  "id": 1,
  "title": "Complete backend assignment"
}
```

### Get all tasks

```http
GET /tasks
```

Example response:

```json
[
  {
    "id": 1,
    "title": "Complete backend assignment"
  }
]
```

### Get a task by ID

```http
GET /tasks/:id
```

Example:

```text
GET /tasks/1
```

### Delete a task

```http
DELETE /tasks/:id
```

Example:

```text
DELETE /tasks/1
```

Response:

```json
{
  "message": "Task deleted successfully"
}
```

## Database

PostgreSQL is run using Docker.

The database configuration is provided through the `DATABASE_URL` environment variable.

Example:

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/a2db
```

The actual `.env` file is not committed to the repository.

A `.env.example` file is included as a template.

## Database Initialization

The database table is created using:

```text
db/init.sql
```

The SQL creates the `tasks` table:

```sql
CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL
);
```

When PostgreSQL is initialized for the first time through Docker Compose, this script is automatically executed.

## Running with Docker Compose

Make sure Docker Desktop is running.

Start the complete application:

```bash
docker compose up --build
```

This starts:

* Node.js/Express application
* PostgreSQL database

The API is available at:

```text
http://localhost:3000
```

To stop the application:

```bash
docker compose down
```

## PostgreSQL Persistence

PostgreSQL uses a Docker named volume:

```text
postgres_data
```

The volume is mounted at:

```text
/var/lib/postgresql/data
```

This allows database data to survive container removal and recreation.

### Persistence Test

A task was created through the API:

```json
{
  "title": "Persistence test"
}
```

The task was then verified using:

```http
GET /api/tasks
```

The Docker Compose stack was stopped using:

```bash
docker compose down
```

The stack was started again using:

```bash
docker compose up
```

After restarting the stack, the same task was retrieved using:

```http
GET /api/tasks
```

The task was still present, demonstrating that the PostgreSQL data persisted through the container restart because it was stored in the Docker named volume.

> Note: `docker compose down -v` should not be used when testing persistence because it removes the named volume and its stored database data.

## Environment Variables

Create a `.env` file in the project root:

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/a2db
```

For Docker Compose, the application container uses the PostgreSQL service name `db` as its database host:

```text
postgresql://postgres:postgres@db:5432/a2db
```

## Running Without Docker

If PostgreSQL is available locally, install dependencies:

```bash
npm install
```

Then start the application:

```bash
npm start
```

For development:

```bash
npm run dev
```

## Repository Pattern

The repository pattern keeps database operations separate from the rest of the application.

The service interacts with a repository rather than directly communicating with PostgreSQL.

For example:

```text
TaskService
     ↓
Repository interface
     ↓
PostgresRepository
     ↓
PostgreSQL
```

This makes it possible to replace the storage implementation without changing the task service's business logic.

## Current Status

* [x] Express Task API
* [x] Repository pattern
* [x] In-memory repository
* [x] PostgreSQL repository
* [x] PostgreSQL running in Docker
* [x] Database initialization using SQL
* [x] Environment variable configuration
* [x] Docker named volume
* [x] Dockerfile
* [x] Docker Compose
* [x] PostgreSQL healthcheck
* [x] App-to-database communication
* [x] Persistence verified across Docker Compose restart
