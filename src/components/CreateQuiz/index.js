import React, { useReducer, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled, {css} from 'styled-components'
import { createNewQuizInitiate } from '../../redux/actions/quizActions'
import { cloneDeep } from 'lodash'
import config from '../../config/config.json'

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
 ${({required}) => required && css`
 color: red;
 `}
`

const ActionContainer = styled.div`
 display: flex;
 padding: 10px;
 width: 100%;
 margin-top: 20px;
 flex-direction: column;
 ${({noTop}) => noTop && css`
  margin-top: 0px;
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

const GeneratingQuizDiv= styled.div`
 height: 100%;
 color: grey;
 display: flex;
 align-items: center;
 justify-content: center;
 font-size: 27px;
`
const { questionsData } = config 
const CreateQuiz = (props) => {
    const initialState = {
      name: '',
      required: false,
      startQuiz: false,
      quesAndAns: [],
      quizIndex: 0
    }

    console.log('props are', props)

    const reducer = (prevState, nextState) => ({...prevState, ...nextState})
    const [state, updateState] = useReducer(reducer, initialState)

    const dispatch = useDispatch()
    const quizState = useSelector(state => state.quiz)

    const {
      createQuizLoader,
      createdQuizData
    } = quizState

    const { history } = props

    useEffect(() => {
      if(Object.keys(createdQuizData).length > 0) {
        history.push(`/quizResults/${createdQuizData.quizId}`)
      }
    }, [createdQuizData])

    const handleChange = (path, value) => {
      const upStat = cloneDeep(state)
      upStat[path] = value

      updateState({
        ...upStat
      })
    }

    const saveAndNext = (quesId, ans) => {
      const upStat = cloneDeep(state)
      const obj = {quesId, ans}
      upStat.quesAndAns.push(obj)
      upStat.quizIndex = state.quizIndex + 1
      if(state.quizIndex === 9){
        const obj = {
          userName: upStat.name,
          quizDetails: upStat.quesAndAns
        }
        dispatch(createNewQuizInitiate(obj))
      }
      updateState({
        ...upStat
      })
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
                  <Label key={itm.quesId}>{itm.alt ? itm.alt : itm.ques.replace('{}','you')}</Label>
                   <ChoicesWrapper>
                     {
                       itm.choices.map(data => {
                         return (
                           <ImageContainer onClick={() => setTimeout(() => {
                            saveAndNext(itm.quesId, data.choiceName)
                            }, 300)}>
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
           { !createQuizLoader ?
             <CreateQuizCard>
             <CardHeader>2020 Coronavirus dare</CardHeader>
             {
               !state.startQuiz ?
               <ActionContainer>
                <Label required={state.required}>Enter your full name:</Label>
                <StyledInput 
                  onChange={(event) => handleChange('name', event.target.value)}
                  value={state.name}
                  />
                  <Button onClick={() => state.name.length > 1 ? setTimeout(() => handleChange('startQuiz',true), 300)  : handleChange('required', true)}>
                      Start
                  </Button>
               </ActionContainer>
               : getQuiz(questionsData)      
             }
            </CreateQuizCard>
            : <GeneratingQuizDiv>Generating Your Quiz...</GeneratingQuizDiv>
           }
           { 
           !state.startQuiz && !createQuizLoader &&
             <CommonFooter/>
           }
        </Wrapper>   
    )
}

export default CreateQuiz