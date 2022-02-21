import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useState } from 'react'
import { Button, Loading, Modal, Text } from '@nextui-org/react'
import QuestionTile from '../components/question'
import getAllQuestions from '../crud/quiz_api.crud'
import { Question } from '../utils/types'

const Home: NextPage = () => {

  const [isLoading, setLoading] = useState(false)
  const [questions, setQuestions] = useState([])
  const [userAnswers, setUserAnswers] = useState([
    "NULL", "NULL", "NULL", "NULL", "NULL", "NULL"
  ])
  const [visible, setVisible] = useState(false)
  const [showSubmit, setShowSubmit] = useState(false)
  const [score, setScore] = useState(0)
  const [isScored, setIsScored] = useState(false)

  const startQuiz = () => {
    setLoading(true)
    getAllQuestions()
      .then(data => {
        setQuestions(data.sort(() => Math.random() - 0.5))
        setLoading(false)
        setShowSubmit(true)
        // Remove/disable start button
      })
      .catch(err => alert("Error occurred in fetching questions. Please try again."))
  }

  const closeHandler = () => {
      setVisible(false);
  };

  const handleSubmit = () => {
      let flag = true;
      userAnswers.every((answer: string) => {
        if(answer === "NULL") {
          alert("Please answer all questions before submitting.")
          flag = false;
          return false;
        }

        return true;
      })

      if(flag) {
        setVisible(true)
      }
  }

  const gradeQuiz = () => {
    setLoading(true)
    let marks = 0;
    questions.forEach((ques: Question, i: number) => {
      if(ques.answer.text === userAnswers[i]) {
        marks = marks + 1;
      }
    })
    setScore(marks)
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
    setTimeout(() => {
      setLoading(false)
      setVisible(false)
      setIsScored(true)
    }, 2000)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Udemy Quiz App</title>
        <meta name="description" content="Udemy Quiz App Internship Challenge" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Udemy <span style={{ color: "#0070f3"}}>Quiz App!</span>
        </h1>

        <p className={styles.description}>
          Kunal Kashyap | kk4564@nyu.edu
        </p>

        {
          !showSubmit ?
          <Button 
            color="primary" 
            size="xl" 
            clickable={!isLoading} 
            onClick={startQuiz}
            auto 
            ghost 
            className={styles.startButton}
          >
            {
              isLoading ? <Loading type="points" color="white" size="sm" /> : "Start"
            }
          </Button>
          : <div></div>
        }

        {
          isScored ?
          <div className={styles.scoreContainer}>
            <h3>You Scored:</h3>
            <h1 className={styles.score}>{score} <span className={styles.total}>/{' '}6</span></h1>  
            <p>Review your answers and the correct answers below.</p>
          </div>
          : <div></div>
        }

        <div className={styles.grid}>
          {
            questions
              .map((question: Question, index: number) => 
                <QuestionTile 
                  key={question.id} 
                  question={question} 
                  index={index} 
                  setUserAnswers={setUserAnswers} 
                  isScored={isScored}
                />
              )
          }
        </div>

        {
          showSubmit && !isScored ? 
            <Button color="success" size="xl" className={styles.submitBtn} onClick={handleSubmit}>Submit</Button> 
            : isScored ? <Button color="primary" auto ghost size="xl" className={styles.submitBtn} onClick={() => window.location.reload()}>Finish</Button> 
            : <div></div>
        }
        
        <Modal
          closeButton
          aria-labelledby="modal-title"
          open={visible}
          onClose={closeHandler}
        >
          <Modal.Header>
              <Text id="modal-title" size={18}>
                  Are you sure you want to finish the quiz and submit your answers?
              </Text>
          </Modal.Header>
          <Modal.Body>

          </Modal.Body>
          <Modal.Footer>
              <Button auto light color="error" onClick={closeHandler}>
                  No, Review
              </Button>
              <Button auto color="success" onClick={gradeQuiz}>
                {
                  isLoading ? <Loading color="white" size="sm" /> : "Yes, Submit"
                }
              </Button>
          </Modal.Footer>
        </Modal>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://github.com/kunalkashyap855"
          target="_blank"
          rel="noopener noreferrer"
        >
          See the code on Github.
        </a>
      </footer>
    </div>
  )
}

export default Home
