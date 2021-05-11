const mongoose = require('mongoose');
const Player = require('../models/player');
const { playerSeeds } = require('./playerSeeds')

mongoose.connect('mongodb://localhost:27017/playerTracker', { 
    useNewUrlParser: true,
    useCreateIndex: true, 
    useUnifiedTopology: true 
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const seedDB = async () => {
    await Player.deleteMany({});
    for (const player of playerSeeds) {
        const p = new Player(player);
        await p.save();        
    }    
}

seedDB();
