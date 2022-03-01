import fs from "fs";

import { Collection } from "@nekooftheabyss/lala";

const disURL =
  "https://discord.com/api/v8/applications/700413931214209197/guilds/811992214237872139/commands";
import fetch from "node-fetch";
import { Discord } from "../config.js";


class Registry {
  constructor(client) {
    this.client = client;
    this.commands = new Collection("Commands");
  }
  async reRegisterAll() {
    this.updateCommands(this.commands.array());
  }
  async registerCommands(dir) {
    const direc = fs.readdirSync(dir);
    for (const group of direc) {
      const files = fs.readdirSync(`${dir}/${group}/`);
      const commands = [];
      for (const file of files) {
        const command = await import(`${dir}/${group}/${file}`);
        commands.push(command.default);
      }
      commands.forEach((command) => {
        const cmd = new command(this.client);
        this.commands.set(cmd.name, cmd);
      });
    }
  }

  async updateCommand(command) {
    const cmdjson = command.json();
    const resp = await fetch(disURL, {
      method: "POST",
      headers: {
        Authorization: `Bot ${Discord}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cmdjson),
    });
    const res = await resp.json();
    return res;
  }
  async updateCommands(commands) {
    const cmdjson = commands.map((x) => x.json());
    console.log(JSON.stringify(cmdjson));
    const resp = await fetch(disURL, {
      method: "PUT",
      headers: {
        Authorization: `Bot ${Discord}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cmdjson),
    });
    const res = await resp.json();
    return res;
  }
  async registerIfNot() {
    const registered = await this.fetchCommands();
    const regArray = registered.map((x) => x.name);
    const toRegister = this.commands.filter((x) => !x.slash && !regArray.includes(x.name));
    if (toRegister.length > 0) {
      const res = [];
      for (let cmd of toRegister) {
        await this.updateCommand(cmd);
        res.push(toRegister);
      }
      return res;
    }
    return false;
  }
  async fetchCommands() {
    const resp = await fetch(disURL, {
      method: "GET",
      headers: { Authorization: `Bot ${Discord}` },
    });
    const res = await resp.json();
    return res;
  }
}

export default Registry