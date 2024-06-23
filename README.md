# Shopping-mall task

This repository contains the code for the Shopping Mall Backend. In order to run the app, you need to configure the environment variables.

## Backend Configuration

1. Create a `.env` file inside the `/backend` folder.
2. Make sure all environment variables from `.env.example` are correctly set in the `.env` file.

To install packages run `yarn install`

To run the backend, use one of the following commands:`

- `yarn start`
- `yarn start:dev` to run the backend with hot reloading

  **Endpoints:**

  - **Create Product:** `POST /api/products`
  - **Get All Products:** `GET /api/products`
  - **Get Product by ID:** `GET /api/products/{id}`
  - **Update Product:** `PUT /api/products/{id}`
  - **Delete Product:** `DELETE /api/products/{id}`
  - **Get Product Details by ID:** `GET /api/products/{id}`
