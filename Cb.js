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
      message.channel.send(response);
    } catch (error) {
      console.error('Error:', error);
      message.channel.send('An error occurred while fetching response from ChatGPT.');
    }
  }
});

async function getChatGPTResponse(question) {
  const completion = await gpt.complete({
    engine: 'text-davinci-003', // Choose the model you want to use
    prompt: `Q: ${question}\nA:`, // Format the question for the prompt
    maxTokens: 150, // Maximum number of tokens for the response
  });

  const answer = completion.data.choices[0].text.trim();
  return answer;
}

client.login('YOUR_DISCORD_BOT_TOKEN'); // Replace with your Discord bot token
