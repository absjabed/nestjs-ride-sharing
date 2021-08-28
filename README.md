<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

# Ride Sharing Application using Nest.js and MongoDB

[Nest](https://github.com/nestjs/nest) is a prograssive [Node.js](https://nodejs.org) framework with TypeScript for building efficient and scalable server-side/backend applications.

## Description

Ride Sharing application backend with Node.js framework. available features are add user, offer ride, find ride, rest wip...

## Technologies Used

- Node.js, NestJs
- Typescript
- MongoDB
- Mongoose
- Rest client
- git

## Application Entities

- Users
- Ride offers
- Report

## Folder structure
```bash
- src
    - users # User Entity implementation
        - dto # Data Transfer Object
        - schemas # Entity schema
    - offer-ride # Offer-ride Entity implementation
        - dto
        - schemas
    - report # Report Entity implementation
        - dto 
        - schemas
- rest-client-test.http  # api request test example
```

## Installation

```bash
$ npm install -g @nestjs/cli
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Rest-API End Examples

### 1 - add a new user
```
POST http://localhost:3000/users/addUser
Content-Type: application/json

{ 
    "username": "Rohan",
    "gender": "M",
    "age": 36
}
```
### 2 - get all users
```
GET http://localhost:3000/users

```
### 3 - add user vehicle
```
POST  http://localhost:3000/users/addUserVehicle
Content-Type: application/json

{
    "username": "Rohan",
    "vehicle_brand": "Swift",
    "vehicle_number": "KA-01-12345"
}
```

### 4 - offer a new ride
```
POST  http://localhost:3000/offer-ride/offerRide
Content-Type: application/json

{
    "username": "Rohan",
    "origin": "Hyderabad",
    "available_seats": 1,
    "vehicle": "Swift, KA-01-12345",
    "destination": "Bangalore"
}
```
### 5 - Find a Ride for a User
```
POST  http://localhost:3000/offer-ride/findRide
Content-Type: application/json

{
    "username": "Rohan",
    "origin": "Hyderabad",
    "seats": 1,
    "preferred_vehicle": "Swift",
    "destination": "Bangalore"
}
```

### 6 - End a Ride for a User
```
POST  http://localhost:3000/offer-ride/endRide
Content-Type: application/json

{
    "username": "Gaurav",
    "origin": "Bangalore",
    "destination": "Mysore",
    "vehicle": "Activa KA-12-12332"
}
```
