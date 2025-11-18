import UserRefreshTokenRepo from '../repositories/user-refresh-token-repo';

const saveUserRefreshToken = async (refreshToken: string, userId: string): Promise<void> => {
    try {
        await UserRefreshTokenRepo.create(refreshToken, userId);

        return;
    } catch (error) {
        throw new Error('Failed to save user refresh token');
    }
}

export { saveUserRefreshToken };
