import welcome from "../functions/welcome.js";

export default async (client, guild, member) => {
  if (guild.id == "694443570270175293") {
    const welcomeImg = await welcome(member);
    const attachment = { file: welcomeImg.toBuffer(), name: "yourlife.png" };

    client.createMessage(
      "853275259759230986",
      `<@${member.id}> has joined the server.\nTake a look at <#857231833132302356> before you start chatting!`,
      attachment
    );
    client.createMessage(
      "811992214237872139",
      `Welcome to **Kuro's Abyss**, <@${member.id}>!`
    );
  }

  if (guild.id == "902120553903718400") {
    const welcomeImg = await welcome(member, "eec");
    const attachment = { file: welcomeImg.toBuffer(), name: "yourlife.png" };
    let chan = await client.getDMChannel(member.id);

    client.createMessage(
      chan.id,
      `Welcome to **EEC 21-25 batch's server**, <@${member.id}>! Select your roles from <#902139185417302038> before you start chatting!`
    );
    client.createMessage(
      "902120553903718405",
      `<@${member.id}> has joined the server.`,
      attachment
    );
  }

  return;
};
