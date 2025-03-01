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
                id: true,
                email: true,
                username: true,
                birthday: true,
            },
        });

        return resp(200, users);
    };

    async getOne(id: string) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: id
            },
            select: {
                id: true,
                email: true,
                username: true,
                birthday: true,
                games:true,
                role:true
            },
        });
        if(!user)return resp(404,'user not found')

        return resp(200, user);
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

        const { username, birthday, email, password } = body;

        const user = await this.prisma.user.findUnique({ where: { email: email } })
        if (user) return resp(400, 'email is already register');


        const userName = await this.prisma.user.findUnique({ where: { username: username } })
        if (userName) return resp(400, 'username is already register');


        const hashPassword = await bcrypt.hash(password, 10);

        const createdUser = await this.prisma.user.create({
            data: {
                username,
                birthday,
                email,
                password: hashPassword
            }, select: {
                id: true,
                birthday: true,
                email: true,
                username: true,

            }
        })

        return resp(200, createdUser)

    };
}


export default UserService;