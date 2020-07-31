import { Snowflake, MessageEmbed } from 'discord.js'
import colorHash from 'util/colorHash'

export type Quote = {
	user: {
		id: Snowflake,
		username: string,
		discriminator: string
	},
	message: string,
}

type FormatQuoteParams = Quote & { _id: string, createdAt?: Date, avatar: string | null }

export const formatQuote = ({ message, user: { username }, createdAt, avatar, _id }: FormatQuoteParams) => new MessageEmbed({
	description: `***“${message}”*** [▪](http://${_id})`,
	color: colorHash(username),
	timestamp: createdAt,
	footer: {
		icon_url: avatar ? avatar : 'https://cdn.discordapp.com/embed/avatars/0.png',
		text: `${username}`
	}
})
