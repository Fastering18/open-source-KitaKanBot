const discord = require("discord.js"); //Package utama yang diperlukan untuk membuat bot dengan JavaScript

const dotconfig = require("dotenv").config();

const botToken = process.env.BotToken; //Bot token harus dirahasiakan
const client = new discord.Client();
const OwnerId = ["646346146553397258", "775363892167573535", "754325405346955295"]; //untuk menentukan pemilik berdasarkan User id (Discord)

let prefix = "b-" //ganti prefix sesuai keinginan anda

const serverBarBarLink = "https://discord.gg/PYD6epqqu7";  //server link BarBar
const serverBarbarId = "772804243496370217";               //server id BarBar
const channelWelcomeId = "772805898778705951";             //channel welcome id

let botStatus = `Join Server KitaKan Bar-Bar: ${serverBarBarLink}`; //pesan yang akan ditampilkan di status bot nya

const menyakinkan = [];
const gaboleh = [
    ".-."
]
let bolehSay = true
let bolehbypass = true  // "true" maka member dapat bypass, "false" member tidak dapat bypass
const helpDesc = `Prefix: **${prefix}**\n\n**Commands**\n${prefix}help\n${prefix}teswelcome\n${prefix}tesbye\n${prefix}prefix ${"`[prefix baru]`"}\n${prefix}say ${"`[Teks]`"}\n${prefix}eval ${"`[skrip]`"}\n${prefix}sayembed ${"`[Teks]`"}\n${prefix}totalmember\n${prefix}infoserver\n${prefix}atur ${"`[variabel]`"} ${"`[nilai]`"}`
const helpDesc2 = `Prefix terkini: **${prefix}**\n\n**Commands**\n${prefix}help\n${prefix}teswelcome\n${prefix}tesbye\n${prefix}prefix ${"`[prefix baru]`"}\n${prefix}say ${"`[Teks]`"}\n${prefix}eval ${"`[skrip]`"}\n${prefix}sayembed ${"`[Teks]`"}\n${prefix}totalmember\n${prefix}infoserver\n${prefix}atur ${"`[variabel]`"} ${"`[nilai]`"}`

function memberCount() {
    const guildsArray = client.guilds.cache
    for (var i = 0; i < guildsArray.size; i++) {
        console.log(JSON.stringify(guildsArray[i]))
        if (!guildsArray[i]) return;
        if (guildsArray[i].id === "772804243496370217") {
            const membercount = guildsArray[i].memberCount
            return membercount;
        };
    };
    return "";
};

function contains(target, pattern){
    var value = 0;
    pattern.forEach(function(word){
      value = value + target.toLowerCase().includes(word.toLowerCase());
    });
    return (value === 1)
}

function clean(text) {
    if (typeof (text) === "string")
        return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
}

client.on("ready", () => {
    console.log(`${client.user.username} telah aktif, id: ${client.user.id}`);
    client.user.setPresence({ activity: { name: botStatus }, status: "online" });

    /*setInterval(() => {
        countserver = memberCount()
        if (countserver !== 0 && countserver !== "") {
            botStatus += `\n${countserver} Members`
            client.user.setPresence({ activity: { name: botStatus }, status: "online" });
        }
    }, 60000);
    */
});
/*
Saat bot aktif, akan muncul pemberitahuan di output
jika bot tidak aktif dan menunjukan error, dapat segera beritahu saya
*/

client.on("message", async message => {
    //berisi commands bot dan lainnya
    const guild = message.guild;
    const pengirim = message.author;
    const mentahMSG = message.content.slice().toLowerCase()
    if (contains(mentahMSG, gaboleh) && !OwnerId.includes(pengirim.id) && (bolehbypass === false)) {
        const emoji = "❌"
        message.react(emoji).then(r=> {
             /*message.channel.send("Ga jelas lu anjir <@" + pengirim.id + ">").then(msg => {
                  msg.delete({timeout: 4000}).catch(console.error);
             })*/
             message.delete({timeout: 3000}).catch(console.error);
        })
        return;
    } else if ((mentahMSG === "y" || mentahMSG === "ya" || mentahMSG === "yes") && message.author.bot === false) {
        for (var i = 0; i < menyakinkan.length; i++) {
            if (menyakinkan[i].id === pengirim.id) {
                const data = menyakinkan[i];
                if (data.alasan === "prefix baru") {
                    prefix = data.konten;
                    menyakinkan.splice(i, 1);
                    return message.channel.send(`Prefix telah diubah ke ${"`" + data.konten + "`"}`);
                }
            }
        }
    } else if (mentahMSG === "t" || mentahMSG === "tidak" || mentahMSG === "no") {
        for (var i = 0; i < menyakinkan.length; i++) {
            if (menyakinkan[i].id === pengirim.id) {
                const data = menyakinkan[i];
                if (data.alasan === "prefix baru") {
                    menyakinkan.splice(i, 1);
                    return message.channel.send(`Prefix baru telah dibatakan`);
                }
            }
        }
    } else if (message.content.slice() === `<@!${client.user.id}>` || message.content.slice() === `<@${client.user.id}>`) {
        const embed = new discord.MessageEmbed()
            .setTitle(`Lupa dengan prefix ?`)
            .setDescription(helpDesc2)
            .setTimestamp()
            .setFooter(`${guild.name}'s server`)
            .setColor('WHITE');
        return message.channel.send(embed);
    }

    if (message.author.bot) return;
    if (message.content.indexOf(prefix) !== 0) return;

    const args = message.content
        .slice(prefix.length)
        .trim()
        .split(/ +/g);
    const command = args.shift().toLowerCase();

    if (command === "teswelcome" || command === "testwelcome") {
        if (!OwnerId.includes(message.author.id)) return message.channel.send(`${"`" + command + "`"} command hanya untuk owner!`);
        try {
            client.emit('guildMemberAdd', message.member);
        } catch (err) {
            console.log(err);
            return message.channel.send("terdapat error! coba check di output.");
        };
        const channel = guild.channels.cache.get(channelWelcomeId)
        if (!channel) return;
        return message.channel.send("__**Command Berhasil ditest, jika ingin liat cek disini**__:\n >> " + channel.toString());
    } else if (command === "help") {
        const embed = new discord.MessageEmbed()
            .setTitle(`Daftar commands, bot ${client.user.username}`)
            .setDescription(helpDesc)
            .setTimestamp()
            .setFooter(`${guild.name}'s server`)
            .setColor('WHITE');
        return message.channel.send(embed);
    } else if (command === "prefix") {
        if (!OwnerId.includes(message.author.id)) return message.channel.send(`${"`" + command + "`"} command hanya untuk owner!`);
        for (var i = 0; i < menyakinkan.length; i++) {
            if (menyakinkan[i].id === pengirim.id) {
                menyakinkan.splice(i, 1);
            }
        }
        const prefixBaru = args.slice(0).join(" ");
        if (!prefixBaru) return message.channel.send(`harap menggunakan format: ${prefix + "prefix `[prefix baru]`"}`)
        menyakinkan.push({ id: message.author.id, alasan: "prefix baru", konten: prefixBaru });
        return message.channel.send(`Apakah prefix ${"`" + prefixBaru + "`"} sudah benar?\nketik **y** untuk melanjutkan, ketik **t** untuk membatalkan.`);
    } else if (command === "tesbye" || command === "testbye") {
        if (!OwnerId.includes(message.author.id)) return message.channel.send(`${"`" + command + "`"} command hanya untuk owner!`);
        try {
            client.emit('guildMemberRemove', message.member);
        } catch (err) {
            console.log(err);
            return message.channel.send("terdapat error! coba check di output.");
        };
        const channel = guild.channels.cache.get(channelWelcomeId)
        if (!channel) return;
        return message.channel.send("__**Command Berhasil ditest, jika ingin liat cek disini**__:\n >> " + channel.toString());
    } else if (command === "say" || command === "bilang" || command === "katakan") {
        if (bolehSay === false && !OwnerId.includes(message.author.id)) return message.channel.send(`<@${pengirim.id}> Command ini tidak diperbolehkan untuk sementara!`);
        const messageToSay = args.slice(0).join(" ");
        if (!messageToSay) {
            return message.channel.send("harap menggunakan format: `" + prefix +"say [text]`");
        }
        let id = guild.roles.everyone.id;
        if ((messageToSay.toLowerCase().includes(`<@&${id}>`) || messageToSay.toLowerCase().includes("@everyone")) && !OwnerId.includes(message.author.id)) return message.channel.send(`<@${pengirim.id}> hayo mau ping epriwan yaa`);
        message.delete({ timeout: 5 }).then(function (hasil) {
        }).catch(function (err) {
        });
        return message.channel.send(messageToSay);
    } else if (command === "eval") {
        if (!OwnerId.includes(message.author.id)) return;
        try {
            const code = args.slice(0).join(" ");
            let evaled = eval(code);

            if (typeof evaled !== "string")
                evaled = require("util").inspect(evaled);

            message.channel.send(clean(evaled), { code: "xl" });
        } catch (err) {
            message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
        }
    } else if (command === "sayembed") {
        const messageToSay = args.slice(0).join(" ");
        if (!messageToSay) {
            return message.channel.send("harap menggunakan format: `" + prefix +"sayembed [pesan]`");
        }
        message.delete({ timeout: 5 }).then(function (hasil) {
        }).catch()
        var embed = new discord.MessageEmbed()
        .setDescription(messageToSay)
        .setFooter(`Dari ${message.author.tag}`);
        
        return message.channel.send(embed)
    } else if (command === "totalmember") {
        return message.channel.send(`Terdapat ${guild.memberCount} member di server ini.`);
    } else if (command === "infoserver") {
        const embed = new discord.MessageEmbed()
            .setTitle(`Info Server __**${guild.name}**__`)
            .setThumbnail(guild.iconURL())
            .setDescription(`Member ${guild.name} saat ini\n>>>>>>>>**[-♦︎${message.member.guild.memberCount}♦︎-]**<<<<<<<<\n\nUndang teman teman kalian\nkesini untuk meramaikan\nserver ini`)
            .setTimestamp()
            .setFooter(`${guild.name}'s Server`)
            .setColor('GREEN');
        return message.channel.send(embed);
    } else if (command === "set" || command === "atur" || command === "setting") {
        if (!OwnerId.includes(message.author.id)) return message.channel.send(`${"`" + command + "`"} command hanya untuk owner!`);
        const variableName = args[0];
        const valueName = args[1];
        if (!variableName || !valueName) return message.channel.send("Harap menggunakan format: " + prefix + "set `[opsi]` `[nilai]`");
        if (variableName.toLowerCase() === "bolehsay") {
             const boolValue = (valueName.toLowerCase() == "false" || valueName.toLowerCase() == "mati" || valueName.toLowerCase() == "off") ? false : (valueName.toLowerCase() == "true" || valueName.toLowerCase() === "hidup" || valueName.toLowerCase() == "on") ? true : undefined;
             if (boolValue === undefined) return message.channel.send("Input nilai yang salah! (" + valueName + ")");
             bolehSay = boolValue;
             return message.channel.send(`Member sekarang ${boolValue === true ? "dapat menggunakan `say`" : "tidak dapat menggunakan `say`"} command!`);
        } else if (variableName.toLowerCase() === "bolehbypas") {
              const boolValue = (valueName.toLowerCase() == "false" || valueName.toLowerCase() == "mati" || valueName.toLowerCase() == "off") ? false : (valueName.toLowerCase() == "true" || valueName.toLowerCase() === "hidup" || valueName.toLowerCase() == "on") ? true : undefined;
             if (boolValue === undefined) return message.channel.send("Input nilai yang salah! (" + valueName + ")");
             bolehbypass = boolValue;
             return message.channel.send(`Member sekarang ${boolValue === true ? "dapat bypass" : "tidak dapat bypass"}`);
        }
    } 
});

client.on("guildMemberAdd", member => {
    //akan muncul sendiri saat ada member join
    if (member.guild.id === serverBarbarId) {
        const channel = member.guild.channels.cache.get(channelWelcomeId);
        if (!channel) return console.log("channel ID nya tidak terdapat di server BarBar, tolong masukkan channel ID yang baru ya.");
        //let welcomeTeksJadi = welcomeTeks.replace(/{member}/gi, `<@${member.id}>`).replace(/{server}/gi, member.guild.name);
        const memberTag = `${member.user.username}#${member.user.discriminator}`
        const welcomeTeks = new discord.MessageEmbed()
            .setTitle(`[+] ${memberTag} telah bergabung di ${member.guild.name}`)
            .setDescription(`Halo **${memberTag}** Terimakasih telah bergabung dengan kami!\nAnda adalah member ke **${member.guild.memberCount}** yang telah bergabung dengan kami di Discord Server ini!\nJangan lupa baca peraturannya!`)
            .setTimestamp()
            .setColor('GRAY');

        return channel.send(welcomeTeks).then().catch(console.log);
    }
});

client.on("guildMemberRemove", member => {
    //akan muncul sendiri saat ada member keluar
    if (member.guild.id === serverBarbarId) {
        const channel = member.guild.channels.cache.get(channelWelcomeId);
        if (!channel) return console.log("channel ID nya tidak terdapat di server BarBar, tolong masukkan channel ID yang baru ya.");
        //let welcomeTeksJadi = welcomeTeks.replace(/{member}/gi, `<@${member.id}>`).replace(/{server}/gi, member.guild.name);
        const memberTag = `${member.user.username}#${member.user.discriminator}`
        const welcomeTeks = new discord.MessageEmbed()
            .setTitle(`[-] ${memberTag} telah meninggalkan ${member.guild.name}`)
            .setDescription(`Selamat tinggal **${memberTag}**, server kami sekarang berjumlah **${member.guild.memberCount}** member di Discord Server ini, berharap dapat melihat anda kembali!`)
            .setTimestamp()
            .setColor('GRAY');

        return channel.send(welcomeTeks).then().catch(console.log);
    }
});

client.login(botToken); //rahasiakan ini
