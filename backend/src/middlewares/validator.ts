import { validationResult } from 'express-validator/check';
import httpStatus from "http-status";
import { getResponse } from 'src/utilities/response';

export function validationResponse(req: any, res: any, next?: any) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {

        const response = getResponse(httpStatus.BAD_REQUEST, errors.array(), 'Validation Error(s)');
        res.status(response.status).send(response);
        return;
    }
    next();
}


