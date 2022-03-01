import {
  Client as ErisClient,
  Collection as ErisCollection,
  User as ErisUser,
} from "eris";
import Dispatcher from "./Dispatcher.js";
import Registry from "./Registry.js";

import Color from "../util/Color.js";
import Embed from "../util/Embed.js";
import AddCommas from "../util/AddCommas.js";
import EscapeRegex from "../util/EscapeRegex.js";

class Client extends ErisClient {
  constructor(token, options) {
    super(token, options);
    this.rawOptions = options;
    this.util = {
      Color,
      Embed,
      AddCommas,
      EscapeRegex,
    };
    this.commandPrefix = options.commandPrefix;
    this.owner = options.owner;
    this.users = new ErisCollection(ErisUser, 10);
    this.dispatcher = new Dispatcher(this);
    this.registry = new Registry(this);
  }
}

export default Client;
