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

/**
 *     let embed = new Discord.RichEmbed({
        "url": "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=426897&type=card",
        "description": "[**Aven Wind Guide**](http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=426897&type=card) (2) <:mtgw:399594656741982209> <:mtgu:399594636840009728>\nCreature - Bird Warrior\n\nFlying, vigilance\n\nCreature tokens you control have flying and vigilance.\n\nEmbalm {4}<:mtgw:399594656741982209><:mtgu:399594636840009728> *({4}<:mtgw:399594656741982209><:mtgu:399594636840009728>, Exile this card from your graveyard: Create a token that's a copy of it, except it's a white Zombie Bird Warrior with no mana cost. Embalm only as a sorcery.)*\n\n**2 / 3**",
        "color": 16765766,
        "footer": {
            "text": "AKH - 195 - Uncommon"
        },
        "thumbnail": {
            "url": "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=426897&type=card"
        }
    });
    
 */