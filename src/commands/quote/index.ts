import { Command } from 'util/command'
import add from './commands/add'
import get from './commands/get'

const quote: Command = async ({ channel, mentions, args: [subCmd, , ...quoteParts] }) => {
	switch(subCmd) {
		case 'add':
			return add({ mentions, channel, quoteParts })
		case 'get':
			return get({ mentions, channel })
	}
	throw Error()
}

export default quote