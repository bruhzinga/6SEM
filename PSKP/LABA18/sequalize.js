import Sequelize from 'sequelize';

//connect to MsSql

const sequelize = new Sequelize('Noda18', 'sa', 'Secret1234', {
    host: 'localhost',
    dialect: "mssql",
    pool: {
        max: 5,
        min: 2,
    },
    define: {
        hooks: {
            beforeDestroy(instance, options) {
                console.log('beforeDestroy');
            }
        }
    }
});

try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

export default sequelize;