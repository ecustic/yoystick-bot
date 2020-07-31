import { quotesDb } from 'db'
import { MessageMentions, TextChannel } from 'discord.js'
import { formatQuote, Quote } from '../quote'

type AddParams = {
	mentions: MessageMentions,
	channel: TextChannel,
	quoteParts: Array<string>
}

const add = async ({ mentions, channel, quoteParts }: AddParams) => {
	if(!(mentions?.users?.array().length > 0))
		return
	const user = mentions.users.array()[0]
	const { id, username, discriminator } = user
	const quote = await quotesDb.insert<Quote>({
		user: {
			id,
			username,
			discriminator,
		},
		message: quoteParts.join(' '),
	})
	return channel.send(formatQuote({ ...quote, avatar: user.displayAvatarURL() }))
}

export default add