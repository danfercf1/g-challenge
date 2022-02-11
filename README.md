# Ghost Challenge

This is a ghost challenge

## How to run the project for development environment

```bash
docker-compose -f docker-compose-dev up
```

And then you can run the service using the debug mode:

```bash
npm run service:debug
```

## Environment variables configuration

You need to create a `.env` file and configure the below variables inside the `.env` file

```.env
MONGO_URI = mongodb://my_user:my_pass@db:27017/sendgrid_dev
PORT = 3000
MONGO_INITDB_ROOT_USERNAME = root
MONGO_INITDB_ROOT_PASSWORD = RXep2NcQ
MONGO_DB_USER = my_user
MONGO_DB_PASSWORD = my_pass
MONGO_DB_NAME = sendgrid_dev
PROJECT_NAME = sendgrid
NODE_ENV = development
#### CORS ####
CORS_DOMAIN = localhost
```

## How to run the project in production mode

Run the project following the next steps:

```bash
npm run build
```

And then:

```bash
docker-compose up
```

## How to setup the environment variables to run the dist

Add the variables to the environment:

```bash
export $(xargs < .env)
```

Remove the variables:

```bash
unset MONGO_URI PORT MONGO_INITDB_ROOT_USERNAME MONGO_INITDB_ROOT_PASSWORD MONGO_DB_USER MONGO_DB_PASSWORD MONGO_DB_NAME PROJECT_NAME CORS_DOMAIN NODE_ENV
```

## Test the UI

To test the UI you can go to: [http://localhost:3000/ui/](http://localhost:3000/ui/)

## First Discussion creation

Because the UI does not have the feature to create the first discussion thread we should create it using the API

We can use for example: [https://insomnia.rest/download](https://insomnia.rest/download)

And we just make a POST request to: `http://localhost:3000/api/discussions` with the following JSON payload

```json
{
 "subject": "New discussion 1",
 "status": "Active",
 "user": "Daniel Candia"
}
```

And then you can make comments in the UI [http://localhost:3000/ui/](http://localhost:3000/ui/).
