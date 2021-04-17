class SoundMaker {
  constructor({ channelID, soundnames, soundpath }) {
    this.channelID = channelID;
    this.soundnames = soundnames;
    this.soundpath = soundpath;
  }

  async connect(clientChannels) {
    try {
      const voiceChannel = await clientChannels.fetch(this.channelID);
      this.connection = await voiceChannel.join();
      setTimeout(() => {
        voiceChannel.leave();
      }, 5000);
    } catch (e) {
      console.log("failed to connect to channel : " + e);
    }
  }

  getSoundAndPlayIt() {
    const soundname = this.getRandomSound();
    this.playSound(soundname);
  }

  getRandomSound() {
    const rand = Math.floor(Math.random() * this.soundnames.length);
    return this.soundnames[rand];
  }

  playSound(soundname) {
    try {
      this.connection.play(`${this.soundpath}/${soundname}`);
    } catch (e) {
      console.log("failed to play sound : " + e);
    }
  }
}

module.exports.SoundMaker = SoundMaker;
