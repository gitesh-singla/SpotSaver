# SpotSaver - C2C Parking Spot Booking Website

SpotSaver is a full-stack consumer-to-consumer (C2C) parking spot booking website that allows users to list and book parking spots with ease. Built using modern web technologies such as React, Express, and MongoDB, SpotSaver offers a seamless experience for both parking spot providers and seekers.

## Features

- **Parking Spot Reservation**: Users can list their parking spots and book available spots in a peer-to-peer marketplace.
- **Geolocation and Pin Code Integration**: OpenStreetMaps provides an interactive map for viewing nearby parking spots based on the user's location and pin code.
- **Real-Time Route Information**: Integrated OpenRouteService delivers real-time route data and estimated time of arrival (ETA) to selected parking spots.
- **Automated Reservation Updates**: A cron job regularly updates the status of completed reservations, ensuring the database reflects the latest parking spot availability.

## Getting Started

To get started with SpotSaver, follow these steps:

1. **Clone the repository**:

    ```bash
    git clone https://github.com/gitesh-singla/SpotSaver.git
    ```

2. **Navigate to the project directory**:

    ```bash
    cd spotsaver
    ```

3. **Install dependencies**:

    - **Server dependencies**:

        ```bash
        cd server
        npm install
        ```

    - **Client dependencies**:

        ```bash
        cd ../client
        npm install
        ```

4. **Configure the server environment**:

    - In the `server` directory, create a `.env` file with the following environment variables:
        - `MONGO_URI`: Your MongoDB connection URI.
        - `PORT`: The port number to run the server on.
        - `ORS_API_KEY`: Your OpenRouteService API key.
        - `JWT_KEY`: Your JWT secret key.

5. **Start the server**:

    ```bash
    cd server
    node ./index.js
    ```

6. **Start the client**:

    ```bash
    cd ../client
    npm run dev
    ```

## License

This project is licensed under the [MIT License](LICENSE). See the `LICENSE` file for more details.

## Contact

Reach out to us directly at [giteshsingla7@gmail.com](mailto:giteshsingla7@gmail.com).
