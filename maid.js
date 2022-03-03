import Client from "./structures/Client.js";
import { Discord } from "./config.js";
import { dirname } from "path";
import { fileURLToPath } from "url";
import fs from 'fs'
const __dirname = dirname(fileURLToPath(import.meta.url));

const client = new Client(Discord, {
  commandPrefix: "maid",
  owner: "254950404050255872",
  unknownCommandResponse: false,
  intents: [
    "guildMembers",
    "guilds",
    "guildMessages",
    "guildMessageReactions",
    "directMessages",
    "directMessageReactions",
  ],
  allowedMentions: {
    everyone: false,
    roles: false,
    users: true,
    repliedUser: true,
  },
  messageLimit: 10,
  restMode: true,
  defaultImageSize: 1024,
  disableEvents: [
    "CHANNEL_CREATE",
    "CHANNEL_UPDATE",
    "CHANNEL_DELETE",
    "GUILD_BAN_ADD",
    "GUILD_BAN_REMOVE",
    "GUILD_ROLE_CREATE",
    "GUILD_ROLE_DELETE",
    "GUILD_ROLE_UPDATE",
    "MESSAGE_DELETE_BULK",
  ],
});

const eventFiles = fs.readdirSync(__dirname + "/events/");

for (const file of eventFiles) {
  const eventHandler = await import(`./events/${file}`);
  const eventName = file.split(".")[0];
  console.log(`Registering handler ${eventHandler.default ? "successful" : "failed"} for client's ${eventName} event.`)
  client.on(eventName, (...args) => eventHandler.default(client, ...args));
}

await client.registry.registerCommands(__dirname + "/commands/");
console.log(client.registry.commands.map((x) => x.name));
console.log(`A total of ${client.registry.commands.size} commands cached.`);
//console.log(await client.registry.updateCommands(client.registry.commands.map(x => x)))
//console.log(JSON.stringify(await client.registry.commands.get("kuro").update()))
//console.log(await client.registry.commands.get("gif").json())
// setTimeout(() => console.log(client.medea.abilities.cache.map(x => x.ID)), 3000)
client.connect();
