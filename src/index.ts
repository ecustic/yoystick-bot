import { Client } from 'discord.js'
const client = new Client()

import commands from 'commands'

client.on('message', async ({ content, channel, guild, mentions }) => {
	if(channel.type === 'text' && guild) {
		if(content.startsWith('!yoystick')) {
			try {
				const [,cmd, ...args] = content.split(' ')
				const params = { channel, guild, args, mentions }
		
				if(Object.keys(commands).includes(cmd)) {
					await (commands as any)[cmd](params)
				} else {
					channel.send('Type `!yoystick help` for a list of commands.')
				}
			} catch (err) {
				console.log(err)
				channel.send('Invalid command.')
			}
		}
	}
})

client.login(process.env.BOT_TOKEN)