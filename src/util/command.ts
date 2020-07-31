import { TextChannel, MessageMentions, Guild } from 'discord.js'

export type CommandParameters = {
	args: Array<string>,
	channel: TextChannel,
	guild: Guild,
	mentions: MessageMentions,
}

export type Command = (params: CommandParameters) => Promise<any>