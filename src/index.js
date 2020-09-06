const SlackBot = require("slackbots");
const axios = require("axios");
require("dotenv").config();

const bot = new SlackBot({
  token: `${process.env.OAUTH_TOKEN}`,
  name: "Assignments Bot",
});

bot.on("start", () => {
  const params = {
    icon_emoji: "::cat",
  };

  bot.postMessageToChannel("general", "Here comes the good stuff", params);
});

bot.on("error", (error) => console.log(error));

bot.on("message", (data) => {
  if (data.type !== "message") {
    return;
  }
  messageEvent(data.text);
});

const messageEvent = (text) => {
  if (text.includes(" prolang")) {
    /// get programming languages assignments
  } else if (text.includes(" comporg")) {
    // get comp org assignments
  } else if (text.includes(" cyber")) {
    // get cyber assignments
  }
};
