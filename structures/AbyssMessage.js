import { Message } from "eris";

export default class AbyssMessage extends Message {
  constructor(data, client) {
    super(data, client);
    this._response = null;
  }
  async createMessage(content) {
    if (typeof content === "string") {
      const sent = await this.channel.createMessage({
        content,
        messageReference: { channelID: this.channel.id, messageID: this.id },
      });
      this._response = sent?.id;
      return sent;
    }

    const sent = await this.channel.createMessage({
      ...content,
      messageReference: { channelID: this.channel.id, messageID: this.id },
    });
    this._response = sent?.id;
    return sent;
  }
  async editOriginalMessage(content) {
    if (typeof content === "string") {
      return await this.channel.editMessage(this._response, {
        content,
        messageReference: { channelID: this.channel.id, messageID: this.id },
      });
    }

    return await this.channel.editMessage(this._response, {
      ...content,
      messageReference: { channelID: this.channel.id, messageID: this.id },
    });
  }
}
