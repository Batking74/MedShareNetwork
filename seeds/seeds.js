const sequelize = require("../config/connection");
const { Users, Posts } = require("../models")
const userData = require("./userData.json");
const postsData = require("./postsData.json");

const seedDatabase = async () => {
    await sequelize.sync({ force: true});

    const users = await Users.bulkCreate(userData, {
        individualHooks: true, 
        returning: true,
    });
    
    for (const post of postsData) {
        await Posts.create({ ...post, userID: users[ Math.floor(Math.random() * users.length)].id });
    }
    process.exit(0);
};

seedDatabase();