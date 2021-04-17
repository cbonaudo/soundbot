const { BotHandler } = require('./BotHandler');
const env = require('./env.json')

new BotHandler(env.token);
