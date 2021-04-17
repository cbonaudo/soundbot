const fs = require("fs");

class SoundMaker {
  constructor({ channelID, soundpath }) {
    this.channelID = channelID;
    this.soundpath = soundpath;
  }

  async connect(clientChannels) {
    const voiceChannel = await clientChannels.fetch(this.channelID);
    this.connection = await voiceChannel.join();
    setTimeout(() => {
      voiceChannel.leave();
    }, 5000);
  }

  playSound() {
    if (this.soundpath) {
      this.playSpecificSound();
    } else {
      this.playRandomSound();
    }
  }

  playSpecificSound() {
    this.connection.play(`./sounds/${this.soundpath}.mp3`);
  }

  playRandomSound() {
    fs.readdir("./sounds", (_, files) => {
      const rand = Math.floor(Math.random() * files.length);
      this.connection.play("./sounds/" + files[rand]);
    });
  }
}

module.exports.SoundMaker = SoundMaker;
