import { WhereOptions, InferAttributes } from "sequelize";

import UserModel from "../models/users";

import { USER_ROLES, UserCreationType } from "../../constants/users-contstants";

class UserRepo {
    static async findById(id: string) {
        const user = await UserModel.findByPk(id);

        return user;
    }

    static async findByEmail(email: string) {
        const user = await UserModel.findOne({ where: { email } });

        return user;
    }

    static async create(user: UserCreationType) {
        const newUser = await UserModel.create(user);

        return newUser;
    }

    static async findAll() {
        const users = await UserModel.findAll();

        return users;
    }

    static async findAllClients(whereClause: any) {
        const users = await UserModel.findAll({ 
            attributes: ['id', 'first_name', 'last_name', 'email', 'role', 'phone', 'status'], 
            where: whereClause,
            raw: true
        });

        return users;
    }
}

export default UserRepo;
