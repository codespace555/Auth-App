# Auth-App
An authentication app is a software application that adds an extra layer of security to online accounts. It generates unique verification codes that users must enter along with their username and password during the login process. 
## Backend Dependencies
**bcrypt:** A library used for hashing passwords securely.

**cookie-parser:** Middleware for parsing cookies in Node.js.

**cors:** Middleware that enables Cross-Origin Resource Sharing (CORS) in Express.

**deep email validator:** A library for validating email addresses.

**dotenv:** Loads environment variables from a .env file.

**express:** A web application framework for Node.js.

**jsonwebtoken:** A library for generating and verifying JSON Web Tokens (JWT).

**mongoose:** An Object Data Modeling (ODM) library for MongoDB and Node.js.

**Nodejs:** The core JavaScript runtime used for building server-side applications.

**nodemon:** A development tool automatically restarts the Node.js server when file changes are detected.



## Frontend Dependencies
**HTML::**  The standard markup language for creating web pages.

**Tailwind CSS:** A utility-first CSS framework for designing responsive and customizable UI components.

**Javascript:** The programming language used for client-side scripting.





## Getting Started
To run the authentication app locally, follow these steps:

**Clone the repository:** git clone <repository-url>

**Navigate to the project directory:** cd authentication-app

**Install backend dependencies:** npm install

**Create a .env** file in the project root and configure environment variables.

**Start the backend server:** npm run dev

**In a separate terminal,** start the server:  npm start

Access the application at http://localhost:3000.


## Configuration
The app utilizes environment variables for configuration. Create a .env file in the project root and add the following variables:
```
# Server Configuration
PORT=3001
MONGODB_URI=mongodb://localhost:27017/authentication
SECRET_KEY=mysecretkey

# Client Configuration
CLIENT_URL=http://localhost:3001/api
```
Modify the values according to your specific setup.

## Usage
The authentication app provides routes for user registration, signup, signin, and logout routes that require authentication. 

**Feel free to explore and customise the codebase according to your specific requirements.**

## Contributions
Contributions to the authentication app are welcome. If you encounter any issues or have suggestions for improvements, please create an issue or submit a pull request.

## Acknowledgments
This authentication app was developed using various open-source libraries and frameworks. Special thanks to the authors and contributors of those projects.

For more information, refer to the documentation of each library and framework used in this application.
