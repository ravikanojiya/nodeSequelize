const { Sequelize, DataTypes } = require('sequelize');
const db = {};


const sequelize = new Sequelize('rkdb', 'root', '1234', {
  host: 'localhost',
  logging: true,
  dialect: 'mysql'/* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
});

try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.contact = require('../apis/contacts/contactTable')(sequelize, DataTypes);
db.user = require('../apis/users/userTable')(sequelize, DataTypes);
db.register = require('../apis/login/registerTable')(sequelize, DataTypes);
db.education = require('../apis/educations/educationTable')(sequelize, DataTypes)
db.customer = require('../apis/customers/coustomerTable')(sequelize, DataTypes)
db.profile = require('../apis/profiles/profilesTable')(sequelize, DataTypes)

// db.user.hasOne(db.contact, { foreignKey: 'user_id', as: 'contactDetails' });
// db.contact.belongsTo(db.user);

db.user.hasMany(db.contact, { foreignKey: 'UserId' });
db.contact.belongsTo(db.user, { foreignKey: 'UserId' })
db.contactUser = db.contact.belongsTo(db.user, { foreignKey: 'UserId', as: 'users' })

db.contact.hasMany(db.education, { foreignKey: 'ContactId' });
db.education.belongsTo(db.contact, { foreignKey: 'ContactId' })

const Grant = sequelize.define('Grant', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  selfGranted: DataTypes.BOOLEAN
}, { timestamps: false })

db.customer.belongsToMany(db.profile, { through: Grant });
db.profile.belongsToMany(db.customer, { through: Grant });

sequelize.sync({ force: false })

module.exports = db