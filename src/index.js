const SlackBot = require("slackbots");
const axios = require("axios");
const fs = require("fs");
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
  messageEvent(data.text, data.channel, data.user);
});

const messageEvent = (text, channel, user) => {
  if (text.includes(" prolang")) {
    /// get programming languages assignments
    fromText("pl.txt", user);
  } else if (text.includes(" comporg")) {
    // get comp org assignments
  } else if (text.includes(" cyber")) {
    // get cyber assignments
  }
};

function fromText(textFile, user) {
  fs.readFile(textFile, (err, data) => {
    if (err) {
      console.log(error);
    }
    const assignments = data.toString().split("\n");
    assignmentString = "";
    assignments.forEach((assignment) => {
      assignmentString += assignment;
      assignmentString += "\n";
    });
    bot.postMessage(
      user,
      `The upcoming assignments for Programming language are: \n ${assignmentString}`
    );
  });
}
