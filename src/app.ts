import express from "express";
import cookieParser from "cookie-parser";
import passport from "passport";
import session from "express-session";
import cors from "cors";
import connectDB from "./config/config";
import { userModel } from "./model/model";
import UserController from "./controller/userController";
import UserRoutes from "./routes/userRoutes";
import authenticateJWT from "./middleware/authMiddleware";

require("dotenv").config();
require("./passport");

connectDB();

const app: express.Application = express();
const PORT: number | string = (process.env.PORT as string) || 3030;

const userController: UserController = new UserController(userModel);
const userRoutes: express.Router = new UserRoutes(
  userController,
  authenticateJWT
).routes();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL as string,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/users", userRoutes);
app.use("auth", authRoutes);

app.listen(PORT, () => {
  console.log(`app is listening at port ${PORT}`);
});
function cookieSession(arg0: { name: string; keys: string[] }): any {
  throw new Error("Function not implemented.");
}
app.use(cookieSession({ name: "session", keys: ["waltz"] }));