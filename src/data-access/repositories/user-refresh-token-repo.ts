import { UserTokensModel } from '../models/refresh-token';

class UserRefreshTokenRepo {
  static async create(refreshToken: string, userId: string) {
    await UserTokensModel.create({
      refresh_token: refreshToken,
      user_id: userId,
    });

    return;
  }
}

export default UserRefreshTokenRepo;
