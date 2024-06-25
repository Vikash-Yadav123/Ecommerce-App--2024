



# Ecommerce-App

## Introduction
This is a full-fledged ecommerce application developed using the MERN stack, incorporating various modern web technologies:

- **Frontend**: React, Bootstrap, Ant Design
- **Backend**: Node.js, Express
- **Database**: MongoDB

### Features on the Frontend:
- Filter products by category, price, color, and size.
- Search for products.
- Add products to the cart from the home page.
- Save cart data in local storage.
- View cart items, total payment, and remove items one by one or clear all items.
- Use of Context API for authentication, cart, and search functionalities.
- Hooks for category, and routes for protected authentication and admin access.
- Admin dashboard with the ability to create, read, update, and delete products.
- User dashboard to update profile and view orders.

### Features on the Backend:
- JWT for authentication.
- Braintree for payment processing.
- Dotenv for managing environment variables.
- Bcrypt for password hashing.
- Morgan for HTTP request logging.
- Slugify for SEO-friendly URLs.
- Express-formidable for handling file uploads.
- CRUD operations for categories, products, and users through API endpoints.

## Features
- **Search Product**: Easily search for products.
- **Add to Cart**: Add products to the shopping cart.
- **Filter Product**: Filter products based on various criteria.
- **Remove Product**: Remove products from the cart.
- **Payment**: Process payments using Braintree.
- **Dashboard**:
  - **User Dashboard**: View and manage user profile and orders.
  - **Admin Dashboard**: Full CRUD functionality for products and user management.
- **Context API, Hooks, and Routes**: Integrated for state management and routing.
- **Password Hashing**: Secure password storage with bcrypt.
- **Database**: All data is stored in MongoDB.
- **Load More Button**: Efficient loading of additional content.

## Installation
To run this project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/Vikash-Yadav123/Ecommerce-App.git
   cd ecommerce-app


2. Install Dependency Fronted and Backend.
cd client and server npm install

3. Set up environment variables in the server:
Create a .env file in the server directory with the following variables:
MONGO_URI=your_mongo_db_connection_string
JWT_SECRET=your_jwt_secret
BRAINTREE_MERCHANT_ID=your_braintree_merchant_id
BRAINTREE_PUBLIC_KEY=your_braintree_public_key
BRAINTREE_PRIVATE_KEY=your_braintree_private_key

4.Start the development servers:
cd client
npm start
cd ../server
npm run dev

Usage
After starting the servers, open your browser and navigate to http://localhost:3000 to access the frontend. The backend server will be running on http://localhost:... according to your set localhost in env server and env files




Contributin
If you wish to contribute to this project, please follow these steps:

Fork the repository.
Create a new branch (git checkout -b feature/your-feature).
Make your changes and commit them (git commit -m 'Add some feature').
Push to the branch (git push origin feature/your-feature).
Open a pull request.

⭐ Star This Repository

Make sure to replace `Vikash-Yadav123` in the git clone URL with your actual GitHub username or the repository URL. Additionally, ensure that the environment variables are correctly set up in the `.env` file in your server directory.






