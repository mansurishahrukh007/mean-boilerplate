import { body, query, header } from 'express-validator/check';

export const bodyValidation = {
    token: header('token', 'Must be string, Can not empty.').isString(),

    refresh_token: header('refresh_token', 'Must be string, Can not empty.').isString(),
};

export const queryValidation = {
    category_id: query('category_id', 'Must be integer, Can not empty.').isInt(),

    order_by: query('order_by', 'Must be string, Can not empty.').isString(),
};