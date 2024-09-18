"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// external dependencies
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
});
// module dependencies
const dbconfig_1 = __importDefault(require("./config/dbconfig"));
const notFound_middleware_1 = __importDefault(require("./middlewares/notFound.middleware"));
const whitelist_utils_1 = require("./utils/whitelist.utils");
const auth_middleware_1 = __importDefault(require("./middlewares/auth.middleware"));
// <======= Routes Imports begins here ==========>
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const product_route_1 = __importDefault(require("./routes/product.route"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const env = process.env.NODE_ENV || 'development';
const whitelist = (0, whitelist_utils_1.getWhitelist)(env);
const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"), false);
        }
    },
};
// Middleware functions
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.urlencoded({ extended: false }));
// Routes
app.use("/api/v1/users", auth_route_1.default);
app.use("/api/v1/products", auth_middleware_1.default, product_route_1.default);
app.get("/", (req, res) => {
    res.status(201).json({ message: "Welcome to the Mainstack Rest API application." });
});
app.use("*", notFound_middleware_1.default);
const Port = process.env.PORT || 3004;
const startServer = async () => {
    try {
        await (0, dbconfig_1.default)(process.env.MONGO_URI_ATLAS);
        app.listen(Port, () => console.log(`Server listening on http:\//localhost:${Port}`));
    }
    catch (err) {
        console.log(err.message);
        process.exit(1);
    }
};
startServer();
