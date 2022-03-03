class Command {
    constructor(client, data) {
      this.validateInfo(data);
      this.client = client;
      this.name = data.name;
      this.description = data.description || "";
      this.group = data.group;
      this.bossCommand = data.bossCommand || false;
      this.nsfw = data.nsfw ? true : false;
      this.textOnly = new Boolean(data.textOnly);
      this.options = data.options;
      this.slash = data.slash || true;
    }
    validateInfo(data) {
      if (!data.name || data.name.length > 32)
        throw new Error(`Name for ${data.name} is invalid.`);
      if (data.description && data.description > 100)
        throw new Error(`Description for ${data.name} is invalid.`);
      if (!data.group || data.group.length > 32)
        throw new Error(`Group ${data.group} for ${data.name} is invalid.`);
    }
    async update() {
      return await this.client.registry.updateCommand(this);
    }
    json() {
      return {
        name: this.name,
        description: this.description,
        type: 1,
        options: Array.isArray(this.options)
          ? this.options.map((x) => ({
              name: x.name,
              description: x.description,
              type: x.type,
              required: x.required || false,
              choices: x.choices || null,
              options: x.options || null,
            }))
          : [],
      };
    }
    async run(message) {
      return null;
    }
  }
export default Command;