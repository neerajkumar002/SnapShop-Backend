import "dotenv/config";
import connectDB from "./src/db/index.js";
import app from "./src/app.js";

const port = Number(process.env.PORT) || 8000;

connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.log("ERROR:", error);
      throw error;
    });

    //listen the app
    app.listen(port, () => {
      console.log(`Server is running at port: ${port}`);
    });
  })
  .catch((error) => {
    console.log(`Mongodb connection failed !!!`, error);
  });
