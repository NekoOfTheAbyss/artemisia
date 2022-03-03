import dialogflow from '@google-cloud/dialogflow';
const keyFile = "/home/kuro/googlecred.json"
const projectId = 'chat-cat-2e8be'

module.exports = async (mess, sesID) => {
const sessionId = sesID;
 // console.log("check")
  const sessionClient = new dialogflow.SessionsClient({keyFilename: keyFile});
  // console.log("check2")
  const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);
  // console.log("check3")
  // The text query request.
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: mess,
        languageCode: 'en-US',
      },
    },
  };
 // console.log("request")

  const responses = await sessionClient.detectIntent(request).catch(console.error);
  
  // console.log('Detected intent');
if(!responses) return "Do you really think you can speak like that towards the queen of the abyss?"
  const result = responses[0].queryResult;
  // console.log(`  Query: ${result.queryText}`);
  // console.log(`  Response: ${result.fulfillmentText}`);
  if (result.intent) {
    // console.log(`  Intent: ${result.intent.displayName}`);
  } else {
    // console.log(`  No intent matched.`);
  }
  return result.fulfillmentText
  
  }
  