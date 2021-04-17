const Discord = require('discord.js');
const { SoundMaker } = require('./SoundMaker');

class BotHandler {
    constructor(token) {
        this.client = new Discord.Client();
        this.isSpeaking = false;
        this.addVoiceStateUpdateEvent();
        this.login(token);
    }

    login(token) {
        this.client.login(token);
    }

    addVoiceStateUpdateEvent() {
        this.client.on('voiceStateUpdate', async (oldState, newState) => {
            if (this.cannotEmit(oldState, newState)) return;
            this.isSpeaking = true;

            const soundMaker = new SoundMaker(newState.channelID, newState.member.user.username);

            await soundMaker.connect(this.client.channels);

            soundMaker.playSound();
            
            setTimeout(() => {
                this.isSpeaking = false;
            }, 5000);
        })
    }

    cannotEmit(oldState, newState) {
        const userIsBot = oldState.member.user.bot;
        const userIsJoining = !oldState.channelID || ((oldState.channelID !== newState.channelID) && !!newState.channelID);
        return (userIsBot || !userIsJoining || this.isSpeaking);
    }
}

module.exports.BotHandler = BotHandler;
