import _sequelize from 'sequelize';

const {Model, Sequelize} = _sequelize;

export default class AUDITORIUM extends Model {
    static init(sequelize, DataTypes) {
        return super.init({
            AUDITORIUM: {
                type: DataTypes.CHAR(10),
                allowNull: false,
                primaryKey: true
            },
            AUDITORIUM_NAME: {
                type: DataTypes.STRING(200),
                allowNull: true
            },
            AUDITORIUM_CAPACITY: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            AUDITORIUM_TYPE: {
                type: DataTypes.CHAR(10),
                allowNull: false,
                references: {
                    model: 'AUDITORIUM_TYPE',
                    key: 'AUDITORIUM_TYPE'
                }
            }
        }, {
            sequelize,
            tableName: 'AUDITORIUM',
            schema: 'dbo',
            timestamps: false,
            indexes: [
                {
                    name: "PK__AUDITORI__53726010F05A0945",
                    unique: true,
                    fields: [
                        {name: "AUDITORIUM"},
                    ]
                },
            ],
            scopes: {
                tenToSixty: {
                    where: {
                        AUDITORIUM_CAPACITY: {
                            [_sequelize.Op.between]: [10, 60]
                        }
                    }
                }
            }
        });
    }
}
