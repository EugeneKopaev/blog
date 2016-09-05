# Simple Blog Application

This app demonstrates usage of Meteor + React 

### Functionality 

User can create/update/remove post, view posts of other users and comment them  

### Running the app

Run this from root directory
```bash
npm install
meteor
```

### Running tests
```bash
npm install
meteor test --driver-package practicalmeteor:mocha
```
You can view test results on http://localhost:3000

### Startup
In /startup/server/fixtures.js you can find sample data.
Two test users will be created:
* username: Bob, password: 123456
* username: John, password: 123456
