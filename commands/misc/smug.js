import fetch from 'node-fetch';
import Command from '../../structures/Command.js';


export default class SmugCommand extends Command {
  constructor(client) {
    super(client, {
      name: "smug",
      description: "Get a smug gif!",
      group: "misc",
    });
  }

  async run(message, command) {
    const response = await fetch("https://api.nekooftheabyss.xyz/v1/smug");
    const aqx = await response.json();
    const aq = aqx[0];

    const embed = new this.client.util.Embed()
      .setAuthor(
        `${command.author.username} is smug`,
        command.author.avatarURL
      )
      .setColor("#ff00c3")
      .setImage(aq);

    return message.createMessage({embeds: [embed.json()]});
  }
};
