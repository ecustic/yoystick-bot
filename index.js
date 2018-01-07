const Discord = require('discord.js');
const client = new Discord.Client();
const mtgService = require('./mtg-service');

client.on('ready', () => {
  console.log('YoystickBot ready!');
});

client.on('message', message => {

  if (message.content === 'ping') {
    message.channel.send('pong');
  }

  if(message.content.indexOf('!mtg') == 0) {
    mtgService.execute(message).then(response => {
        message.channel.send(response);
    });
  }
});

client.login(process.env.DISCORD_APP_TOKEN);