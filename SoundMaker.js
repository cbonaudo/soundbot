const fs = require('fs');
const env = require('./env.json')

class SoundMaker {
    constructor(channelID, username) {
        this.username = username;
        this.channelID = channelID;
        this.setIsUserKnown(username);
    }

    async connect(clientChannels) {  
        const voiceChannel = await clientChannels.fetch(this.channelID);
        this.connection = await voiceChannel.join();
        setTimeout(() => {
            voiceChannel.leave();
        }, 5000);
    }

    setIsUserKnown(username) {
        this.isUserKnown = env.userSounds.some(sound => sound.username === username);
    }

    playSound() {
        if (this.isUserKnown) {
            this.playUserSound();
        } else {
            this.playRandomSound();
        }
    }

    playUserSound() {
        this.connection.play("./sounds/" + env.userSounds.find(sound => sound.username === this.username).soundpath + ".mp3");          
    }

    playRandomSound() {
        fs.readdir("./sounds", (_, files) => {
            const rand = Math.floor(Math.random() * files.length);
            this.connection.play("./sounds/" + files[rand]);
            console.log(this.username, files[rand]);
        });
    }
}

module.exports.SoundMaker = SoundMaker;
