import devLogger from "./devLogger";
import ILoger from "./loggerInterface";
import prodLogger from "./prodLogger";

export default function createLogger(): ILoger {
    if (process.env.NODE_ENV === "PROD") {
        return new prodLogger();
    } else {
        return new devLogger();
    }
}
