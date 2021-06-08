module.exports = {
    type: 'messageReactionAdd',
    run: async (reaction, user) => {
        if(user.bot) return
        logs.send("first check");
  if (reaction.emoji.name === "✅") {
    logs.send("second check");
  }
    }}