import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class SUBJECT extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    SUBJECT: {
      type: DataTypes.CHAR(10),
      allowNull: false,
      primaryKey: true
    },
    SUBJECT_NAME: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    PULPIT: {
      type: DataTypes.CHAR(10),
      allowNull: false,
      references: {
        model: 'PULPIT',
        key: 'PULPIT'
      }
    }
  }, {
    sequelize,
    tableName: 'SUBJECT',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_SUBJECT",
        unique: true,
        fields: [
          { name: "SUBJECT" },
        ]
      },
    ]
  });
  }
}
