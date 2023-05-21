# Stacker

Stacker is a web application that fetches a list of Stack Overflow users and allows you to display, follow, and block them. It is built using React and Redux with TypeScript.

## Tools Used

- React: A JavaScript library for building user interfaces.

- Redux: A predictable state container for managing application state.

- React Redux: Official React bindings for Redux.

- React Router: A routing library for React applications.

- TypeScript: A typed superset of JavaScript that compiles to plain JavaScript.

- Redux Toolkit: The official Redux toolkit package to simplify Redux development.

- Jest: A JavaScript testing framework.

- Testing Library: A set of utilities for testing React components.

- ESLint: A pluggable and configurable linter tool for identifying and reporting on patterns in JavaScript.

- Prettier: An opinionated code formatter.

- Create React App: A tool to create React applications with no build configuration.

## Getting Started

To set up the project, follow these steps:

1\. Clone the repository:

   ```

   git clone https://github.com/your-username/stacker.git

   ```

2\. Navigate to the project directory:

   ```

   cd stacker

   ```

3\. Install the dependencies:

   ```

   npm install

   ```

4\. Start the development server:

   ```

   npm start

   ```

   The application will be running at `http://localhost:3000`.

## Available Scripts

In the project directory, you can run the following scripts:

- `npm start`: Starts the development server.

- `npm run build`: Builds the app for production.

- `npm test`: Runs the tests.

- `npm run eject`: Ejects the Create React App configuration.

- `npm run lint`: Lints the code using ESLint.

- `npm run fix`: Fixes linting issues automatically.

## Folder Structure

The project structure is organized as follows:

```

stacker/

  README.md

  node_modules/

  package.json

  public/

    index.html

    favicon.ico

    ...

  src/

    components/

      ...

    hooks/

      ...

    pages/

      ...

    store/

      actions/

        auth-actions.ts

        ...

      reducers/

        auth-reducer.ts

        ...

      store.ts

    theme/

      ...

    App.tsx

    index.tsx

    ...

  .eslintignore

  .eslintrc.json

  .gitignore

  package-lock.json

  tsconfig.json

```

The main code files are located in the `src` directory. The `components` directory contains reusable UI components, the `hooks` directory contains custom hooks, the `pages` directory contains page components, and the `store` directory contains Redux actions, reducers, and the store configuration.

## Contributing

Contributions to Stacker are welcome! If you encounter any issues or have suggestions for improvements, please open an issue on the GitHub repository.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
