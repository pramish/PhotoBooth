const { createServer } = require("http");
const PORT = process.env.PORT || 5000;

const app = require("./server");

const server = createServer(app);

server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
