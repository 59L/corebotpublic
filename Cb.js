const Discord = require('discord.js');
const { GPT, Completion } = require('openai');

const client = new Discord.Client();
const prefix = '!'; // Your desired command prefix
const openaiApiKey = 'YOUR_OPENAI_API_KEY'; // Replace with your OpenAI API key

const gpt = new GPT(openaiApiKey);

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async message => {
  if (message.author.bot) return; // Ignore messages from bots
  if (!message.content.startsWith(prefix)) return; // Ignore messages without prefix

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'ask') {
    const question = args.join(' ');

    try {
      const response = await getChatGPTResponse(question);
      message.chan
