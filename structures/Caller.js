import { Collection } from "@nekooftheabyss/lala";

class Caller {
    constructor(client, data, message) {
        this.client = client;
        this.message = message;
        this.command = data.name;
        this.type = data.type;
        this.options = null;
        if(data.options)  {
            this.options = data.options.reduce((acc,curr)=> {
                if(curr.type !== 1) acc[curr.name]=curr.value
                else acc["subcommand"] = curr;
                return acc
            },{});
        };
        this.mentions = {
            users: new Collection("Mentioned Users"),
            members: new Collection("Mentioned Members"),
            roles: new Collection("Mentioned Roles"),
            channels: new Collection("Mentioned Channels"),
        }
        if(data.resolved) {
            for(let item in data.resolved) {
                for(let stuff of data.resolved[item].values()) {
                    this.mentions[item].set(stuff.id, stuff)
                }
            }
        }
        this.author = message.user ? message.user : message.member.user;
    }
}
export default Caller;