import { Collection } from "@nekooftheabyss/lala";

class MessageCaller {
  constructor(client, data, message) {
    this.client = client;
    this.message = message;
    this.command = data.name;
    this.type = data.type;
    this.options = null;
    if (data.options) {
      this.options = data.options.reduce(
        (acc, curr) => ((acc[curr.name] = curr.value), acc),
        {}
      );
    }
    this.mentions = {
      users: new Collection("Mentioned Users"),
      members: new Collection("Mentioned Members"),
      roles: new Collection("Mentioned Roles"),
      channels: new Collection("Mentioned Channels"),
    };
    if (message.mentions) {
      for (let user of message.mentions) {
        this.mentions.users.set(user.id, user);
      }
    }
    if (message.roleMentions) {
      for (let role of message.roleMentions) {
        this.mentions.roles.set(role.id, role);
      }
    }
    if (message.channelMentions) {
      for (let channel of message.channelMentions) {
        this.mentions.channels.set(channel.id, channel);
      }
    }

    this.author = message.author;
  }
}
export default MessageCaller;
