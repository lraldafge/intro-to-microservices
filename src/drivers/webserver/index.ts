import express from "express";
import morgan from "morgan";
import cors from "cors";
import config from "../../config";
import router from "./routers";

const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use("/users", router);

export const start = () => {
    app.listen(config.port, () => {
        console.log(`[Express] Listening on port ${config.port}`);
    })
}
