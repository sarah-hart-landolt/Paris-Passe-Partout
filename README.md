# Paris-Passe-Partout : Full Stack (React, C#)

Paris-Passe-Partout is a social media, travel web app, created for lovers of Paris to curate and keep track of their favorite places in the city while also following and saving others' recommendations and itineraries. It's a vetted, curated Google Maps, travel guide blog, Pinterest and Instagram in one.

![](./ParisPassePartoutDesktop.png)


## Watch demo of website by clicking below: 
[![Everything Is AWESOME](./youtube.png)](https://www.youtube.com/watch?v=pA0SUzmEJO0&feature=youtu.be "ParisPassePartout")

## Technologies

Paris-Passe-Partout is built in .NET Core with C#. Entity Framework and ADO.NET Core are utilized for communicating with the SQL Server database.
The front-end is built using React and Bootstrap 4/Reactstrap/ MDB.
Google Places Autocomplete API is used for pulling data for each pin in Paris, Mapbox for rendering the map of Paris, Google Firebase for user authentication.

## Requirements

- node.js
- npm
- SQL Server
- Google Firebase
- Google Places Autocomplete 
- Mapbox 

## Installation

### Initial Set-up
1. Clone this repo onto your machine
2. You will need to create a new [Google Firebase](https://firebase.google.com/) project to set up the authentication
3. Once you have created your Firebase project, go to the project settings and take note of the Project ID and the API Key.
4. Open the appsettings.json file and replace the FirebaseProjectId value with your own.
5. In the client directory of Paris-Passe-Partout, create a .env.local file based on the .env.local.example file and replace the value with your Firebase project API Key.
6. You will also need to set up a new [Google Autcomplete Places API key](https://developers.google.com/places/web-service/autocomplete). Copy the API key and put it also in the .env.local file as "REACT_APP_API_ADDRESS".
7. Lastly, you will need to create a [MapBox account and create your own Mapbox API key](https://www.mapbox.com/). Once created, copy that API key and put in the .env.local file as "REACT_APP_MAPBOX_TOKEN"

### Setting up the DB
1. Connect to your SQL Server
2. There are two files in the SQL directory. Run 01_ParisPassePartout_Create_DB.sql to create all the neccessary tables.
3. The second file, 02_Seed_Data.sql sets up the category and some data already stored for user types. You will need to run the category seed data, but the user data is optional. If you want to create your project without any initial users do not run the SQL commands after the category table.

### Setting up the users (only do this if you are using the user and post seed data)
On your Google Firebase project, click on the Authentication link. You will need to add users that have e-mail addresses that matches the ones in the database. Make sure that you have e-mail verification set to OFF before you add the seed users. Once you've added the users, replace their Firebase UID's in the SQL file with the ones matching your newly created Firebase Users. Then you can run the SQL file.

### Install missing dependencies
1. Navigate to the client folder in your terminal
2. run `npm install` to install any missing packages

## Running the App

1. Start your server. This can be done through Visual Studio. When running through Visual Studio do not use the IIS option!
2. Navigate to the client folder.
3. Type the command `npm start`

