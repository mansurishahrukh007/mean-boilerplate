import { Router, Request, Response } from 'express';
// import {
//     changePasswordValidator,
//     updateUserValidator,
//     logoutValidator,
//     getUserHomeValidator,
// } from '../../../validations/user.validator';
// import UserController from '../../../controllers/user/user.controller';
// import NotificationController from '../../../controllers/common/notification.controller';

const user = (router: Router) => {
    //     router.post(
    //         '/user/change-password',
    //         changePasswordValidator,
    //         async (req: Request, res: Response) => {
    //             const user_data = req['user_data'];
    //             console.log('[change-password route]', user_data);

    //             const adminController = new UserController();
    //             const response = await adminController.changePassword(user_data.email, req.body);
    //             return res.status(response.status).send(response);
    //         }
    //     );

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