# QR Order &middot;

![Tests](https://github.com/codeavor/qr-order/workflows/Test/badge.svg)
[![Maintainability](https://api.codeclimate.com/v1/badges/e65d412d543bd395b213/maintainability)](https://codeclimate.com/github/codeavor/qr-order/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/e65d412d543bd395b213/test_coverage)](https://codeclimate.com/github/codeavor/qr-order/test_coverage)

Web app that lets you order just by scanning a QR Code.

## Demo

- Use [this link](https://qr-order.netlify.app/authentication/1) to make an order, as a customer,
- or [this link](https://qr-order.netlify.app/authentication/0) to view all the orders, as an employee.

## Installation

- Clone the project.
- Install the dependencies: `npm install`

## How to run

- Start the app: `npm start`
- Use [this link](http://localhost:3000/authentication/1) to login as customer, and [this link](http://localhost:3000/authentication/0) to login as kitchen.

## Other scripts available

- `npm run coverage`, with this script you can get the test coverage.
  - It uses: `coverage:clean` to remove any old coverage files,
  - `coverage:integration` to run the [Cypress](https://www.cypress.io/) tests,
  - `coverage:unit` to run the unit tests,
  - `coverage:merge` to merge the coverage reports.

## CICD

Every time a pull request opens:

- project gets tested and has its test coverage report sent to [Code Climate](https://codeclimate.com/github/codeavor/qr-order) using Github Actions (with [this](test.yml) script),
- Code Climate tests the code for Duplication/Complexity/Maintainability issues,
- Netlify creates a deploy preview.

When a pull request gets merged into master:

- using [this](coverage-master.yml) script, a new test coverage report is created and sent to Code Climate,
- app gets deployed to Netlify.
