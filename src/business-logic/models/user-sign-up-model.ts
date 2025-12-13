type UserSignUpDBModelType = {
  id: string;
  email: string;
  password: string;
  name: string;
  role_id: number;
  organizationName: string;
};

class UserSignUpModel {
  declare id: string;
  declare email: string;
  declare password: string;
  declare name: string;
  declare role_id: number;
  declare organizationName: string;

  constructor(private readonly user: UserSignUpDBModelType) {
    this.id = user.id;
    this.email = user.email;
    this.password = user.password;
    this.name = user.name;
    this.role_id = user.role_id;
    this.organizationName = user.organizationName;
  }

  static toDBModel(user: UserSignUpDBModelType) {
    return {
      id: user.id,
      email: user.email,
      password: user.password,
      name: user.name,
      role_id: user.role_id,
      organizationName: user.organizationName,
    };
  }
}

export type { UserSignUpDBModelType };

export default UserSignUpModel;
