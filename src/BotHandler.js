const Discord = require("discord.js");
const fs = require("fs");

const { SoundMaker } = require("./SoundMaker");

class BotHandler {
  constructor(env) {
    this.client = new Discord.Client();
    this.isSpeaking = false;

    this.getConfigFromEnv(env);
    this.addVoiceStateUpdateEvent();
    this.login();
  }

  getConfigFromEnv(env) {
    this.userSounds = env.userSounds;
    this.soundpath = env.soundpath;
    this.token = env.token;
  }

  login() {
    this.client.login(this.token);
  }

  addVoiceStateUpdateEvent() {
    this.client.on("voiceStateUpdate", async (oldState, newState) => {
      if (this.cannotEmit(oldState, newState)) return;
      this.isSpeaking = true;

      const soundMaker = new SoundMaker({
        channelID: newState.channelID,
        soundnames: this.getSoundnames(newState.member.user.username),
        soundpath: this.soundpath,
      });
      await soundMaker.connect(this.client.channels);
      soundMaker.getSoundAndPlayIt();

      setTimeout(() => {
        this.isSpeaking = false;
      }, 5000);
    });
  }

  getSoundnames(username) {
    if (this.userSounds.find((userSound) => userSound.username === username)) {
      return this.userSounds.find(
        (userSound) => userSound.username === username
      ).soundnames;
    } else {
      return fs.readdirSync(this.soundpath);
    }
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
