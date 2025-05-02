# Project Name

## Description
This repository contains test cases for the Restful Booker API, including various positive and negative scenarios such as creating, updating, deleting, retrieving, and filtering bookings. It is designed to test the functionality and reliability of the API.

## Folder Structure
- `tests/`: Contains all the test cases (currently we only have one file: automatedSmokeTests.test.js).
- `foundBugs.md`: A document where identified bugs are listed.
- `testCases.md`: A document containing detailed descriptions of the test cases.

## Prerequisites
Before you can run the tests, you need to ensure the following dependencies are installed:

- Node.js
- npm or yarn (for package management)

## Installation
1. Clone this repository to your local machine:
    ```bash
    git clone https://github.com/Toni2805/restful-booker-api-qa.git
    cd restful-booker-api-qa
    ```

2. Install dependencies:
    ```bash
    npm install
    ```
    or if you're using yarn:
    ```bash
    yarn install
    ```

## Running Tests
Once you have set up the project and installed the dependencies, you can run the test cases.

1. **Run specific test file:**
    To run a specific test file, use:
    ```bash
    npm test automatedSmokeTests.test.js
    ```
