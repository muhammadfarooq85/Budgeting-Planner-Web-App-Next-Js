// Local Imports
import app from "./src/app/app.js";
import { PORT } from "./secrets/secrets.js";

app.get("/", (req, res) => {
  res.send({
    msg: "Hello From the server!",
    status: 200,
    data: null,
    success: true,
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running at PORT:- http://localhost:${PORT}`);
});
