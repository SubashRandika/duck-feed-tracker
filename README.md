# Duck Feed Tracker MERN Application (MongoDB, Express, ReactJS, NodeJS)

## Live Demo Application

[Duck Feed Tracker](https://duckfeedtracker.herokuapp.com/)

## Preview

![Alt text](DuckFeedTracker.png?raw=true 'DuckFeed Landing Page')

## Requirement

A scientist is trying to understand how ducks are being fed in parks around the world. She wants
to collect the following information

- What time the ducks are fed
- What food the ducks are fed
- Where the ducks are fed
- How many ducks are fed
- What kind of food the ducks are fed
- How much food the ducks are fed
- Nice to have: the ability for a little old lady who feeds - the ducks every day in the same
  way to set a repeating schedule so she doesn’t have to use the application every day.

The scientist would like to crowdsource this information by creating a web application where
people can submit these data points. The scientist would like to be able to do reporting on the
data for her PhD thesis.

## Approach to the problem

### Backend

- REST API routes for user reregistration and signin.
- Two authorized roles allowed for system user(Feed submission user) and analyzer(Scientist who can preview and access all data) roles.
- All the Feed Create/Read/Update/Delete operations related API routes.
- All the Feed Schedules Create/Read/Update/Delete operations related API routes.
- Any user can Create/Update/Delete food categories and also fetch all categories via seperate API routes.
- Any any user can schedule their feed to avoid repeated data submission.
- More control over the schedule jobs for pause and resume.

### Frontend

- Landing page with signin and signup pages.
- Once user authenticated (via JWT token) can access to his home page to view, create, update, delete only his/her feeds and schedule jobs.
- JWT token will expire in 2 hrs and user will automatically logout when expiration reached. Even user can manually logout.
- User can pause or resume their schedule jobs as well.
- When creating feed user will populate google map, to give location address and coordinates(long/lat) to locate his/her feeding location rather typing it manually.
- Any user can create/update/delete food categories front UI.

## Selected Technology Stack

- ### React/Redux/Thunk/React Router

  Can create better preferment front-end application quickly. Very light weight production bundle as well. Redux for centralized data store management. Thunk to achieve it in async way. React Router for routing of multiple pages with React.

- ### Node/Express/Mongoose/Joi/Passport/JWT/Log4js

  Can quickly create and up and running REST API with node js and express framework. Mongoose is better module connect with MongoDB and work with NoSQL database. Passport and JWT authentication module works perfectly for JWT token based authorization model. Also later we can introduce Google, Facebook like oauth2 authorization models as well. Log4js for much better production level debug logging for troubleshooting the system issues.

- ### Antd/dayjs/axios/jwt-decode

  Antd available much more flexible and customizable in build React components. That help to build a UI very quickly. dayjs is super tiny date time format library when compares to moment.js. axios is most popular and offered much features with promised based HTTP client for browser calls. jwt-decode for authenticated user details extraction.

  ## Application Component Diagram

  ![Alt text](diagrams/ComponentDiagram.png?raw=true 'DuckFeed DB Model')

  ## MongoDB Models Diagram

  ![Alt text](diagrams/DuckFeedDB.png?raw=true 'DuckFeed DB Model')

  ## Rough Hours Spent on

  ### Backend Part - 12 hrs

  ### Frontend Part - 8 hrs
