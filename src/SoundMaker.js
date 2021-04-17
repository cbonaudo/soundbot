class SoundMaker {
  constructor({ channelID, soundnames, soundpath }) {
    this.channelID = channelID;
    this.soundnames = soundnames;
    this.soundpath = soundpath;
  }

  async connect(clientChannels) {
    const voiceChannel = await clientChannels.fetch(this.channelID);
    this.connection = await voiceChannel.join();
    setTimeout(() => {
      voiceChannel.leave();
    }, 5000);
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
    this.connection.play(`${this.soundpath}/${soundname}`);
  }
}

module.exports.SoundMaker = SoundMaker;
