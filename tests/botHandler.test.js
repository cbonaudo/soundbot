const { BotHandler } = require("../src/BotHandler");
const { assertEq, assert } = require("./utils.js");

const botHandlerTests = () => {
  console.log("\n-------- botHandler Tests --------");

  const testUserSounds = [
    {
      username: "xXuserXx",
      soundnames: ["my_awesome_sound.mp3"],
    },
    {
      username: "o0user0o",
      soundnames: ["no_so_awesome_sound.mp3"],
    },
  ];
  const testEnv = {
    token: "1234",
    soundpath: "./tests/sounds",
    userSounds: testUserSounds,
  };

  console.log("Constructor Tests:");

  const testBotHandler = new BotHandler(testEnv);

  assertEq(testBotHandler.isSpeaking, false, "isSpeaking");
  assertEq(testBotHandler.userSounds, testEnv.userSounds, "channelID");
  assertEq(testBotHandler.soundpath, testEnv.soundpath, "channelID");
  assertEq(testBotHandler.token, testEnv.token, "channelID");

  console.log("getSoundnames Tests:");

  const soundnames = testBotHandler.getSoundnames(testUserSounds[0].username);
  assertEq(soundnames, testUserSounds[0].soundnames, "user 1 soundnames");

  const soundnames2 = testBotHandler.getSoundnames(testUserSounds[1].username);
  assertEq(soundnames2, testUserSounds[1].soundnames, "user 2 soundnames");

  const soundnames3 = testBotHandler.getSoundnames("notARealUser");
  const testFolderSounds = [
    "my_below_average_test_sound.mp3",
    "my_super_test_sound.mp3",
  ];
  assertEq(soundnames3[0], testFolderSounds[0], "testFolderSounds first item");
  assertEq(soundnames3[1], testFolderSounds[1], "testFolderSounds second item");

  console.log("cannotEmit Tests:");

  const botOldState = {
    member: { user: { bot: true } },
  };
  const botCannotEmit = testBotHandler.cannotEmit(botOldState, {});
  assertEq(botCannotEmit, true, "bot cannot emit");

  const withSameChannelIDOldState = {
    member: { user: { bot: false } },
    channelID: "12341",
  };
  const withSameChannelIDNewState = {
    channelID: "12341",
  };
  const userNotJoiningCannotEmit = testBotHandler.cannotEmit(
    withSameChannelIDOldState,
    withSameChannelIDNewState
  );
  assertEq(userNotJoiningCannotEmit, true, "user not joining cannot emit");

  const withChannelIDOldState = {
    member: { user: { bot: false } },
    channelID: "12341",
  };
  const withNoChannelIDNewState = {
    channelID: null,
  };
  const userLeavingCannotEmit = testBotHandler.cannotEmit(
    withChannelIDOldState,
    withNoChannelIDNewState
  );
  assertEq(userLeavingCannotEmit, true, "user leaving cannot emit");

  const withDifferentChannelIDOldState = {
    member: { user: { bot: false } },
    channelID: "12341",
  };
  const withDifferentChannelIDNewState = {
    channelID: "55555",
  };
  const userJoiningCannotEmit = testBotHandler.cannotEmit(
    withDifferentChannelIDOldState,
    withDifferentChannelIDNewState
  );
  assertEq(userJoiningCannotEmit, false, "user joining can emit");

  testBotHandler.isSpeaking = true;
  const isSpeakingCannotEmit = testBotHandler.cannotEmit(
    withDifferentChannelIDOldState,
    withDifferentChannelIDNewState
  );
  assertEq(isSpeakingCannotEmit, true, "bot speaking cannot emit");

  testBotHandler.isSpeaking = false;
  const isNotSpeakingCannotEmit = testBotHandler.cannotEmit(
    withDifferentChannelIDOldState,
    withDifferentChannelIDNewState
  );
  assertEq(isNotSpeakingCannotEmit, false, "bot not speaking can emit");
};

module.exports.botHandlerTests = botHandlerTests;
