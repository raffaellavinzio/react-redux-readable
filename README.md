# Readable API Server

This is a content and comment web app. Users will be able to post content to predefined categories, comment on their posts and other users' posts, and vote on posts and comments. Users will also be able to edit and delete posts and comments.


## Start the App

To get started create 2 folders, api-server and frontend:

* Install and start the API server (see below for the repo link)
    - `cd api-server`
    - `npm install`
    - `node server`
* In another terminal window, setup the front-end using the code in this repo:
    - `cd frontend`
    - `npm install`
    - `npm start`

## API Server

This repository includes the code for the backend API Server to be used to interact with the front-end portion of the project - [here](https://github.com/udacity/reactnd-project-readable-starter).

## Development Approach
I adopted Redux recommended best practice using @reduxjs/toolkit and used redux-persist to persist the store in local storage.
Finally, I used Bulma for quick and neat styling.





