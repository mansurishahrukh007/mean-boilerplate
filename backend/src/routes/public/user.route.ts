import { Router, Request, Response } from 'express';
// import {
//     changePasswordValidator,
//     updateUserValidator,
//     logoutValidator,
//     getUserHomeValidator,
// } from '../../../validations/user.validator';
import UserController from '../../controllers/user.controller';
// import NotificationController from '../../../controllers/common/notification.controller';

const user = (router: Router) => {
    router.post(
        '/register-user',
        async (req: Request, res: Response) => {
            const userCtrl = new UserController();
            const response = await userCtrl.register(req.body);
            return res.status(response.status).send(response);
        }
    );

    router.post(
        '/login-user',
        async (req: Request, res: Response) => {
            const userCtrl = new UserController();
            const response = await userCtrl.login(req.body);
            return res.status(response.status).send(response);
        }
    );

    //     router.post(
    //         '/user',
    //         updateUserValidator,
    //         async (req: Request, res: Response) => {
    //             const user_data = req['user_data'];
    //             req.body.user_id = user_data.id;
    //             const userCtrl = new UserController();
    //             const response = await userCtrl.updateUser(req.body);
    //             return res.status(response.status).send(response);
    //         }
    //     );
};

export default user;