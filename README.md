# Product Box (Spring Boot + Angular)

Full-stack application with Java Spring Boot and Angular 17+.

## 🚀 Tech Stack

- **Backend:** Java 17, Spring Boot 3.2, Spring Data JPA, Lombok.
- **Database:** H2 In-Memory (Easily switchable to PostgreSQL/MySQL).
- **Frontend:** Angular 17+, Signals, Standalone Components, Reactive Forms.
- **DevOps:** Docker, Docker Compose, Nginx.

## 🛠 Project Structure

- `/backend` - Spring Boot REST API.
- `/frontend` - Angular Application.
- `docker-compose.yml` - Full system orchestration.

## 🏁 Quick Start (Docker Compose)

The easiest way to run the entire system:

```bash
docker-compose up --build
```

- **Frontend:** http://localhost
- **Backend API:** http://localhost:8080/api/products
- **H2 Console:** http://localhost:8080/h2-console

## 💻 Local Development

### Prerequisites
- JDK 17
- Node.js 20+
- Maven

### Run Backend
```bash
cd backend
mvn spring-boot:run
```

### Run Frontend
```bash
cd frontend
npm install
npm start
```

## 📜 API Endpoints

- `GET /api/products` - Get all products.
- `GET /api/products/{id}` - Get product by ID.
- `POST /api/products` - Create new product.
- `PUT /api/products/{id}` - Update product.
- `DELETE /api/products/{id}` - Delete product.
