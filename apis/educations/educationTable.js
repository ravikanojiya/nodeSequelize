
module.exports = (sequelize, DataTypes) => {
    const Education = sequelize.define('educations', {
        className: {
            type: DataTypes.STRING
        },
        grade: {
            type: DataTypes.STRING
        },
        ContactId: {
            type: DataTypes.INTEGER
        }
    }, {})
    return Education
}