import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  CreationOptional,
} from '@sequelize/core';
import { sequelize } from '../../db/db-connection';

export type ContactTypeEnum =
  | 'phone'
  | 'email'
  | 'telegram'
  | 'whatsapp'
  | 'viber'
  | 'gmail'
  | 'instagram';

export class ContactModel extends Model<
  InferAttributes<ContactModel>,
  InferCreationAttributes<ContactModel>
> {
  declare id: CreationOptional<string>;
  declare entity_type: ContactTypeEnum;
  declare entity_id: string;
  declare type: ContactTypeEnum;
  declare value: string;
  declare is_primary: boolean;
  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;
  declare deleted_at: CreationOptional<Date | null>;
}

ContactModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    entity_type: {
      type: DataTypes.ENUM(
        'phone',
        'email',
        'telegram',
        'whatsapp',
        'viber',
        'gmail',
        'instagram'
      ),
      allowNull: false,
    },
    entity_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM(
        'phone',
        'email',
        'telegram',
        'whatsapp',
        'viber',
        'gmail',
        'instagram'
      ),
      allowNull: false,
    },
    value: {
      type: DataTypes.STRING(120),
      allowNull: false,
    },
    is_primary: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    deleted_at: DataTypes.DATE,
  },
  {
    sequelize,
    tableName: 'contacts',
    paranoid: true,
    freezeTableName: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
  }
);
