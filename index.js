const { createServer } = require("http");
//having the defualt port number when deploying into tbe cloud or using 5000 on the local machine
const PORT = process.env.PORT || 5000;

//using server that we imported from server.js file to run the server below.
const app = require("./server");
//creating the server
const server = createServer(app);
//printing out the result so that we can know that server is runnin while running our application
server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
