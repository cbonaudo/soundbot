const Discord = require("discord.js");
const { SoundMaker } = require("./SoundMaker");

class BotHandler {
  constructor(token, userSounds) {
    this.client = new Discord.Client();
    this.isSpeaking = false;
    this.userSounds = userSounds;
    this.addVoiceStateUpdateEvent();
    this.login(token);
  }

  login(token) {
    this.client.login(token);
  }

  addVoiceStateUpdateEvent() {
    this.client.on("voiceStateUpdate", async (oldState, newState) => {
      if (this.cannotEmit(oldState, newState)) return;
      this.isSpeaking = true;

      const soundMaker = new SoundMaker({
        channelID: newState.channelID,
        soundpath: this.getSoundpath(newState.member.user.username),
      });
      await soundMaker.connect(this.client.channels);
      soundMaker.playSound();

      setTimeout(() => {
        this.isSpeaking = false;
      }, 5000);
    });
  }

  getSoundpath(username) {
    return this.userSounds.find((userSound) => userSound.username === username)
      .soundpath;
  }

  cannotEmit(oldState, newState) {
    const userIsBot = oldState.member.user.bot;
    const userIsJoining =
      !oldState.channelID ||
      (oldState.channelID !== newState.channelID && !!newState.channelID);
    return userIsBot || !userIsJoining || this.isSpeaking;
  }
}

module.exports.BotHandler = BotHandler;
