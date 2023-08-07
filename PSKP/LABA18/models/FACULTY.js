import _sequelize from 'sequelize';

const {Model, Sequelize} = _sequelize;

export default class FACULTY extends Model {
    static init(sequelize, DataTypes) {
        return super.init({
            FACULTY: {
                type: DataTypes.CHAR(10),
                allowNull: false,
                primaryKey: true
            },
            FACULTY_NAME: {
                type: DataTypes.STRING(50),
                allowNull: true
            }
        }, {
            sequelize,
            tableName: 'FACULTY',
            schema: 'dbo',
            timestamps: false,
            indexes: [
                {
                    name: "PK_FACULTY",
                    unique: true,
                    fields: [
                        {name: "FACULTY"},
                    ]
                },
            ], hooks: {
                beforeCreate: (faculty, options) => {
                    console.log('beforeCreate');
                },
                afterCreate: (faculty, options) => {
                    console.log('afterCreate');
                }
            }
        });
    }
}
