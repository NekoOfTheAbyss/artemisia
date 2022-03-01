import Caller from './Caller.js';
import MessageCaller from './MessageCaller.js';

class Dispatcher {
    constructor(client) {
        this.client = client;
        const prefix = client.util.EscapeRegex(this.client.commandPrefix)
        this.cmdPattern = new RegExp(`(^<@!?${'683218400142557223'}>\\s+(?:${prefix}\\s*)?|${prefix}\\s*)([^\\s]+)`, 'i');
    }
    shouldHandle(message) {
        if(message.type !== 2) return false
        return true;

    }
    shouldHandleMessage(message) {
        if(!message.content) return false;
        if(message.author.bot) return false;
        if(!this.cmdPattern.test(message.content)) return false;
        return true;
    }
    handle(message) {
        if(!this.shouldHandle(message)) return false;
        const command = new Caller(this.client, message.data, message)
        console.info(`${command.author.username} ran command ${command.command}`)
        const cmd = this.client.registry.commands.get(command.command)
        if(!cmd) return message.createMessage({content: "This command is either temporarily unavailable or deleted. Please join our support server for help. https://discord.gg/A69vvdK", flags: 64});
        if(cmd.nsfw) {
            console.log("NSFW!")
            if(!message.channel.nsfw) return message.createMessage({content: "This command can only be used in NSFW channels.", flags: 64})
        }
        return cmd.run(message, command)
    }
    handleMessage(message) {
        if(!this.shouldHandleMessage(message)) return false;
        const matches = this.cmdPattern.exec(message.content)
        const cmd = this.client.registry.commands.get(matches[2])
        if(!cmd) return false;
        const data = {
            name: cmd.name,
            options: null,
        }
        if(Array.isArray(cmd.options) && cmd.options.length > 0) {
            data.options = []
            const args = message.content.replace(`${matches[0]} `, "").replace(`${matches[0]}`, "").split(" ")
            console.log(matches)
            console.log(args)
            cmd.options.forEach((x, i) => {
                if(args[i] && args[i].length > 0) data.options.push({name: x.name, value: this.parseArgs(args[i], x.type)})
            })
            if(data.options.length === 0)
            data.options = null;
        }
        const command = new MessageCaller(this.client, data, message)
        return cmd.run(message, command)
    }
    parseArgs(str, type) {
        if(type == 6) {
            console.log(str)
            const matches = new RegExp(`^(?:<@!?)?([0-9]+)>?$`).exec(str)
            if(matches) return matches[1]
        }
        return str
    }
}

export default Dispatcher;