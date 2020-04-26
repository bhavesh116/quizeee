import React, { useReducer, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled, {css} from 'styled-components'
import { getQuizDataInitiate ,submitQuizInitiate } from '../../redux/actions/quizActions'
import { cloneDeep } from 'lodash'
import GaugeChart from 'react-gauge-chart'
import config from '../../config/config.json'
import checked from '../../static/checked.png'
import remove from '../../static/remove.png'

import CommonHeader from '../Common/Header'
import CommonFooter from '../Common/Footer'

const Wrapper = styled.div`
 height: 100%;
 width: 100%;
`

const CreateQuizCard = styled.div`
 min-height: 210px;
 margin: 20px 8px;
 display: flex;
 padding: 10px 0px;
 align-items: center;
 flex-direction: column;
 border: 1px solid #745c97;
 border-radius: 8px;
`

const StyledInput = styled.input`
 height: 40px;
 width: 100%;
 font-size: 18px;
 padding: 0px 5px;
 border-radius: 8px;
 border: 1px solid #d597ce;
`

const CardHeader = styled.div`
 display: flex;
 justify-content: center;
 padding: 5px 0px;
 font-size: 25px;
 color: grey;
 width:100%;
`

const Label = styled.div`
 font-size: 22px;
 margin-bottom: 5px;
 color: grey;
 ${({size}) => size && css`
  font-size: ${size}px;
  text-align: center;
 `}
 ${({required}) => required && css`
 color: red;
 `}
`

const ActionContainer = styled.div`
 display: flex;
 padding: 10px;
 width: 100%;
 flex-direction: column;
 ${({noTop}) => noTop && css`
  margin-top: 0px;
 `}

 ${({bottom}) => bottom && css`
  margin-bottom: 20px;
 `}
`

const Button = styled.div`
 height: 40px;
 width: 100%;
 display: flex;
 justify-content: center;
 align-items: center;
 background-color: #d597ce;
 border-radius: 8px;
 font-family: "Comic Sans MS", cursive, sans-serif;
 font-size: 18px;
 color: white;
 box-shadow: 2px 2px 7px #745c97;
 margin-top: 8px;
 &:active {
  box-shadow: 1px 3px 5px #745c97;
  transform: translateY(3px)
 }
`

const ChoicesWrapper = styled.div`
 display: grid;
 width: 100%;
 grid-template-columns: auto auto;
`

const StyledImage = styled.img`
 height: 90px;
 width: 90px;
 margin: 7px;
 ${({choice}) => choice && css`
  height: 60px;
  width: 60px;
  opacity: 0.9;
 `}
`
const ImageContainer = styled.div`
 display: flex;
 align-items: center;
 justify-content: center;
 flex-direction: column;
 &: active {
   background-color: #f1f1f1;
 }
`
const QuizIndicatorWrapper = styled.div`
 display: flex;
 justify-content: space-between;
 width: 100%;
 margin-bottom: 10px;
`
const QuizIndicator = styled.div`
 height: 20px;
 width: 20px;
 border-radius: 50px;
 background-color: #f1f1f1;
 ${({filled}) => filled && css`
 background-color: #d597ce;
 `}
`
const ChoiceItem = styled.div`
 position: absolute;
 margin: 10px 35px;
`

const Dashboard = styled.table`
 min-height: 50px;
 width: 95%;
 box-shadow: 1px 1px  10px grey;
 border-radius: 5px;
 margin-bottom: 15px;
`


const Tr = styled.tr`

`

const Th = styled.th`
 border: 1px solid #f1f1f1;
 height: 40px;
 min-width: 60px;
`
const Td = styled.td`
 text-align: center;
 height: 30px;
 min-width: 60px;
 border-bottom: 1px solid #f1f1f1;
`

const CreateOrTry = styled.div`
 display: flex;
 width: 100%;
 padding: 0px 20px;
 margin-bottom: 20px;
 justify-content: space-between
`

const CreateTryButton = styled.div`
 height: 40px; 
 padding: 0px 10px;
 display: flex;
 justify-content: center;
 align-items: center;
 background-color: ${({bgColor})=> bgColor};
 border-radius: 8px;
 font-family: "Comic Sans MS", cursive, sans-serif;
 font-size: 15px;
 color: white;
 box-shadow: 2px 2px 7px ${({bgColor})=> bgColor};
 margin-top: 8px;
 &:active {
 box-shadow: 1px 3px 5px ${({bgColor})=> bgColor}; 
 transform: translateY(3px)
 }
`


const { questionsData } = config 
const CreateQuiz = (props) => {
    const initialState = {
      name: '',
      required: false,
      startQuiz: false,
      quesAndAns: [],
      quizIndex: 0,
      quizScore: 0,
      answer: {
          correct: '',
          wrong: ''
      }
    }

    const reducer = (prevState, nextState) => ({...prevState, ...nextState})
    const [state, updateState] = useReducer(reducer, initialState)

    const dispatch = useDispatch()
    const quizState = useSelector(state => state.quiz)

    const  {
        getQuizDataLoader,
        quizData,
        quizSubmitBool,
        getQuizError
      } = quizState

    const { history, match: {params: { quizId} } } = props

    console.log('props', props)
    useEffect(() => {
      dispatch(getQuizDataInitiate(quizId))
    }, [quizSubmitBool])

    useEffect(() => {
      if (getQuizError) {
          history.push('/createQuiz')
      }
    }, [getQuizError])

    const handleChange = (path, value) => {
      const upStat = cloneDeep(state)
      upStat[path] = value

      updateState({
        ...upStat
      })
    }

    const questionDataMerged = (questions, quesData) => {
        let arr = []
        questions.map(question => {
            quesData.map(ques => {
            let obj = {}
            if(ques.quesId === question.quesId) {
                obj = {...question, ...ques}
                arr.push(obj)
            }
            })
        })
        return arr
    }

    const saveAndNext = (quesId, choice, ans) => {
      const upStat = cloneDeep(state)
      const obj = {quesId, choice}
      upStat.quesAndAns.push(obj)
      
      upStat.answer.correct = ans

      if(choice !== ans) {
        upStat.answer.wrong = choice
      }

      setTimeout(() => {
        const clonedState = cloneDeep(state)
        clonedState.quizIndex = state.quizIndex + 1
        if(choice == ans) {
            clonedState.quizScore = clonedState.quizScore + 1
          }
        if (state.quizIndex === 9) {
            clonedState.startQuiz = false
            sessionStorage.setItem('quizScore', clonedState.quizScore)
            const quizDetails = {
              name: clonedState.name,
              score: (clonedState.quizScore * 10)
            }
            const obj = {
              quizId: quizId,
              quizDetails: quizDetails
            }
            dispatch(submitQuizInitiate(obj))
        }
        updateState({
            ...clonedState
        })
      }, 600)
      updateState({
        ...upStat
      })
    } 

    const getAccendingResult = (results) => {
      const arr = results.sort(function(a, b) {
        return b.score - a.score
      });
     return arr
    }

    const getQuiz = (questions) => {
      return (
            questions.map((itm, index) => {
              return (
               <div>
                {
                  state.quizIndex === index &&
                  <ActionContainer noTop>
                  <QuizIndicatorWrapper>
                    {
                      questions.map((ques, idx) => {
                        return (
                          <QuizIndicator filled={state.quizIndex > idx}/>
                        )
                      })
                    }
                  </QuizIndicatorWrapper>
                  <Label key={itm.quesId}>{itm.ques.replace('{}','bhavesh')}</Label>
                   <ChoicesWrapper>
                     {
                       itm.choices.map(data => {
                         return (
                           <ImageContainer onClick={() => {
                             saveAndNext(itm.quesId, data.choiceName,itm.ans)
                           }}>
                             {
                              state.answer.correct === data.choiceName &&
                               <ChoiceItem>
                                <StyledImage choice src={checked}/> 
                               </ChoiceItem>
                             }
                             {
                              state.answer.wrong === data.choiceName &&
                               <ChoiceItem>
                                <StyledImage src={remove}/> 
                               </ChoiceItem>
                             }   
                             <StyledImage src={data.choiceImg}/>
                             <Label>{data.choiceName}</Label>
                           </ImageContainer>
                         )
                       })
                     }
                   </ChoicesWrapper>
                  </ActionContainer>
                }
               </div>
              )
            })    
      )
    }

    return (
        <Wrapper>
           <CommonHeader/>
           { 
           !state.startQuiz ?
             <CreateQuizCard>  
             {
                 sessionStorage.getItem('quizScore') ?
                 <div>
                 <GaugeChart id="gauge-chart3" 
                    nrOfLevels={30} 
                    colors={["#FF5F6D", "#FFC371", "#52de97"]} 
                    arcWidth={0.3} 
                    textColor="black"
                    percent={parseInt(sessionStorage.getItem('quizScore')) * 0.1} 
                  />
                  <Label size={24}>Your Score</Label>
                  </div>
                  :
                  <div>
                  <Label size={20}>{`${quizData.userName} has invited you for Coronavirus 2020 dare test`}</Label>
                  <Label size={20}>{`Lets see how well you know ${quizData.userName} ?`}</Label>
                  </div>
             }
            {   sessionStorage.getItem('quizScore') ?
                <CreateOrTry>
                    <CreateTryButton 
                      bgColor="green"
                      onClick={() => {
                        setTimeout(() => {
                            sessionStorage.clear()
                            history.push('/createQuiz')
                        }, 400)}}
                     >Create your own Quiz</CreateTryButton>
                    <CreateTryButton 
                      bgColor="purple"
                      onClick={() => {
                      setTimeout(() => {
                       sessionStorage.clear()
                       updateState({
                           ...initialState
                       })
                      }, 400)}}
                    >Try again</CreateTryButton>
                </CreateOrTry>
                :
                <ActionContainer bottom>
                <Label required={state.required}>Enter your full name:</Label>
                <StyledInput 
                  onChange={(event) => handleChange('name', event.target.value)}
                  value={state.name}
                  />
                  <Button onClick={() => state.name.length > 1 ? setTimeout(() => handleChange('startQuiz',true), 300)  : handleChange('required', true)}>
                      Start
                  </Button>
               </ActionContainer>
            } 
            <Label size={23}>{`Who Knows ${quizData.userName} Best`}</Label>
            <Dashboard>
               <Tr>
                 <Th>Name</Th>
                 <Th>Score</Th>
               </Tr>
              {
                quizData.results && quizData.results.length > 0 ? 
                getAccendingResult(quizData.results).map(itm => {
                return (
                    <Tr>
                    <Td>{itm.name}</Td>
                    <Td>{itm.score}</Td>
                    </Tr>
                )
                })
                : 
                <Tr>
                <Td></Td>
                <Td></Td>
                </Tr>
              }
            </Dashboard>    
            </CreateQuizCard>
            : 
            <CreateQuizCard>
              {
                  getQuiz(questionDataMerged(questionsData, quizData.quizDetails))
              }
            </CreateQuizCard>          
           }
           { 
           !state.startQuiz &&
             <CommonFooter/>
           }
        </Wrapper>   
    )
}

export default CreateQuiz