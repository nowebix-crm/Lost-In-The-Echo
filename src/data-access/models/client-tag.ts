import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from '@sequelize/core';
import { sequelize } from '../../db/db-connection';

export class ClientTagModel extends Model<
  InferAttributes<ClientTagModel>,
  InferCreationAttributes<ClientTagModel>
> {
  declare client_id: string;
  declare tag_id: string;
}

ClientTagModel.init(
  {
    client_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    tag_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'client_tags',
    freezeTableName: true,
    timestamps: false,
  }
);
