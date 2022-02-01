# Ghost custom services API

It is a custom service API with a Ghost service that's provides integration with:

* Sendgrid: A sendgrid API integration to use the sendgrid inbound webhook to save the email and resend the email to another email. When you recieve the email after sendgrid sent you the email, the from email address is the original recipient of the email.

* Linkedin: A LinkedIn API integration to share a published blog link into the LinkedIn account.

* Twitter: A Twitter API integration to Tweet a published blog link into the Twitter account.

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
SEND_EMAIL = 1 # In order to resend the email
SENDGRID_API_KEY = my_sendgrid_api_key
RESEND_EMAIL_TO = my_recipient@gmail.com
API_KEY = 'My api key' # It could be any generated code, it is just for avoid unnecessary requests to the endpoints by internet bots, this api key code must be send by query param using the parameter apiKey
NODE_ENV = development
#### TWITTER ####
TWITTER_KEY = my_key
TWITTER_SECRET = my_secret
TWITTER_ACCESS_TOKEN = access_token
TWITTER_ACCESS_SECRET = access_secret
#### LINKEDIN ####
LINKEDIN_KEY = linkedin_id_key
LINKEDIN_SECRET = linkedin_secret
LINKEDIN_REDIRECT_URL = linkedin_redirect_uri
#### JWT ####
JWT_SECRET_KEY = jwt_secret_key
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
unset MONGO_URI PORT MONGO_INITDB_ROOT_USERNAME MONGO_INITDB_ROOT_PASSWORD MONGO_DB_USER MONGO_DB_PASSWORD MONGO_DB_NAME PROJECT_NAME SEND_EMAIL SENDGRID_API_KEY RESEND_EMAIL_TO API_KEY TWITTER_KEY TWITTER_SECRET TWITTER_ACCESS_TOKEN TWITTER_ACCESS_SECRET LINKEDIN_KEY LINKEDIN_SECRET LINKEDIN_REDIRECT_URL JWT_SECRET_KEY CORS_DOMAIN
```

## How to access to the restricted endpoints

In order to access to the restricted endpoints we need to use a header parameter called `Authorization` and send inside the generated token

## Enable Linkedin sharing

To enable the Linkedin sharing we need to generate a new token for the Linkedin access:

* We need to access to the UI for the services and generate a new Token after that we can able to use the sharing endpoint

## Create the external network for docker services:

```bash
docker network create ghost-services
```
