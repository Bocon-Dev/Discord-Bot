module.exports = {
    type: 'messageReactionAdd',
    run: async (reaction, user) => {
        if(user.bot) return
        logs.log("first check");
  if (reaction.emoji.name === "✅") {
    logs.log("second check");
  }
    }}