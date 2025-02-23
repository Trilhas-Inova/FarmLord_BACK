import { NextFunction, Request, Response } from "express";
import UserService from "../services/user.service";

class UserController {
    private service = new UserService;

    async get(req: Request, res: Response, next: NextFunction) {
        try {
            const { status, message } = await this.service.get();
            res.status(status).json(message);
        } catch (error) {
            next(error);
        }
    }
    async getOne(req: Request, res: Response, next: NextFunction) {
        try {
            const { status, message } = await this.service.getOne(req.params.id);
            res.status(status).json(message);
        } catch (error) {
            next(error);
        }
    }




    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { status, message } = await this.service.login(req.body);
            res.status(status).json(message);
        } catch (error) {
            next(error);
        }
    }
    async register(req: Request, res: Response, next: NextFunction) {
        try {
            const { status, message } = await this.service.register(req.body);
            res.status(status).json(message);
        } catch (error) {
            next(error);
        }
    }

}

export default UserController;