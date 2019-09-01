import { createServer } from "http";
const PORT = process.env.PORT || 3000;

import server from "./createServer";

const app = createServer(server);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
