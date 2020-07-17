import { validationResponse } from '../middlewares/validator';
import { bodyValidation, queryValidation } from './validations';

export const refreshTokenValidator = [
    bodyValidation.token,
    bodyValidation.refresh_token,
    validationResponse
];