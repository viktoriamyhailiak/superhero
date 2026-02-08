### 🦸 Superhero Database

A web application to manage superheroes — create, edit, delete, and view superheroes with images.
Built with React (frontend), Node.js + Express (backend), and PostgreSQL with Prisma ORM.

###  🎯 Features

CRUD operations for superheroes:
- Create new superhero
- Edit existing superhero
- Delete superhero
- View superhero details
- Upload multiple images per superhero
- Pagination: 5 superheroes per page
- Responsive & user-friendly UI

### 🛠 Tech Stack

1. Frontend: React, SCSS, React Router v7
2. Backend: Node.js, Express.js, Prisma
3. Database: PostgreSQL
4. File Upload: Multer
5. Version Control: Git

###  ⚡ Installation
1️⃣ Clone the repository
- git clone https://github.com/viktoriamyhailiak/superhero.git
- cd superhero

2️⃣ Backend Setup
- cd backend
- npm install

Create PostgreSQL Database:
- Open PostgreSQL CLI or pgAdmin: CREATE DATABASE superheroes;

Create a .env file:
DATABASE_URL="postgresql://postgres:1234@localhost:5432/superheroes"
PORT=3001

Run Prisma migrations:
- npx prisma migrate dev --name init
- npx prisma generate

Start backend server:
- npm run dev

Backend API will be available at: http://localhost:3001/

3️⃣ Frontend Setup
- cd ../frontend
- npm install
- npm run dev

Frontend will be available at: http://localhost:5173/

### 📝 API Endpoints
Method	Endpoint	Description: 
1. GET	/superheroes	List superheroes (with pagination)
2. GET	/superheroes/:id	Get superhero details
3. POST	/superheroes	Create a new superhero
4. PUT	/superheroes/:id	Update a superhero
5. DELETE	/superheroes/:id	Delete a superhero
6. POST	/superheroes/:id/images	Upload images for a superhero

###  💻 Frontend Routes
Path	Component	Description
1. /	SuperheroList	List all superheroes
2. /superheroes/:id	SuperheroDetail	View superhero details
3. /create	SuperheroForm	Create a new superhero
4. /edit/:id	SuperheroForm	Edit existing superhero

### ⚙ Assumptions & Notes

1. Database table names are lowercase (PostgreSQL): superhero, image
2. Frontend forms match Prisma schema fields: nickname, realName, originDescription, superpowers, catchPhrase
3. Multiple images can be uploaded per superhero (Multer handles this)
4. Pagination shows 5 superheroes per page
5. Backend: port 3001, Frontend: port 5173
6. Error handling: 404 for missing superheroes, 500 for server/database errors

### 📦 Prisma & Database Notes

Prisma Client generated in node_modules/@prisma/client

To reset database and apply migrations:

- npx prisma migrate reset --force
- npx prisma generate

Check tables in PostgreSQL:

\dt
- SELECT * FROM superhero;
- SELECT * FROM image;

### 🚀 Running the App

Start PostgreSQL server

Run backend:
- cd backend
- npm run dev


Run frontend:
- cd frontend
- npm run dev


Open in browser: http://localhost:5173/
