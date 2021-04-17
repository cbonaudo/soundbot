const { SoundMaker } = require("../src/SoundMaker");
const { assertEq, assert } = require("./utils.js");

const soundMakerTests = () => {
  console.log("\n-------- soundMaker Tests --------");

  const testChannelID = "12345";
  const testSoundPath = "./sounds";
  const testSoundNames = ["my_awesome_sound.mp3", "my_awesome_sound_2.mp3"];
  const testSoundNames2 = [
    "not_so_awesome_sound.mp3",
    "not_so_awesome_sound_2.mp3",
    "not_so_awesome_sound_3.mp3",
  ];

  console.log("Constructor Tests:");

  const testSoundMaker = new SoundMaker({
    channelID: testChannelID,
    soundnames: testSoundNames,
    soundpath: testSoundPath,
  });

  assertEq(testSoundMaker.channelID, testChannelID, "channelID");
  assertEq(testSoundMaker.soundnames, testSoundNames, "soundnames");
  assertEq(
    testSoundMaker.soundnames[0],
    testSoundNames[0],
    "soundnames first item"
  );
  assertEq(testSoundMaker.soundnames[2], undefined, "no third item");
  assertEq(testSoundMaker.soundpath, testSoundPath, "soundpath");

  console.log("getRandomSound Tests: ");

  const randomSound = testSoundMaker.getRandomSound();
  assert(
    randomSound === testSoundNames[0] || randomSound === testSoundNames[1],
    "randomSound"
  );

  testSoundMaker.soundnames = testSoundNames2;
  const newRandomSound = testSoundMaker.getRandomSound();
  assert(
    newRandomSound === testSoundNames2[0] ||
      newRandomSound === testSoundNames2[1] ||
      newRandomSound === testSoundNames2[2],
    "newRandomSound"
  );
};

module.exports.soundMakerTests = soundMakerTests;
