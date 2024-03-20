const Discord = require('discord.js');
const fetch = require('node-fetch');

const client = new Discord.Client();
const prefix = '!'; // Your desired command prefix
const openaiApiKey = 'YOUR_OPENAI_API_KEY'; // Replace with your OpenAI API key

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
  const response = await fetch('https://api.openai.com/v1/answers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${openaiApiKey}`,
    },
    body: JSON.stringify({
      model: 'text-davinci-003', // Choose the model you want to use
      question: question,
      examples_context: 'Ask questions here...', // Provide examples context for better understanding
      max_tokens: 150, // Maximum number of tokens for the response
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const responseData = await response.json();
  const answer = responseData.answers[0].text;
  return answer;
}

client.login('YOUR_DISCORD_BOT_TOKEN'); // Replace with your Discord bot token
