# NODE-EXPRESS-TS

This project is a simple loan application API server implemented using TypeScript and Express.

## Structure

- `src`: Folder containing the source code for the server application.
  - `app.ts`: The main file for the Express app.
  - `utils.ts`: File containing common utility functions.
- `database`: Folder containing files related to the database.
  - `LoanApplication.ts`: File defining the interface for loan applications.
  - `loanData.ts`: File containing mock loan data.
- `tests`: Folder containing test code.
  - `app.test.ts`: Test code file for `app.ts`.
  - `utils.test.ts`: Test code file for `utils.ts`.

## Installation

To install the project on your local system, follow these steps:

1. Clone this repository:

git clone https://github.com/jinyoung22/LoanApplication.git

or

git clone git@github.com:jinyoung22/LoanApplication.git

2. Navigate to the project folder:

cd NODE-EXPRESS-TS

3. Install the required npm packages:

npm install


## Running the Project

To start the development server, run the following command:

npm start

The server will be running at `http://localhost:3000`.


## Running Tests

To run the tests for the project, use the following command:

npm test

This command will execute all test files in the `tests` folder.
