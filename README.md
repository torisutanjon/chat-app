## Chat Web Application

### Built using:

- NextJS 13
- Socket.io
- Express JS
- Node JS
- Mongo DB
- TypeScript
- Tailwind CSS

### Features:

- Users can create account
- Username and Email is unique
- Email verification using gmail
- Multi-users and multi-rooms
- Can create public and private rooms

### Guide

1. Clone the app

2. Open the project in your favorite text editor

3. Go to backend folder

4. Run `npm install` to install dependencies

5. Create `.env` in the backend root folder with the following environment variables.

Your own mongodb uri for your project

> MONGODB_URI

Username of the account that you created for the mongodb project

> username

Password of the account that you created for the mongodb project

> password

Hash count for the bcrypt dependency (this is just a random string)

> BCRYPT_HASH

JSONWEBTOKEN secret key

> SECRET_KEY

Your gmail username

> EMAIL_USERNAME

Your gmail account app connection generated password

> EMAIL_PASSWORD

Secret key for nodemailer dependency (this is just a random string)

> NODEMAILER_SECRET_KEY

Root URL of your frontend

> ROOT_URL

6. Save the .env file. And run `npm run dev` to start the development mode of backend

7. Go to chat-app folder

8. Run `npm install` to install dependencies

9. Run `npm run dev` to start the development mode of frontend

### Features with images

- Users can create account

![Create Account Image](./readme%20assets/create-account.jpg)

- Email verification using gmail

![Email Verification Image](./readme%20assets/verify-email.jpg)

- Multi-users and multi-rooms

![Multi Users and Rooms Image](./readme%20assets/multi.jpg)

- Can create public and private rooms

![Create Room Image](./readme%20assets/create-room.jpg)
