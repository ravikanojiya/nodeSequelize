module.exports = (sequelize, DataTypes) => {
    const Register = sequelize.define('Login', {
        username: {
            type: DataTypes.STRING(35),
            allowNull: false,
            unique:true,
            validate:{
                len:[5,10]
            }
        },
        password: {
            type: DataTypes.STRING(64),
            validate: {
                is: /^[0-9a-f]{64}$/i
            },
            allowNull:false
        }
    }, {
        tableName: 'UserRegister',
    })
    return Register
}