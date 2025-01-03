import React from 'react'
import questionData from './data/questions.json'
import { Question } from './types/Question'
import QuestionCard from './components/QuestionCard.tsx'

export default function App() {
    const question: Question = questionData

    return (
        <React.StrictMode>
            <main className="main--container">
                <QuestionCard data={question} />
            </main>
        </React.StrictMode>
    )
}