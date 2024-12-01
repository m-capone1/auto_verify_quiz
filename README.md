# Vehicle Management Service API

This Vehicle management service API supports CRUD operations for an inventory of vehicles.

### Features

- Add a new vehicle to the inventory.
- Retrieve a list of all current vehicles in the inventory.
- Update the information of an existing vehicle.
- Delete a vehicle from the inventory.

## Installation and Setup

1. Clone the GitHub repository to run it on your local machine. Then navigate to the repository directory:

```bash
git clone <repository-url>
cd <repository-url>
```

2. Install required dependencies using npm:

```javascript
npm install
```

3. Start the server. By default the server runs on port 8080:

```bash
node server.js
```

## API Endpoints

This section will describe the current available endpoints:

### Vehicles

1. Get all vehicles

- Retrieve a list of all vehicles in the inventory.
- /vehicles endpoint
- GET request
- Example Response:

```json
[
  { "id": 1, "make": "Toyota", "model": "Camry", "year": 2021, "trim": "LE" },
  { "id": 2, "make": "Honda", "model": "Civic", "year": 2020, "trim": "EX" }
]
```

2. Add a vehicle

- Add a new vehicle to the inventory.
- /vehicles endpoint
- POST request
- Example Request Body:

```json
{ "make": "Mazda", "model": "CX-5", "year": 2019, "trim": "Sport" }
```

- Example Response:

```json
{ "id": 3, "make": "Mazda", "model": "CX-5", "year": 2019, "trim": "Sport" }
```

3. Update a vehicle

- Update an existing vehicle in the inventory.
- /vehicles/{id} endpoint
- PUT request
- Example Request Body:

```json
{ "make": "Mazda", "model": "CX-5", "year": 2019, "trim": "Grand Touring" }
```

- Example Response:

```json
{
  "id": 3,
  "make": "Mazda",
  "model": "CX-5",
  "year": 2019,
  "trim": "Grand Touring"
}
```

4. Delete a vehicle

- Delete an existing vehicle from the inventory.
- /vehicles/{id} endpoint
- DELETE request

## Future Considerations

The API currently reads and writes data to a local JSON file for simplicity. In the future, integrating a database such as MySQL would be more applicable. The addition of a database will promote a more maintainable and scalable API, which is more useful for a real production environment.
