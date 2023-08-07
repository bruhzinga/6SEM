import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class PULPIT extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    PULPIT: {
      type: DataTypes.CHAR(10),
      allowNull: false,
      primaryKey: true
    },
    PULPIT_NAME: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    FACULTY: {
      type: DataTypes.CHAR(10),
      allowNull: false,
      references: {
        model: 'FACULTY',
        key: 'FACULTY'
      }
    }
  }, {
    sequelize,
    tableName: 'PULPIT',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_PULPIT",
        unique: true,
        fields: [
          { name: "PULPIT" },
        ]
      },
    ]
  });
  }
}
