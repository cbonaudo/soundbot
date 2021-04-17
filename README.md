# SOUNDBOT

This is a bot to play some sounds on discord, when a user joins a channel.

## Setup

- Install the node_modules

```sh
npm i
```

- Add your sounds as mp3 files in the /sounds folder.

- Copy env.example.json to an env.json and add your settings:

```js
{
    /*
    *   The application ID of your bot (on Discord Developer)
    */
    "token": "1234567890bauietnyjvdeausgh.131244",

    /*
    *   An array of the users and the specific sound you want to play for their arrival
    *   if not specified, a random sound will be played
    */
    "userSounds": [
        { "username": "xXuserXx", "soundnames": ["my_awesome_sound.mp3"] }
    ]
}
```

## Start

```
npm start
```
