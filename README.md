# Oroko Travels Express Backend

NodeJS backend application for Oroko Travels.

## Overview

## Features

## Developer Setup

### Prerequisite

- NPM
- NodeJs
- Git
- DB System
- Docker (Optional)

## Installation

1. Clone the Repository:

    ```bash
    git clone https://github.com/Cozmotec-CD/Oroko.git
    ```

1. Install project dependencies:

    ```bash
    cd Oroko
    npm install
    ```

1. Setup Database

1. Configure environment variables

    - Create a `.env` file in the project root with the following:

        ```text
        SECRET_KEY=<secret key>
        DEBUG=True
        DB_NAME=orokodb
        DB_USER=orokodb_user
        DB_PASSWORD=<password for db-user>
        DB_HOST=db
        DB_PORT=5432
        ```

1. Start the application using `nodemon`:

    ```bash
    npx nodemon app.js
    ```

### Add JS Linter and code formatting

- For VS add linters like `quick-lint-js` or `esLint`

    - Install `quick-lint-js` in VS Code : [https://quick-lint-js.com/install/vscode/](https://quick-lint-js.com/install/vscode/)

    - Install `EsLint` in VS Code : [https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

- Install `prettier` for code formatting:

    Install `prettier` in VS Code : [https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode).

    You can find more about `prettier` [here](https://www.digitalocean.com/community/tutorials/how-to-format-code-with-prettier-in-visual-studio-code).


### Development Workflow

1. Create a new branch for each feature or bugfix, for eg. `feature/login` or `bugfix/invalid_login`
1. Add changes to your new branch
1. Write tests for new functionality
1. Test your changes or functionality before committing
1. Add and Commit your changes
1. Switch to your parent branch and do `git pull` and `git fetch`
1. Switch to your working branch and do `git rebase main`
1. Resolve conflicts if present
1. Push the branch and submit pull requests for review
