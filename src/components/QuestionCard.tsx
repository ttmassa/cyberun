import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { Question } from '../types/Question'

interface QuestionCardProps {
    data: Question
}

const QuestionCard: React.FC<QuestionCardProps> = ({ data }) => {
    const [response, setResponse] = useState<string | null>(null)

    const handleAnswer = (choice: 'yes' | 'no') => {
        setResponse(data.answers[choice])
    }

    return (
        <div className="question-card">
            <h1>{data.question}</h1>
            <div>
                <Button
                    className='bt-1'
                    onClick={() => handleAnswer('yes')}
                >
                    Yes
                </Button>
                <Button
                    className='bt-2'
                    onClick={() => handleAnswer('no')}
                >
                    No
                </Button>
            </div>
            {response && <p className="response">{response}</p>}
        </div>
    )
}

export default QuestionCard
