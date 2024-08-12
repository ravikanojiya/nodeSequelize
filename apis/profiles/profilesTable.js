module.exports = (sequelize, DataTypes) => {
    const Profiles = sequelize.define('profiles', {
        name: DataTypes.STRING
    }, { timestamps: false });
    return Profiles
}