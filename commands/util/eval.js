import Command from "../../structures/Command.js";
import { Discord } from "../../config.js";
import Eris from "eris"
import lala from "@nekooftheabyss/lala";
import fetch from 'node-fetch'
import tags from "common-tags";
import util from "util";
const nl = "!!NL!!";
const nlPattern = new RegExp(nl, "g");

export default class EvalCommand extends Command {
  constructor(client) {
    super(client, {
      name: "eval",
      description: "boss command",
      group: "util",
      bossCommand: true,
      options: [
        {
          type: 2,
          name: "script",
          description: "Who is who?",
        },
      ],
    });
  }
  async run(message, command) {
    if (!command.options) return false;
    const script = command.options.script;

    const client = this.client;
    const lastResult = this.lastResult;
    const doReply = (val) => {
      if (val instanceof Error) {
        message.createMessage(`Callback error: \`${val}\``);
      } else {
        const result = this.makeResultMessages(
          val,
          process.hrtime(this.hrStart)
        );
        if (Array.isArray(result)) {
          for (const item of result) message.createMessage(item);
        } else {
          message.createMessage(result);
        }
      }
    };
    /* eslint-enable no-unused-vars */

    // Run the code and measure its execution time
    let hrDiff;
    try {
      const hrStart = process.hrtime();
      this.lastResult = eval(script);
      hrDiff = process.hrtime(hrStart);
    } catch (err) {
      return message.createMessage(`Error while evaluating: \`${err}\``);
    }

    // Prepare for callback time and respond
    this.hrStart = process.hrtime();
    const result = this.makeResultMessages(
      this.lastResult,
      hrDiff,
      script
    );
    if (Array.isArray(result)) {
      return result.map((item) => message.createMessage(item));
    } else {
      return message.createMessage(result);
    }
  }

  makeResultMessages(result, hrDiff, input = null) {
    const inspected = util
      .inspect(result, { depth: 0 })
      .replace(nlPattern, "\n")
      .replace(this.sensitivePattern, "--curious, are we not?--");
    const split = inspected.split("\n");
    const last = inspected.length - 1;
    const prependPart =
      inspected[0] !== "{" && inspected[0] !== "[" && inspected[0] !== "'"
        ? split[0]
        : inspected[0];
    const appendPart =
      inspected[last] !== "}" &&
      inspected[last] !== "]" &&
      inspected[last] !== "'"
        ? split[split.length - 1]
        : inspected[last];
    const prepend = `\`\`\`javascript\n${prependPart}\n`;
    const append = `\n${appendPart}\n\`\`\``;
    if (input) {
      return this.client.util.Extra.splitMessage(
        tags.stripIndents`
				*Time Taken: ${hrDiff[0] > 0 ? `${hrDiff[0]}s ` : ""}${hrDiff[1] / 1000000}ms.*
				\`\`\`javascript
				${inspected}
				\`\`\`
			`,
        { maxLength: 1900, prepend, append }
      );
    } else {
      return this.client.util.Extra.splitMessage(
        tags.stripIndents`
				*Time Taken for Callback: ${hrDiff[0] > 0 ? `${hrDiff[0]}s ` : ""}${
          hrDiff[1] / 1000000
        }ms.*
				\`\`\`javascript
				${inspected}
				\`\`\`
			`,
        { maxLength: 1900, prepend, append }
      );
    }
  }

  get sensitivePattern() {
    if (!this._sensitivePattern) {
      let token = Discord;
      let pattern = "";
      if (token) pattern += this.client.util.EscapeRegex(token);
      Object.defineProperty(this, "_sensitivePattern", {
        value: new RegExp(pattern, "gi"),
        configurable: false,
      });
    }
    return this._sensitivePattern;
  }
}
