import { quotesDb } from 'db'
import { MessageMentions, TextChannel } from 'discord.js'
import { formatQuote, Quote } from '../quote'

type GetParams = {
	mentions: MessageMentions,
	channel: TextChannel,
}

const get = async ({ mentions, channel }: GetParams) => {
	if(!(mentions.users.size))
		return
	const user = mentions.users.array()[0]
	const { id } = user
	const quotes = await quotesDb.find<Quote>({ 'user.id': id })
	if(quotes.length > 0) {
		const quote = quotes[Math.floor(quotes.length * Math.random())]
		return channel.send(formatQuote({ ...quote, avatar: user.displayAvatarURL() }))
	}
	return channel.send(`Couldn't find any quotes by <@${id}>.`)
}

export default get