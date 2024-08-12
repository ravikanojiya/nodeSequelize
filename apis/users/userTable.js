module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        // Model attributes are defined here
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            get() {
                rowValue = this.getDataValue('firstName');
                return rowValue ? 'Mr.' + rowValue.toUpperCase() : null;
            }
        },
        lastName: {
            type: DataTypes.STRING,
            get() {
                rowValue = this.getDataValue('lastName');
                return rowValue ? rowValue.toLowerCase() : null;
            },
            set(value) {
                this.setDataValue('lastName', value + ' set')
            }
        },
        fullName: {
            type: DataTypes.VIRTUAL,
            get() {
                return `${this.firstName} ${this.lastName}`
            },
            set(value) {
                throw new Error('Do not try to set a fullname value !')
            }
        },
        status:{
            type:DataTypes.INTEGER,
        }
    }, {
        // Other model options go here
        tableName: 'Users',
        // timestamps:true,
        // createdAt:false
        paranoid: true // paranoid: true is used to active softdeleted data in table
    });
    return User;
}