# Belgrade Times


Belgrade Time is NewsLetter platform made with the intention to provide up to date news and help journalist to easily maintain and writte their articles.

Live version is yet to be deployed. Project is still in development .

Frontend code is [here](https://github.com/Bojan987/Newsletter/tree/main/novinski-portal)

Backend code is [here](https://github.com/Bojan987/Newsletter/tree/main/novinski-portal-api)


## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Credits](#credits)
- [Contributors](#contributors)

## Features

Unregistered user :
- View Home Page 
- View all News for selected category
- View selected News
- Search for specific news by its title or tag 
- View Journalist profile
- Contact us
- View About Us page

Registered user :
(in addition to unregisted user)
- View User profile (user details,bookmarks,comments)
- Edit profile
  - Upload / Remove Image
  - Change email
  - Change phone
  - Change description
  - Change password
  - Change prefrences
  - Edit / Add /Delete Social Networks
  - Disable / Delete account
- Comment / Bookmark selected news
- Admin pannel: 
  - Statistcs (User statistcs, Category statistics, Post statistics, Comments statistics)
  - Users ( View / Edit / Deactivate all users)
  - Categories (View / Edit / Delete / Create categories)
  - Layouts ( Edit / Delete / Create new layouts )
  - Posts ( Edit / Delete / Create new posts )


Application has:
- Home page - You can view all the available news.
- Category page - View all news for selected category
- Single News page - Read the selected news
- Search page - view all news for search criteria
- Public profile - view journalist profile
- Login page 
- Register page
- Forgot Password
- My profile page - view your profile
- Settings page - edit your profile
- Admin page - Pannel for admin user

## Technologies

- react ^17.0.2
- react-router-dom ^5.2.0
- material-ui ^4.11.4
- axios ^0.21.1
- formik ^2.2.6
- yup ^0.32.9
- moment ^2.29.1
- react-dragable ^4.4.3
- react-intl ^5.17.5
- react-quill ^1.3.5
- styled-components ^5.3.0

## Installation

Previously required the installation of NodeJS (v12.14.0 or newer).

- Clone git repository
- Run "npm install" command in NodeJS


Starting the project

- Run "npm start" command in NodeJS

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Backend
- Clone git repository
- Create .env file and copy code from env.example
- Run "npm install" command in NodeJS
- Run "npm run dev" command in NodeJS



