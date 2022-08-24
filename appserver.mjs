import { Express } from "express"
import cors from "cors"
import mongoose from "mongoose";
import { stringToHash, varifyHash, } from "bcrypt-inzi"

const app = express();
app.use(express.json());
app.use(cors());