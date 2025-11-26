import { DataTypes, InferAttributes, InferCreationAttributes, Model, CreationOptional } from '@sequelize/core';
import { sequelize } from '../../db/db-connection';

export class PipelineStageModel extends Model<InferAttributes<PipelineStageModel>, InferCreationAttributes<PipelineStageModel>> {
  declare id: CreationOptional<string>;
  declare pipeline_id: string;
  declare name: string;
  declare position: number;
  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;
}

PipelineStageModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    pipeline_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(80),
      allowNull: false,
    },
    position: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
  },
  {
    sequelize,
    tableName: 'pipeline_stages',
    freezeTableName: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

