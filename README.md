# Facerecognition AI as a Service Web App - FrontEnd

 - - - -
 
This is the FrontEnd Repository, developed in [React.js](https://reactjs.org/) and using the [Tachyons NPM](https://www.npmjs.com/package/tachyons) to ease and quicken the CSS Styling part.

The FrontEnd part of the app consist on a modularly structured architecture, organized in components and containers minimizing repetition of code and maximizing reusability.
The organization allows to have a more efficient identification of eventual bugs or problems due to the fact that every component is self-contained.

The FrontEnd has a Login and Register form which checks/register the user credentials on a remotely deployed PostgreSQL database on Heroku.
The database is linked to the BackEnd which is also deployed on Heroku.

Once Signed In, the user will have access to a basic panel which  will display an input field for an image url to analize, a display of the number of queries already executed by the user of the Restful AI API. In this project I've used [Clarifai](https://www.clarifai.com/).

The user inserts the image address and executes the query, the FrontEnd then loads the submitted image URL on the app, an once the BackEnd responds with the results of the AI identifying the location of the face (using coordinates to locate a rectangle), the FrontEnd then will take these coordinates and Draw on the image a square highlighting the face area.

The BackEnd has been developed using [Node.js](https://nodejs.org/en/), [Express.js](https://expressjs.com/) and using [Body Parser](https://www.npmjs.com/package/body-parser), [Bcrypt](https://www.npmjs.com/package/bcrypt-nodejs) and [Knex](http://knexjs.org/) as NPMs.

 - - - -
 
![Preview](https://user-images.githubusercontent.com/18377423/119144371-e22ddc00-ba48-11eb-9f87-c3db76a6f07f.JPG)
 

