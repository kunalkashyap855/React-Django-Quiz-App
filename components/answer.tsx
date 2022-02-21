import { FC, useState } from "react";
import { Card } from "@nextui-org/react";
import { AnswerOptionProps } from "../utils/types";

const AnswerTile: FC<AnswerOptionProps> = ({ answerOption, selected, setSelected }): JSX.Element => {

    const bgColor = selected.id === answerOption.id ? 'primary' : 'default'

    return (
        <Card 
            clickable 
            color={bgColor} 
            bordered 
            shadow={false} 
            hoverable 
            css={{ mw: "400px" }}
            onClick={() => setSelected(answerOption)}
        >
            <p>{answerOption.text}</p>
        </Card>
    )
}

export default AnswerTile;