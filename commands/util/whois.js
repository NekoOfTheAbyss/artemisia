import Command from "../../structures/Command.js";

export default class WhoIsCommand extends Command {
  constructor(client) {
    super(client, {
      name: "whois",
      description: "Who is dat?",
      group: "util",
      options: [
        {
          type: 6,
          name: "user",
          description: "Who is who?",
        },
      ],
    });
  }
  async run(message, command) {
    const usertxt = command.options ? command.options.user : command.author.id;

    const user = await this.client.util.ParseUser(usertxt, this.client);
    if (!user) return message.createMessage("Couldn't find user.");
    const member = await exists(user.id, message.channel.guild);
    const embed = new this.client.util.Embed()
      .setAuthor(`${user.username}#${user.discriminator}`, user.avatarURL)
      .addField("Bot?", user.bot ? "Yes" : "No", true)
      .addField("In this guild?", member ? "Yes" : "No", true)
      .setColor("#ff00c3")
      .setImage(user.avatarURL);

    return message.createMessage({ embeds: [embed.json()] });
  }
}

async function exists(id, guild) {
  try {
    const member = await guild.getRESTMember(id);
    if (member) return true;
    return false;
  } catch (e) {
    console.error(e);
    return false;
  }
}
