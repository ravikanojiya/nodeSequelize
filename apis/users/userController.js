const db = require('../../server/connection');
const User = db.user;
const Contact = db.contact;
const Education = db.education;
const { Sequelize, Op, where } = require('sequelize');

const getUser = async (req, res) => {
    const data = await User.findAll({
        order: [['createdAt', 'DESC']],
        paranoid: false //used to ignore softdelted data and fatch all not deleted and  softdeleted data .

    });
    res.status(200).json({ data: data })
}

// const addUser = async (req, res) => {
//     const rk = await User.create({ firstName: 'Nirav', lastName: 'Patel' });
//     console.log(rk.toJSON());
//     res.status(200).json(rk.toJSON());
// }


const getUserById = async (req, res) => {
    const data = await User.findOne({
        where: {
            id: req.params.id
        }
    });
    res.status(200).json({ data: data })
}

const newUser = async (req, res) => {
    const users = req.body
    if (users.length > 1) {
        var data = await User.bulkCreate(users);
    } else {
        var data = await User.create(users);
    }
    res.status(200).json({ data: data })
}

const deleteUser = async (req, res) => {
    const data = await User.destroy({
        where: {
            id: req.params.id
        }
    });
    res.status(200).json({ data: data })
}
const updateUser = async (req, res) => {
    const updatedData = req.body;
    const data = await User.update(updatedData, {
        where: {
            id: req.params.id
        }
    });
    res.status(200).json({ data: data })
}

const queryUser = async (req, res) => {
    const data = req.body;
    const user = await User.create(data, { fields: ['firstName'] })//only one column or specific columns data can inserted using fields:['columnName']
    res.status(200).json({ data: user })
}

const columnName = async (req, res) => {
    const data = await User.findAll({

        // attributes: ['firstName']//findAll gives attributes. using attributes we can get specific columns data.

        // attributes: ['id',
        //     ['firstName', 'MyFirstName'],
        //     [Sequelize.fn('COUNT', Sequelize.col('firstName')), 'No_FN']
        // ] //---> using array we can give column alias 
        //to use group function we need to set :- SET GLOBAL sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''));

        // attributes:{exclude:'firstName'} // using exclude we cant get firstname column 
        attributes: {
            exclude: 'firstName',
            include: ['id', 'lastName', [Sequelize.fn('COUNT', Sequelize.col('firstName')), 'Count']]
        }
    })
    res.status(200).json({ data: data })
}

const operators = async (req, res) => {
    const data = await User.findAll({
        limit: 5,
        offset: 1,
        where: {
            // 'firstName': { [Op.eq]: 'Ravi' }
            // 'id': { [Op.gte]: 10 }  //eq=equal to, gt=gratterthen to, gte=gratterthen equal, lt=lessthen ,lte=lessthen equal
            // [Op.and]:{
            //     'firstName':'Ravi',
            //     'id':1
            // } 
            /*[Op.or]:{
                'firstName':'Ravi',
                'id':10
            } */
            // id:[1,2,3]// its same as [Op.in]:[1,2,3]
            // firstName:{
            //     [Op.like]:'G%a'
            // }

        },
        // order:[
        //     ['firstName','Desc'],
        //     // Sequelize.fn('max',Sequelize.col('id'))
        // ],
        // group:'firstName',
    })
    res.status(200).json({ data: data })
}

const findByPK = async (req, res) => {
    const id = req.params.id
    const data = await User.findByPk(id);
    if (data === null) {
        console.log('No data found...');
        res.status(404).json('No data found..')
    } else {
        res.status(200).json({ data: data })
    }

}
const findOrCreateData = async (req, res) => {
    const userData = req.body;
    const [data, created] = await User.findOrCreate({
        where: {
            firstName: userData.firstName,
        }
    })
    res.status(200).json({ data: data, created: created })
}
const findAndCountAllData = async (req, res) => {
    const { count, rows } = await User.findAndCountAll({
        where: {
            'lastName': { [Op.eq]: 'Sharma' }
        }
    })
    res.status(200).json({ data: rows, count: count })
}

const oneToOne = async (req, res) => {
    const data = await Contact.create({ 'padd': 'p', 'cadd': 'c', 'user_id': 3 })
    // const userData = req.body
    // const data = await User.create(userData)
    // if (data && data.id) {
    //     await Contact.create({ 'padd': 'p', 'cadd': 'c', 'user_id': 3 })
    // }
    res.status(200).json({ data: data })
}



const userContact = async (req, res) => {
    const data = await User.findAll({
        attributes: ['firstName', 'lastName'],
        include: {
            model: Contact,
            as: 'contactDetails',
            attributes: ['padd', 'cadd']
        },

    })
    res.status(200).json({ data: data })
}

const softDelete = async (req, res) => {
    const id = req.params.id
    // const data = await User.create({ firstName: 'Pranav', lastName: 'Sharma' });
    const data = await User.destroy({
        where: {
            id: id
        }
    })
    res.status(200).json({ data: data });
}

const resotreUser = async (req, res) => {
    const id = req.params.id
    const data = await User.restore({  //restore used to restore softdeleted data from table
        where: {
            id: id
        }
    });
    res.status(200).json({ data: data })
}
const lazyLoading = async (req, res) => {
    const id = req.params.id
    const data = await User.findOne({
        where: {
            id: id
        }
    })
    const contactData = await data.getContacts(); // lasyloading data using data.getContacts() function which function automatic created.

    res.status(200).json({ data: data, contactData: contactData })
}

const egarLoading = async (req, res) => {
    const data = await User.findAll({
        // include:{all:true},  used to all FULL OUTER JOIN FOR ALL QUERY
        // include:{all:true,nested:true},  //used to all FULL OUTER JOIN FOR ALL QUERY and inner query
        include: { all: true, nested: true, right: true },  //used to all RIGHT OUTER JOIN FOR ALL QUERY and inner query
        // include: {
        //     model: Contact,
        // where:{
        //     id:1
        // }
        //     required: true,  // used for INNER JOIN | Note:- without required its take LEFT OUTER JOIN by default
        //     // right: true  // used for RIGHT OUTER JOIN but for activate need to change required:false
        //     include:{
        //         model:Education,
        // where:{
        //     id:1
        // } 
        // nesting join user-> contact-> education
        //     }
        // },
        // include: {
        //     model: Education,  // to join education table also we need to add include
        //     // required: false, // used for INNER JOIN | Note:- without required its take LEFT OUTER JOIN by default
        //     // right: true  // used for RIGHT OUTER JOIN but for activate need to change required:false
        // }
    })
    res.status(200).json({ data: data })
}

const creatorUser = async (req, res) => {
    await Contact.create({
        padd: 'Motera',
        cadd: 'Gota',
        users: {
            firstName: 'Ravi',
            lastName: 'rK',
            status: 1
        }
    }, {
        include: [db.contactUser]
    })

    const data = await User.findAll({
        include: {
            model: Contact
        }

    })
    res.status(200).json({ data: data })
}

const mnAssociation = async (req, res) => {
    const customerData = await db.customer.create({
        username: 'Vinay',
        points: '1324',
        profiles: [{
            name: 'Vk',
            Grant: {
                selfGranted: false
            }
        }]
    }, {
        include: db.profile
    })
    const data = await db.customer.findOne({
        where: {
            username: 'Vinay'
        },
        include: db.profile
    })
    res.status(200).json({ data: data })


    // const customerData = await db.customer.create({ username: 'Ram', points: 2000 });
    // const profileData = await db.profile.create({ name: 'rrrv' })
    // await customerData.addProfile(profileData, { through: { selfGranted: true } });
    // const data = await db.customer.findOne({
    //     where: {
    //         username: 'Ram'
    //     },
    //     include: db.profile
    // })
    // res.status(200).json({ data: data })
}
const scopeUser = async (req, res) => {
    User.addScope('checkStatus', {
        where: {
            status: 1
        }
    })
    User.addScope('checkFirstName', {
        where: {
            firstName: 'Ravi'
        }
    })
    User.addScope('attribute', {
        attributes: ['firstName']
    })
    User.addScope('includeContact', {
        include: Contact
    })
    const data = await User.scope(['checkStatus', 'checkFirstName', 'attribute', 'includeContact']).findAll({})
    res.status(200).json({ data: data })
}
module.exports = {
    // addUser,
    getUser,
    getUserById,
    newUser,
    deleteUser,
    updateUser,
    queryUser,
    columnName,
    operators,
    findByPK,
    findOrCreateData,
    findAndCountAllData,
    oneToOne,
    userContact,
    softDelete,
    resotreUser,
    lazyLoading,
    egarLoading,
    mnAssociation,
    scopeUser,
    creatorUser
}