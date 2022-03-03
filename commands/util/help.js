import Command from '../../structures/Command.js';

export default class HelpCommand extends Command {
    constructor(client) {
        super(client, {
            name: "help",
            description: "Help command, what else?",
            group: "util",
        })
    }
    async run(message, command) {
		return message.createMessage('Do I have such an obligation?');
	}
}