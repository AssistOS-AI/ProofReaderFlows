export class Proofread {
    static id = "U5JQR4MRtzrP";
    static description = "Suggests an improved version of the text";

    static inputSchema=
        {
            text:"string",
            personalityId:"string",
            prompt:"string"
        };
    async start(context, personality) {
        this.prompt = `Please suggest an improved version of the following text: "${context.text}". ${context.prompt || "Improve it both semantically and grammatically"}. You will play the role of this personality: "${personality.name}", which has the following characteristics: "${personality.description}". You will make observations about the writing style of the given text and provide an improved version of the given text by playing the role of the given personality. The response should have the following structure: {\"observations\": \"observations about the given text\", \"improvedText\": \"the improved version of the given text\"}.`;
        await this.execute();
    }
    async execute() {
        let result = await this.proofread(this.prompt);
        try {
            this.return(JSON.parse(result));
        }catch (e) {
            this.fail(e);
        }

    }
}