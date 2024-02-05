# Webshop - With Only Backend (Assignment in course API-development)

#### This Backend-webshop is made as an assignment in the API-development course. 

**It's not possible to see the webshop in a browser.**
**This webshop is only built with backend (no frontend), the only way to try it, is if you use:**

- Postman
- REST Client in Visual Studio Code

#### It's connected to a database through MongoDB Compass, there you can see users, products and orders that are created with Postman or REST client.

## Content 

I have during this assignment been using following components:

- Express installation 
- Node.js
- MongoDB 
- JavaScript
- MongoDB Compass
- Postman
- REST Client

## API-documentation 

This project is only built with endpoints. 

Below I will list the endpoints, that's included in this project.

### Users 

- `GET /users`: Retrieve all users
- `POST /users/`: Retrieve a specific user
- `POST /users/add`: Create user
- `POST /users/login`: Login user

### Products

- `GET /products`: Retrieve all products
- `GET /products/id`: Retrieve a specific product 
- `POST /products/add`: Create product

### Orders

- `POST /oders/add`: Create order for a specifik user.
- `GET /oders/all`: Retrieve all orders