import UserModel from "../models/users";

import { UserCreationType, UserUpdateType } from "../../constants/users-contstants";

class UserRepo {
    static async findById(id: string, include?: any) {
        const user = await UserModel.findByPk(id, { include: include || [] });

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

    static async update(userId: string, user: UserUpdateType) {
        const updatedUser = await UserModel.update(user, { 
            where: { id: userId },
            returning: true
        });

        return updatedUser;
    }

    static async getUsers(whereClause: any, include?: any, orderBy?: any) {
        const users = await UserModel.findAll({ 
            attributes: ['id', 'first_name', 'last_name', 'email', 'role', 'phone', 'status'], 
            where: whereClause,
            raw: true,
            include: include || [],
            order: orderBy || [['created_at', 'DESC']]
        });

        return users;
    }

    static async deleteById(id: string) {
        await UserModel.destroy({ where: { id } });
    }
}

export default UserRepo;
