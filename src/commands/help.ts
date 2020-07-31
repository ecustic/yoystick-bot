import { Command } from 'util/command'

const help: Command = async ({ channel }) => {
	channel.send('Yoystick help!')
}

export default help