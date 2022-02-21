import { FC, useState } from "react";
import { Card } from "@nextui-org/react";
import { ScoredAnswerProps } from "../utils/types";

const ScoredAnswerTile: FC<ScoredAnswerProps> = ({ correct, selected, answerOption }): JSX.Element => {

    const bgColor = correct && selected ? 'success' : !correct && selected ? 'error' : correct && !selected ? 'success' : 'default'

    return (
        <Card 
            color={bgColor} 
            // bordered
            shadow={false}
            css={{ mw: "400px" }}
        >
            <p>{answerOption.text}</p>
        </Card>
    )
}

export default ScoredAnswerTile;