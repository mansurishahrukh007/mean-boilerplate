import jwt from 'jsonwebtoken';
import { jwtSecret, jwtExpirationMinutes } from '../config/common';
import { getTimestamp } from './datetime';
import { getResponse } from './response';
import { ResponseMessages } from '../constants/response-messages';
import httpStatus from 'http-status';

// generate new token with required data
export function generateToken(tokenObj: any) {
    return jwt.sign(tokenObj, jwtSecret, { expiresIn: Number(jwtExpirationMinutes) * 60 });
}

// verify whether provided token is formatted correct jwt
export function verifyToken(token: string) {
    try {
        const ret = {
            isError: false,
            payload: jwt.verify(token, jwtSecret)
        };
        return ret;
    } catch (error) {
        return {
            isError: true,
            errMsg: error.message
        };
    }
}

export function generateRefreshToken(email: string) {
    return jwt.sign({ email: email, timeStamp: getTimestamp() }, jwtSecret);
}

export function generateRefreshTokenNotRegister(device_id: string) {
    return jwt.sign({ device_id: device_id, timeStamp: getTimestamp() }, jwtSecret);
}

// decode encrypted token for verification
export function decodeToken(token: string) {
    return jwt.decode(token);
}

export const validateToken = (req: any, res: any, next: any) => {
    try {
        req['user_data'] = jwt.verify(req.headers.authorization.split(' ')[1], jwtSecret);

        console.log('User', req['user_data']);
        next();
    } catch (err) {
        const response = getResponse(httpStatus.UNAUTHORIZED, null, ResponseMessages.TokenInvalid);
        res.status(response.status).send(response);
    }
};
