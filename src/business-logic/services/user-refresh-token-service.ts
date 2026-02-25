import UserRefreshTokenRepo from '../../data-access/repositories/user-refresh-token-repo';

const saveUserRefreshToken = async (
  refreshToken: string,
  userId: string
): Promise<void> => {
  try {
    await UserRefreshTokenRepo.create(refreshToken, userId);

    return;
  } catch {
    throw new Error('Failed to save user refresh token');
  }
};

export { saveUserRefreshToken };
