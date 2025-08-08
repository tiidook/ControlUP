import { ApiError, ErrorCode } from "../errors/api.error.js";

export default function (err, req, res, next) {
    if (err instanceof ApiError) {
        res.status(err.code).json({ message: err.message });
        return
    }

    res.sendStatus(ErrorCode.INTERNAL_ERROR)
}