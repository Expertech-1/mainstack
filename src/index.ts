// external dependencies
import express, { Application, Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  standardHeaders: true,
  legacyHeaders: false,
});

// module dependencies
import connectDb from "./config/dbconfig";
import __404_err_page from "./middlewares/notFound.middleware";
import { getWhitelist } from "./utils/whitelist.utils";
import authorizeUser from './middlewares/auth.middleware';


// <======= Routes Imports begins here ==========>
import userRoute from "./routes/auth.route"
import productRoute from "./routes/product.route"

dotenv.config();
const app: Application = express();
const env = process.env.NODE_ENV || 'development';
const whitelist = getWhitelist(env);

const corsOptions = {
  origin: (origin: string | undefined, callback: (err: any, allow?: boolean) => void) => {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"), false);
    }
  },
};



// Middleware functions
app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/v1/users", userRoute)
app.use("/api/v1/products", authorizeUser, productRoute)



app.get("/", (req: Request, res: Response) => {
  res.status(201).json({ message: "Welcome to the Mainstack Rest API application." });
});
app.use("*", __404_err_page);

const Port = process.env.PORT || 3004;
const startServer = async () => {
  try {
    await connectDb(process.env.MONGO_URI_ATLAS!);
    app.listen(Port, () =>
      console.log(`Server listening on http:\//localhost:${Port}`)
    );
  } catch (err: Error | any) {
    console.log(err.message);
    process.exit(1);
  }
};
startServer();
