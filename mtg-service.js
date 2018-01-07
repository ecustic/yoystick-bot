const Discord = require('discord.js');
const mtg = require('mtgsdk');

let service = {
    emojis: {
        '0': '<:mtg0:399605255622361098>', 
        '1': '<:mtg1:399605255685537793>', 
        '2': '<:mtg2:399605255974944798>', 
        '3': '<:mtg3:399605255991590923>', 
        '4': '<:mtg4:399605258063708160>', 
        '5': '<:mtg5:399605257795010571>', 
        '6': '<:mtg6:399605257975627776>', 
        '7': '<:mtg7:399605257828827137>', 
        '8': '<:mtg8:399605257589751818>', 
        '9': '<:mtg9:399605257442689025>', 
        '10': '<:mtg10:399605257937747968>', 
        '11': '<:mtg11:399605257983754250>', 
        '12': '<:mtg12:399605257975496714>', 
        '13': '<:mtg13:399605257262465035>', 
        '14': '<:mtg14:399605257577168898>', 
        '15': '<:mtg15:399605257472311299>', 
        '16': '<:mtg16:399605257560391681>', 
        '17': '<:mtg17:399605258126360576>', 
        '18': '<:mtg18:399605257954525199>', 
        '19': '<:mtg19:399605257967108097>', 
        '20': '<:mtg20:399605257552003074>', 
        'X': '<:mtgx:399605257887416320>', 
        'Y': '<:mtgy:399605258147332127>',   
        'W': '<:mtgw:399605257816244238>', 
        'U': '<:mtgu:399605258151657472>', 
        'B': '<:mtgb:399605257287630851>',
        'R': '<:mtgr:399605257694347264>',
        'G': '<:mtgg:399605258352852992>',
        'C': '<:mtgc:399605257803661343>',
        'T': '<:mtgt:399627181179011072>',
        'Q': '<:mtgq:399627180692209665>'
    },
    colors: {
        'M': 16765766,
        'W': 16775380,
        'U': 4886754,
        'B': 4868682,
        'R': 16721408,
        'G': 8762191,
        'C': 11842740
    },
    getColor: (card) => {
        if(card.colorIdentity) {
            if(card.colorIdentity.length > 1) {
                return service.colors['M'];
            }

            return service.colors[card.colorIdentity[0]];
        }
        return service.colors['C'];
    },
    formatText: (text) => {
        let newText = text;

        for(let key of Object.keys(service.emojis)) {
            let re = new RegExp('\\{' + key + '\\}', 'g');
            newText = newText.replace(re, service.emojis[key]);
        }

        newText = newText.replace(/\(/g, '*(')
                         .replace(/\)/g, ')*')
                         .replace(/\n/g, '\n\n');
        
        return newText;
    },
    createEmbed: (card) => {
            let description = `[**${card.name}**](${card.imageUrl}) ${card.manaCost ? service.formatText(card.manaCost) : ''}`;
            description += card.originalType ? '\n' + card.originalType : '';
            description += '\n\n' + service.formatText(card.text);
            description += card.flavor ? `\n\n*${service.formatText(card.flavor)}*` : '';

            if(card.power !== undefined && card.toughness !== undefined) {
                description += `\n\nPower/Toughness: **${card.power} / ${card.toughness}**`;
            }

            if(card.loyalty !== undefined) {
                description += `\n\Loyalty: **${card.loyalty}**`;
            }

            let embed = new Discord.RichEmbed({
                "description": description,
                "color": service.getColor(card),
                "footer": {
                    "text": `${card.setName} - ${card.number} - ${card.rarity}`
                },
                "thumbnail": {
                    "url": card.imageUrl
                }
            });

            return embed;
    },
    execute: (message) => {
        try {
            let params = message.content.toLowerCase().split(' ');

            if(params.length === 2 && params[1].match(/[0-9]+/)) {
                return mtg.card.find(params[1]).then(result => {
                    return service.createEmbed(result.card);
                }, result => {
                    return "Could not find card.";
                });
            } else {
                let query = {};
                for(let param of params) {
                    if(param.match(/\([a-z]+\)/)) {
                        query.set = param;
                        break;
                    }
                }
    
                query.name = message.content.toLowerCase().replace('!mtg','');
                if(query.set) {
                    query.name = query.name.replace(query.set, '');
                    query.set = query.set.replace('(','').replace(')','');
                }            
    
                query.name = query.name.trim();
               
    
                //console.log(query);
    
                return mtg.card.where(query).then(cards => {
                    if(cards && cards.length > 0) {
                        return service.createEmbed(cards[0]);
                    } else {
                        return "Could not find card.";
                    }
                }, result => {
                    return "Could not find card.";
                });
            }
        } catch(ex) {
            let promise = new Promise();
            promise.resolve("Couldn't parse card. :(");
            return promise;
        }
    }
};

module.exports = service;