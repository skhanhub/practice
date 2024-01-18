import { startServer } from "./server";
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || "3001";

startServer(PORT);