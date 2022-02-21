import { Button, Divider, Modal, Text } from "@nextui-org/react";
import { FC, useState } from "react";
import styles from '../styles/Question.module.css'
import AnswerTile from "./answer";
import ScoredAnswerTile from "./scoredTile";
import { AnswerOption, QuestionProps } from "../utils/types";

const QuestionTile: FC<QuestionProps> = ({ question, index, setUserAnswers, isScored }): JSX.Element => {
    const [selected, setSelected] = useState({
        id: -1,
        text: ""
    })

    const storeAnswer = (answerOption: AnswerOption) => {
        setSelected(answerOption)
        setUserAnswers((oldArray: string[]) => {
            return oldArray.map((answer: string, i: number) => {
                return i === index ? answerOption.text : answer
            })
        })
    }

    return (
        <div className={styles.container}>
            <Divider />
            <h2 className={styles.number}>Q {index+1} <span className={styles.smallNumber}>/{' '}6</span></h2>
            <p className={styles.questionText}>
                {question.text}
            </p>
            <div className={styles.options}>
                {
                    isScored ? 
                    question.options.map((option: AnswerOption, index: number) => {
                        if(selected.id === question.answer.id && selected.id === option.id) {
                            // Correct answer tile
                            return <ScoredAnswerTile key={index} correct={true} selected={true} answerOption={option} />
                        } else if(selected.id !== question.answer.id && selected.id === option.id) {
                            // Wrond Answer Tile
                            return <ScoredAnswerTile key={index} correct={false} selected={true} answerOption={option} />
                        } else if(selected.id !== question.answer.id && question.answer.id === option.id) {
                            // Tile to indicate correct answer
                            return <ScoredAnswerTile key={index} correct={true} selected={false} answerOption={option} />
                        } else {
                            // Normal tile
                            return <ScoredAnswerTile key={index} correct={false} selected={false} answerOption={option} />
                        }
                    })
                    :
                    question.options.map((option: AnswerOption, index: number) => 
                        <AnswerTile selected={selected} setSelected={storeAnswer} key={index} answerOption={option} />
                    )
                }
            </div>
        </div>
    )
}

export default QuestionTile;