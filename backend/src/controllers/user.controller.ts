import httpStatus from 'http-status';
import { getErrorResponse, getResponse } from '../utilities/response';
import { ResponseMessages } from '../constants/response-messages';
import { generateSaltString, encryptPassword, checkPassword, } from '../utilities/cryptography';
import { getTimestamp } from '../utilities/datetime';
import { generateToken, generateRefreshToken } from '../utilities/token';
import User from '../models/user.model';

export default class UserController {

    register = async (user: any): Promise<any> => {

        try {
            const existUser = await User.findOne({ email: user.email });
            console.log('[ExistUser register]', existUser);

            if (existUser) {
                return getResponse(
                    httpStatus.CONFLICT,
                    null,
                    ResponseMessages.UserExist
                );
            } else {
                user.salt = generateSaltString();
                user.password = encryptPassword(user.salt, user.password);
                const dbResponse = await User.create(user);
                const returnUser = dbResponse.toJSON();
                delete returnUser.salt;
                delete returnUser.password;
                delete returnUser.__v;
                console.log('DB response: ', dbResponse);

                if (dbResponse) {
                    return getResponse(
                        httpStatus.OK,
                        { user: returnUser },
                        ResponseMessages.UserRegisterSuccess
                    );
                } else {
                    return getErrorResponse(
                        httpStatus.INTERNAL_SERVER_ERROR,
                        ResponseMessages.ServerError
                    );
                }
            }
        } catch (error) {
            return getErrorResponse(
                httpStatus.INTERNAL_SERVER_ERROR,
                ResponseMessages.ServerError
            );
        }
    };

    login = async (user: any): Promise<any> => {
        try {
            const existUser = await User.findOne({ email: user.email });

            if (existUser) {

                if (checkPassword(user.password, existUser.toJSON().salt, existUser.toJSON().password)) {
                    console.log('inside check password');
                    const tokenObj = {
                        id: existUser.id,
                        email: existUser.toJSON().email,
                        phone: existUser.toJSON().phone,
                        device_id: user.device_id
                    };

                    const userObj: any = existUser;
                    userObj.last_access = getTimestamp();
                    delete userObj.password;
                    delete userObj.salt;
                    delete userObj.__v;

                    const tokenResponse = {
                        token: generateToken(tokenObj),
                        refresh_token: generateRefreshToken(tokenObj.email),
                        user: userObj
                    };
                    return getResponse(
                        httpStatus.OK,
                        tokenResponse,
                        ResponseMessages.LoginSuccess
                    );
                } else {
                    return getResponse(
                        httpStatus.EXPECTATION_FAILED,
                        null,
                        ResponseMessages.InvalidCredentials,
                    );
                }

            } else {

                return getResponse(
                    httpStatus.NOT_FOUND,
                    null,
                    ResponseMessages.UserNotExist,
                );

            }
        } catch (error) {
            return getErrorResponse(
                httpStatus.INTERNAL_SERVER_ERROR,
                ResponseMessages.ServerError
            );
        }
    };

    // refreshToken = async (token: Token): Promise<any> => {
    //     const userRepository = new UserRepository();
    //     try {
    //         const refreshTokenData: any = decodeToken(token.refresh_token);
    //         const tokenData: any = decodeToken(token.token);
    //         console.log('[refreshToken]', refreshTokenData);
    //         console.log('[token]', tokenData);

    //         if (refreshTokenData && tokenData && refreshTokenData.email === tokenData.email) {
    //             const existUser: User = await userRepository.getUserByEmail(refreshTokenData.email);

    //             if (existUser.status !== EnumUserStatus.Active) {
    //                 return getResponse(
    //                     httpStatus.FORBIDDEN,
    //                     null,
    //                     ResponseMessages.Admin_Not_Active,
    //                 );
    //             }

    //             const tokenObj = {
    //                 id: existUser.id,
    //                 email: existUser.email,
    //                 phone: existUser.phone,
    //                 device_id: refreshTokenData.device_id
    //             };
    //             const userObj: any = existUser;
    //             userObj.base_path = images_base_path;
    //             userObj.last_access = getTimestamp();
    //             delete userObj.password;
    //             delete userObj.salt;

    //             const tokenResponse: Token = {
    //                 token: generateToken(tokenObj),
    //                 refresh_token: generateRefreshToken(tokenObj.email),
    //                 user: userObj
    //             };
    //             return getResponse(
    //                 httpStatus.OK,
    //                 tokenResponse,
    //                 ResponseMessages.LoginSuccess
    //             );

    //         } else {
    //             return getResponse(
    //                 httpStatus.EXPECTATION_FAILED,
    //                 null,
    //                 ResponseMessages.RefreshTokenInvalid,
    //             );
    //         }

    //     } catch (error) {
    //         return getErrorResponse(
    //             httpStatus.INTERNAL_SERVER_ERROR,
    //             ResponseMessages.ServerError
    //         );
    //     }
    // };
}