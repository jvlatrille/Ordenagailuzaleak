export class QuestionModel {
    question: string;
    reponses: string[];
    responseCorresctIndex: number;

    constructor(question: string, reponses: string[], index: number) {
        this.question = question;
        this.reponses = reponses;
        this.responseCorresctIndex = index;
    }
}
