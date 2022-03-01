
export default (client, guild, member) => {
  if (guild.id == "694443570270175293") {
    client.createMessage('853275259759230986', `${member.user.username} has left the server.`)
  }
};
