const { OpenAIClient, AzureKeyCredential } = require("@azure/openai");
const azureApiKey = process.env[""] ;
const endpoint = process.env[""] ;

const prompt = ["When was Microsoft founded?"];

async function main() {
  console.log("== Get completions Sample ==");

  const client = new OpenAIClient("", new AzureKeyCredential(""));
  const deploymentId = "gpt-35-turbo-instruct";
  const result = await client.getCompletions(deploymentId, prompt);

  for (const choice of result.choices) {
    console.log(choice.text);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };

