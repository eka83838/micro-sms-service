# Micro SMS Service

version 1.0.0

## Table of Contents
* [Getting Started](#getting-started)
* [Endpoint](#endpoint)
* [Migrations](#migrations)
* [Commands](#commands)

## Getting Started
* npm install
* Create Database
* Create migration (or you can do manually on your database).
* Run migration.

## Endpoint
This application will provides the following Api endpoints:
* `GET /message`: return list of the all messages
* `GET /message/{id}`: return detail of message
* `POST /message`: send sms, using payload:
* Send sms Payload:
  {
    "sender": "string",
    "receipient": "phone number ex: +62xxx",
    "content": "string"
  }

## Migrations
You need install knex as global
* npm install knex -g

# create migration file
* knex migrate:make migrate_name

# run migrations
* knex migrate:latest


## Commands
All of commands for run the system

# Starting Service, default run on localhost:3000
* npm start

# Linting
* npm run lint

# Testing
* npm run test

# Migration
* npm run migrate

# Seeding Data
* npm run seed
