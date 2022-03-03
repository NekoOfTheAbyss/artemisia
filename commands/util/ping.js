import Command from '../../structures/Command.js';

export default class PingCommand extends Command {
    constructor(client) {
        super(client, {
            name: "ping",
            description: "Check the bot's ping to the server.",
            group: "util",
        })
    }
    async run(message, command) {
//        this.client.emit("guildMemberRemove", message.channel.guild, message.member)
		await message.createMessage('Pinging...');
		return message.editOriginalMessage(`Eager for the ping, aren't we? \`${(Date.now()) - (message.editedTimestamp || message.createdAt)}ms\``);
	}
}