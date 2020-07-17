export enum ResponseMessages {
    ServerError = 'We can not process your request at the moment, sorry for inconvenience.',
    LoginSuccess = 'Login successfully.',
    TokenExpired = 'Your Token has been Expired. Please Generate New Token.',
    RefreshExpiredToken = 'Refresh Token Expired.',
    TokenInvalid = 'Token Invalid.',
    RefreshTokenInvalid = 'Token Data is invalid.',
    UserExist = 'User already exist.',
    UserRegisterSuccess = 'User registration complete.',
    UserNotExist = 'User not exit.',
    InvalidCredentials = 'Invalid Credentials.',
}
