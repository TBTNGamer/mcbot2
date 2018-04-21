const botconfig = require("./botconfig.json");
const Discord = require("discord.js");

const bot = new Discord.Client({disableEveryone: true})

bot.on("ready", async () => {
  console.log('MC is online!');
  bot.user.setActivity("Doki Doki Literature Club");
});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  if(cmd === '?kick'){

    let kUser= message.guild.member(message.mention.users.first() || message.guild.members.get(args[0]));
    if(!kUser) return message.channel.send("Can't find user!");
    let kReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("No can do pal!");
    if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be kicked!");

    let kickEmbed = new Discord.RichEmbed()
    .setDescription("~Kick~")
    .setColor("#ffb200")
    .addField("Kicked User", '${kUser} with ID ${kUser.id}')
    .addField("Kicked By", '<@${message.author.id}> with ID ${message.author.id}')
    .addField("Kicked In", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", kReason);

    let kickChannel = message.guild.channels.find('name', "general");
    if(!kickChannel) return message.channel.send("Can't find general channel");

    message.guild.member(kUser).kick(kReason);
    kickChannel.send(kickEmbed);


    return;
  }



  if(cmd === '?report'){

    let rUser = message.guild.member(message.mention.users.first() || message.guild.members.get(args[0]));
    if(!rUser) return message.channel.send("Couldn't find user.");
    let reason = args.join(" ").slice(22);

    let reportEmbed = new Discord.RichEmbed()
    .setDescription("Reports")
    .setColor("#ffb200")
    .addField("Reported User", '${rUser} with ID: ${rUser.id}');

    message.channel.send(reportEmbed);
    return
  }




  if(cmd === '?serverinfo'){

    let sicon = message.guild.iconURL;
    let serverembed = new Discod.RichEmbed()
    .setDescription("Server Information")
    .setColor("#ffb200")
    .setThumbnail(sicon)
    .addField("Server Name", message.guild.name)
    .addField("Created On", message.guild.createdAt)
    .addField("You Joined", message.member.joinedAt)
    .addField("Total Members", message.guild.memberCount);

    return message.channel.send(serverembed);
}



if(cmd === '?botinfo'){

   let bicon = bot.user.displayAvatarURL;
   let botembed = new Discord.RichEmbed()
   .setDescription("Bot Information")
   .setColor("#ffb200")
   .setThumbnail(bicon)
   .addField("Bot Name", bot.user.username)
   .addField("Bot version", "1.0.0")
   .addField("Creator", "TBTNGamer")
   .addField("Description", "Hello, I'm MC, I represent the Main Character in Doki Doki Literature Club!")
   .addField("Created On", bot.user.createdAt);

   return message.channel.send(botembed);
  }


  if(cmd === '?hello'){
    return message.channel.send("Hello!");
  }

  if(cmd === '?ping'){
    return message.channel.send("Pong!");
  }

  if(cmd === '?mc'){
    return message.channel.send("Eh? Did somebody mention me?");
  }


});

bot.login(botconfig.token);
