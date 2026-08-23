# Week 2 – Part 1: REST API with In-Memory Storage

## Overview

This project implements a simple REST API using Node.js and Express.

The API provides CRUD operations for managing items. In this part, the data is stored in an in-memory JavaScript array.

This means the data exists only while the server is running and is lost whenever the server restarts.

## Tech Stack

- Node.js
- Express.js
- JavaScript

## Project Structure

```text
part-1/
├── src/
│   └── app.js
├── server.js
├── package.json
├── package-lock.json
└── .gitignore