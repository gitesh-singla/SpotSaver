# SpotSaver - C2C Parking Spot Booking Website

SpotSaver is a full-stack consumer-to-consumer (C2C) parking spot booking website that allows users to list and book parking spots with ease. Built using modern web technologies such as React, Express, and MongoDB, SpotSaver offers a seamless experience for both parking spot providers and seekers.

## Features

- **Parking Spot Reservation**: Users can list their parking spots and book available spots in a peer-to-peer marketplace.
- **Geolocation and Pin Code Integration**: OpenStreetMaps provides an interactive map for viewing nearby parking spots based on the user's location and pin code.
- **Real-Time Route Information**: Integrated OpenRouteService delivers real-time route data and estimated time of arrival (ETA) to selected parking spots.
- **Automated Reservation Updates**: A cron job regularly updates the status of completed reservations, ensuring the database reflects the latest parking spot availability.

![Home Page](https://private-user-images.githubusercontent.com/124420820/326161877-c4e796d4-4c3a-4f6b-ac40-b9d6a81d69cd.jpg?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MTQyMDI0NTcsIm5iZiI6MTcxNDIwMjE1NywicGF0aCI6Ii8xMjQ0MjA4MjAvMzI2MTYxODc3LWM0ZTc5NmQ0LTRjM2EtNGY2Yi1hYzQwLWI5ZDZhODFkNjljZC5qcGc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjQwNDI3JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI0MDQyN1QwNzE1NTdaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT0zNWZkMTE2MDFmY2ViZjYzYWJlZjAwMjAyM2EwMDkxNzQ1MGIzNmM0NTlhMTVkYmJiZDRlMjc1ZjM2ZTNjYzdkJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZhY3Rvcl9pZD0wJmtleV9pZD0wJnJlcG9faWQ9MCJ9.iv-b-o2daWYyoKU0-w8_Po67wwQH59tqxmQvD0Nrcfw)
![Listings Page](https://private-user-images.githubusercontent.com/124420820/326161867-4797b76d-3e81-4530-9cdf-14065b02a337.jpg?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MTQyMDI0NTcsIm5iZiI6MTcxNDIwMjE1NywicGF0aCI6Ii8xMjQ0MjA4MjAvMzI2MTYxODY3LTQ3OTdiNzZkLTNlODEtNDUzMC05Y2RmLTE0MDY1YjAyYTMzNy5qcGc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjQwNDI3JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI0MDQyN1QwNzE1NTdaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT0yYjg5MzcxMzdlYmRhOTU5MThiNjc4YzZjOGE4Y2VlMzVmYWIzYzI5MThiMWFmZjAwZGFmNDgxYTQ0ODA3ZDIxJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZhY3Rvcl9pZD0wJmtleV9pZD0wJnJlcG9faWQ9MCJ9.eLnKfonrEy6VdL0xrPvmG9XB8PRA_T3chqYCSKFF2D4)
![Route](https://private-user-images.githubusercontent.com/124420820/326161874-2320c347-42ec-4fd5-9ea4-c2bbdacaf78b.jpg?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MTQyMDI0NTcsIm5iZiI6MTcxNDIwMjE1NywicGF0aCI6Ii8xMjQ0MjA4MjAvMzI2MTYxODc0LTIzMjBjMzQ3LTQyZWMtNGZkNS05ZWE0LWMyYmJkYWNhZjc4Yi5qcGc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjQwNDI3JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI0MDQyN1QwNzE1NTdaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT00Y2Q2NmFjNGE4MmI4ODJlODM0YWViMmQ3YjM2MjYwYmQ4OTViZDQ5ZGNmOTJmNGEwODQ3ZTdjOTllOWUwZjI1JlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZhY3Rvcl9pZD0wJmtleV9pZD0wJnJlcG9faWQ9MCJ9.zA4MqXVUhLCuu6iPqr6Fb-BmS5eQCuV58Tou7r5oQFI)


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
        - `PORT`: The port number to run the server on. Set to 4000
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
