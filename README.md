# Fit File Processor

## Overview

Fit File Processor is an application that imports FIT files, processes them to extract key data, and saves that data to an SQLite3 database. The application provides a web interface for file upload and an API to query the stored data.

## Features

- Upload FIT files via a web interface
- Parse and extract key data from FIT files
- Save extracted data to an SQLite3 database
- Query the stored data via an API
- Serve static files from the `public` directory

## Directory Structure

```
fit-file-processor
├── src
│   ├── app.ts
│   ├── controllers
│   │   └── fitController.ts
│   ├── services
│   │   └── fitService.ts
│   ├── utils
│   │   ├── db.ts
│   │   └── fitParser.ts
│   └── types
│       └── fit-file-parser.d.ts
├── public
│   ├── index.html
│   └── upload.js
├── database
│   └── schema.sql
├── package.json
├── tsconfig.json
└── README.md
```

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/fit-file-processor.git
cd fit-file-processor
```

2. Install dependencies:

```bash
npm install
```

3. Set up the SQLite3 database:

```bash
sqlite3 database.sqlite < database/schema.sql
```

## Usage

1. Start the server:

```bash
npm start
```

2. Open your web browser and navigate to `http://localhost:4700` to access the web interface for uploading FIT files.

## API Endpoints

### Upload FIT Files

- **URL:** `/upload`
- **Method:** `POST`
- **Description:** Upload FIT files and save the extracted data to the database.
- **Request:**
  - `multipart/form-data` with one or more FIT files.

### Query Data

- **URL:** `/collection-query`
- **Method:** `POST`
- **Description:** Query the stored data.
- **Request:**
  - `application/json` with a `query` field containing the SQL query.

## Development

### TypeScript

The project is written in TypeScript. To compile the TypeScript code, run:

```bash
npm run build
```

### Custom Type Definitions

The `fit-file-parser` module does not have type definitions, so a custom declaration file is provided in `src/types/fit-file-parser.d.ts`.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request on GitHub.

## Acknowledgements

- [FIT File SDK](https://github.com/yourusername/fit-file-parser) for parsing FIT files.
- [Express](https://expressjs.com/) for the web framework.
- [SQLite3](https://www.sqlite.org/) for the database.

---

Feel free to customize this README file according to your project's specific details and requirements.