"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = express_1.default();
// app.use(cors({ origin: ["http://127.0.0.1:4200"], credentials: true }));
app.use(express_1.default.json());
app.use("/api", require("./api"));
var PORT = process.env.PORT || 3000;
app.listen(PORT, function () { return console.log("App listening on http://localhost:" + PORT + "/api/v0"); });
