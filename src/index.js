const SlackBot = require("slackbots");
const axios = require("axios");
const fs = require("fs");
require("dotenv").config();

const bot = new SlackBot({
  token: `${process.env.OAUTH_TOKEN}`,
  name: "Assignments Bot",
});

bot.on("start", () => {
  console.log("I'm online");
});

bot.on("error", (error) => console.log(error));

bot.on("message", (data) => {
  if (data.type !== "message") {
    return;
  }

  const commandCheck = data.text.split(" ");
  console.log(commandCheck);
  if (commandCheck[0].indexOf("!") === 0) {
    messageEvent(data.text, data.channel, data.user);
  }
});

const messageEvent = (text, channel, user) => {
  if (text.includes(" prolang")) {
    /// get programming languages assignments
    fromText("pl.txt", user, "Programming Languages");
  } else if (text.includes(" comporg")) {
    // get comp org assignments
    fromText("comp.txt", user, "Computer Organization");
  } else if (text.includes(" cyber")) {
    fromText("cyber.txt", user, "Cyber Security");
    // get cyber assignments
  } else if (text.includes(" help")) {
    bot.postMessage(
      channel,
      "The available commands for the assignment bot are: \n! prolang \n! comporg \n! cyber \nType one of these commands to get the next three assignments due in the course you entered sent to you via dm. You can then set reminders on that message for additional notifications for the assignments."
    );
  } else {
    bot.postMessage(
      channel,
      "That isn't a valid command, use one of the following commands: help, prolang, comporg, or cyber"
    );
  }
};

function fromText(textFile, user, classText) {
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
      `The upcoming assignments for ${classText} are: \n ${assignmentString}`
    );
  });
}
