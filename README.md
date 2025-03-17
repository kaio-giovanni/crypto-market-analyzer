# Crypto Stock Market

This is a React project that gets cryptocurrency prices from multiple exchanges and shows the data for further processing.

## Dependencies

- Yarn or Npm

## Guides

- [Tailwind with React and Vite](https://tailwindcss.com/docs/guides/vite)
- [Material Tailwind with React and Vite](https://www.material-tailwind.com/docs/html/guide/react-vite)

## Setup

- Run the command to install the dependencies:

```bash
yarn install
```

## Run the project

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## Build the app

In the project directory, you can run:

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Code formatting and Lint

Make sure you have installed the Prettier and ESLINT extension for vscode.

- Type the shortcut Ctrl + Shift + P and look for Preferences: Open settings (JSON)

The JSON must have the following lines

```json
{
  //...
  "eslint.autoFixOnSave": true,
  "editor.codeActionsOnSave": { "source.fixAll.eslint": true },
  "eslint.validate": [
    {
      "language": "javascript",
      "autoFix": true
    },
    {
      "language": "javascriptreact",
      "autoFix": true
    },
    {
      "language": "typescript",
      "autoFix": true
    },
    {
      "language": "typescriptreact",
      "autoFix": true
    }
  ],
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```


## Binance API Documentations

[All market tickers stream](https://github.com/binance/binance-spot-api-docs/blob/master/web-socket-streams.md#all-market-tickers-stream)

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)
