import Command from '../../structures/Command.js';

export default class TOSCommand extends Command {
    constructor(client) {
        super(client, {
            name: "tos",
            description: "Discord ToS",
            group: "util",
        })
    }
    async run(message, command) {
		return message.createMessage("Terms of Service: <https://discord.com/terms> \nCommunity Guidelines: <https://discord.com/guidelines>");
	}
}