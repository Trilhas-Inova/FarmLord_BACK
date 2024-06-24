import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt'

import { sign } from "../jwt/jwt";
import { resp } from "../utils/resp";
import { IUser } from "../interfaces/IUser";
import { userBodySchema } from './validations/schema'

class UserService {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    };

    async get() {
        const users = await this.prisma.user.findMany({
            select: {
                fullname: true,
                email: true,
                username: true,
                birthday: true,
            },
        });

        return resp(200, users);
    };

    async login(body: { email: string, password: string }) {

        const user = await this.prisma.user.findUnique({ where: { email: body.email } });
        if (!user) return resp(404, 'not found');

        const checkPassword = await bcrypt.compare(body.password, user.password);

        if (!checkPassword) return resp(403, 'password invalid.');

        const { id, email } = user;

        const token = sign({ id, email });
        return resp(200, { id, email, token });

    };


    async register(body: IUser) {

        const bodyParse = userBodySchema.safeParse(body)

        if (!bodyParse.success) {
            return resp(400, { message: bodyParse.error.message })
        }

        const { fullname, username, email, password } = body;

        const user = await this.prisma.user.findUnique({ where: { email: email } })
        if (user) return resp(400, 'email is already register');


        const userName = await this.prisma.user.findUnique({ where: { username: username } })
        if (userName) return resp(400, 'username is already register');


        const hashPassword = await bcrypt.hash(password, 10);

        const createdUser = await this.prisma.user.create({
            data: {
                fullname: fullname,
                username: username,
                email: email,
                password: hashPassword,
            }, select: {
                id: true,
                fullname: true,
                email: true,
                username: true,

            }
        })

        return resp(200, createdUser)

    };
}


export default UserService;