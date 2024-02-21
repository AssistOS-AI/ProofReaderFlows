export class Proofread {
    static id = "U5JQR4MRtzrP";
    static description = "Suggests an improved version of the text";
    static parameters=[
        {
            name: "text",
            type: "string",
            description: "the text to be corrected",
            optional: false,
        },
        {
            name: "personalityId",
            type: "string",
            description: "id of the personality that will perform the proofread",
            optional: true,
        },
        {
            name: "prompt",
            type: "string",
            description: "additional details about the proofread",
            optional: true,
        },
    ]
    constructor() {

    }

    start(text, personalityId, prompt) {
        if (personalityId) {
            let personality = webSkel.currentUser.space.getPersonality(personalityId);
            this.prompt = `Please suggest an improved version of the following text: "${text}". ${prompt || "Improve it both semantically and grammatically"}. You will play the role of this personality: "${personality.name}", which has the following characteristics: "${personality.description}". You will make observations about the writing style of the given text and provide an improved version of the given text by playing the role of the given personality. The response should have the following structure: {\"observations\": \"observations about the given text\", \"improvedText\": \"the improved version of the given text\"}.`;
        } else {
            this.prompt = `Please suggest an improved version of the following text: "${text}". ${prompt || "Improve it both semantically and grammatically"}. You will make observations about the writing style of the given text and provide an improved version of the given text. The response should have the following structure: {\"observations\": \"observations about the given text\", \"improvedText\": \"the improved version of the given text\"}.`;
        }

        this.setDefaultValues();
        this.setIntelligenceLevel(3);
        this.execute();
    }

    async execute() {
        let result = await this.proofread(this.prompt);
        this.return(result);
    }
}