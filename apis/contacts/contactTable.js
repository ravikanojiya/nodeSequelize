module.exports = (sequelize, DataTypes) => {
    const Contact = sequelize.define('contacts', {
        padd: {
            type: DataTypes.STRING,
        },
        cadd: {
            type: DataTypes.STRING
        },
        UserId:{
            type:DataTypes.INTEGER
        }
    }, {})
    return Contact
}