# Readable API Server

This is a content and comment web app. Users will be able to post content to predefined categories, comment on their posts and other users' posts, and vote on posts and comments. Users will also be able to edit and delete posts and comments.


## Start the App

To get started first start the server and then start the app:

* Install and start the API server (get the code from the repo link given below in the API server section)
    - `cd api-server`
    - `npm install`
    - `node server`

* Install and start the readable app by running these commands in another terminal window:
    - `npm install`
    - `npm start`

Note: in case you start the app before the server make sure to clear the local storage.

## API Server

This repository includes the code for the backend API Server to be used to interact with the front-end portion of the project - [here](https://github.com/udacity/reactnd-project-readable-starter).

### API server config
The `/src/services/utils/config.json` file contains the default configuration for the API server to operate:
Change as needed.

```
{
    "baseUrl": "http://localhost:3001",
    "auth": "whatever-you-want"
  }

```

## Development Approach
I adopted Redux recommended best practice using @reduxjs/toolkit and used redux-persist to persist the store in local storage.
Finally, I used Bulma for quick and neat styling.





