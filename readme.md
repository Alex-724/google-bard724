# Google Bard724

## Description

Google Bard724 is an npm package that provides an Axios API wrapper for making HTTP requests to the Bard API. It simplifies the process of interacting with the API by encapsulating the necessary logic in a reusable class.

## Installation

To use this package in your project, you need to have Axios installed. You can install both packages using npm:

```
npm install google-bard724
```

## Usage

To use the API wrapper, import it into your JavaScript file:

```javascript
const Api = require('google-bard724');

// Create an instance of the API wrapper
const bardcookie = 'your-bard-cookie';
const api = new Api(bardcookie);

// Make an API request
async function askQuestion(question) {
    try {
        const response = await api.ask(question);
        console.log(response);
    } catch (error) {
        console.error(error);
    }
}

askQuestion('What is the meaning of life?');
```

Replace `'your-bard-cookie'` with your actual Bard API cookie. If no cookie is provided or if it is invalid, an error will be thrown.

The `ask` method sends a GET request to the Bard API with the specified question and bardcookie. It returns a Promise that resolves to the response data from the API.

## Error Handling

If the Bard API returns an error, it will be propagated as an exception. Make sure to handle errors appropriately in your code.

## Repository

The source code for this package is hosted on [GitHub](https://github.com/Alex-724/google-bard724). You can submit bug reports or contribute to the project on the [issues page](https://github.com/Alex-724/google-bard724/issues).

## License

This package is licensed under the ISC License.