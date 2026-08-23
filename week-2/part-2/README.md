# Week 2 – Part 2: REST API with SQLite

## Overview

This project extends Part 1 by replacing the in-memory data storage with a persistent SQLite database.

The API endpoints remain based on the same CRUD operations, while the storage implementation is changed from a JavaScript array to SQLite.

This demonstrates an important backend concept:

> The API layer can remain independent of the underlying storage mechanism.

## Tech Stack

- Node.js
- Express.js
- SQLite
- JavaScript

## Project Structure

```text
part-2/
├── src/
│   ├── app.js
│   └── db/
│       └── db.js
├── server.js
├── package.json
├── package-lock.json
└── .gitignore