const { createServer } = require('http');
const PORT = process.env.PORT || 5000; //having the defualt port number when deploying into tbe cloud or using 5000 on the local machine

const app = require('./server'); //using server that we imported from server.js file to run the server below.

const server = createServer(app); //creating the server

server.listen(PORT, () => console.log(`Server listening on port ${PORT}`)); //printing out the result so that we can know that server is runnin while running our application
