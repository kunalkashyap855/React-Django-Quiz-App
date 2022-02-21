export type Question = {
    id: number,
    text: string,
    answer: AnswerOption,
    options: AnswerOption[],
}

export interface QuestionProps {
    question: Question;
    index: number;
    setUserAnswers: any;
    isScored: boolean;
}

export type AnswerOption = {
    id: number,
    text: string,
}

export interface AnswerOptionProps {
    answerOption: AnswerOption;
    selected: AnswerOption;
    setSelected: any;
}

export interface ScoredAnswerProps {
    answerOption: AnswerOption;
    selected: boolean;
    correct: boolean
}