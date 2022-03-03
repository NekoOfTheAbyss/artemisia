export default async (val, client) => {
  const matches = val.match(/^(?:<@!?)?([0-9]+)>?$/);
  if (matches) {
    try {
      const user = await client.getRESTUser(matches[1]);
      if (!user) return false;
      return user;
    } catch (err) {
      return false;
    }
  }
};
