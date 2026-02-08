🦸 Superhero Database

A web application for managing superheroes — create, edit, delete, and view superheroes with images.

Built with React on the frontend, Node.js + Express on the backend, and PostgreSQL for data storage using Prisma ORM.

🎯 Features

CRUD operations for superheroes:

Create new superhero

Edit existing superhero

Delete superhero

View details of a superhero

Upload multiple images for each superhero

Pagination: display 5 superheroes per page

Responsive and user-friendly UI

🛠 Tech Stack

Frontend: React, SCSS, React Router v7

Backend: Node.js, Express.js, Prisma

Database: PostgreSQL

File upload: Multer

Version control: Git

⚡ Installation
1️⃣ Clone the repository
git clone https://github.com/viktoriamyhailiak/superhero.git
cd superhero

2️⃣ Backend setup
cd backend
npm install

Create .env file:

DATABASE_URL="postgresql://postgres:1234@localhost:5432/superheroes"
PORT=3001

Run Prisma migrations:

npx prisma migrate dev --name init
npx prisma generate


Start backend server: npm run dev


API will be available at: http://localhost:3001/

3️⃣ Frontend setup
cd ../frontend
npm install
npm run dev


Frontend will be available at: http://localhost:5173/

📝 API Endpoints
Method	Endpoint	Description
GET	/superheroes	List superheroes (with pagination)
GET	/superheroes/:id	Get superhero details
POST	/superheroes	Create a new superhero
PUT	/superheroes/:id	Update a superhero
DELETE	/superheroes/:id	Delete a superhero
POST	/superheroes/:id/images	Upload images for a superhero
💻 Frontend Routes
Path	Component	Description
/	SuperheroList	List all superheroes
/superheroes/:id	SuperheroDetail	View superhero details
/create	SuperheroForm	Create a new superhero
/edit/:id	SuperheroForm	Edit existing superhero
⚙ Assumptions & Notes

Database table names are lowercase in PostgreSQL for consistency (superhero, image)

Frontend forms expect field names as per Prisma schema:

nickname, realName, originDescription, superpowers, catchPhrase

Multiple images can be uploaded per superhero (handled via Multer)

Pagination shows 5 superheroes per page on the list view

Backend runs on port 3001, frontend on 5173

Error handling includes 404 for missing superheroes and 500 for server/database errors

No authentication implemented (open CRUD operations)

📦 Prisma & Database Notes

Prisma Client generated in node_modules/@prisma/client

Reset database and apply migrations:

npx prisma migrate reset --force
npx prisma generate


Check tables:

\dt
SELECT * FROM superhero;
SELECT * FROM image;

🚀 Running the App

Start PostgreSQL server

Run backend: npm run dev

Run frontend: npm run dev

Open http://localhost:5173/ in your browser