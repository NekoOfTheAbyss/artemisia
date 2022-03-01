export default (client, interaction) => {
  if (interaction.type === 2) return client.dispatcher.handle(interaction);
  if (interaction.type === 3) {
    if (interaction.data.custom_id === "sus-or-not") {
        console.log(interaction.data)

    }
    else if (interaction.data.custom_id === "sus_click") {
      return client.createInteractionResponse(
        interaction.id,
        interaction.token,
        {
          type: 9,
          data: {
            custom_id: "sus-modal",
            title: "When the imposter is",
            components: [
              {
                type: 1,
                components: [
                  {
                    type: 4,
                    custom_id: "sus-or-not",
                    label: "sus?",
                    style: 1,
                    /*options: [
                      { label: "Sus", value: "sus" },
                      { label: "Not sus", value: "not-sus" },
                    ],*/
                  },
                ],
              },
            ],
          },
        }
      );
    }
  }
};
