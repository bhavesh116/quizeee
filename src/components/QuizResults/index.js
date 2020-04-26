import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled, {css} from 'styled-components'
import Header from '../Common/Header'
import Footer from '../Common/Footer'
import { getQuizDataInitiate } from '../../redux/actions/quizActions'

const Wrapper = styled.div`
 height: 100%;
 width: 100%;
`

const QuizCard = styled.div`
 min-height: 210px;
 margin: 20px 8px;
 display: flex;
 flex-direction: column;
 align-items: center;
 padding: 10px;
 box-shadow: 1px 1px 20px #745c97;
 border-radius: 8px;
`

const Label = styled.div`
 color: grey;
 margin-bottom: 10px;
 font-size:${({size}) => size}px;
 ${({color}) => color && css`
  color: ${color}
 `}
`

const LinkDiv = styled.div`
 height: 40px;
 width: 90%;
 display: flex;
 margin-bottom: 30px;
 justify-content: space-between;
 padding: 0px 5px;
 align-items: center;
 border: 1px solid grey;
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

const IcomImg = styled.img`
 height: 20px;
 width: 20px;
 ${({send}) => send && css`
 height: 40px;
 width: 40px;
 margin-bottom: 5px;
 `}
`

const SendToDiv = styled.div`
 display: flex;
 width: 90%;
 justify-content: space-between;
`

const IconDivWrap = styled.div`
 display: flex;
 width: 100%;
 margin: 20px 0px;
 flex-direction: column;
 align-items: center;
 justify-content: space-between;
 color: ${({color}) => color};
`

const Toaster = styled.div`
 position: absolute;
 display: flex;
 top: 45%;
 opacity: 0.9;
 left: 52%;
 background-color: #f1f1f1;
 padding: 0px 10px;
 font-size: 15px;
 color: grey;
 align-items: center;
 justify-content: center;
 height: 29px;
 border-radius: 40px;
`

const QuizResults = (props) => {

  const [toaster , setToaster] = useState(false)
  const dispatch = useDispatch()
  const quizState = useSelector(state => state.quiz)

  const { match: { params: { quizId } } } = props

  const  {
    getQuizDataLoader,
    quizData
  } = quizState



  useEffect(() => {
     if(toaster) {
       setTimeout(() => setToaster(false), 400)
     }
  }, [toaster])


  useEffect(() => {
    dispatch(getQuizDataInitiate(quizId))
  }, [])

  const getAccendingResult = (results) => {
    const arr = results.sort(function(a, b) {
      return b.score - a.score
    });
   return arr
  }

   const copyToClip = (str) => {
      const el = document.createElement('textarea');
      el.value = str;
      el.setAttribute('readonly', '');
      el.style.position = 'absolute';
      el.style.left = '-9999px';
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setToaster(true)
   }

    return (
        <Wrapper>
          <Header>2020 Coronavirus dare</Header>
          { Object.values(quizData).length > 0 &&
            <QuizCard>
            <Label size={25}>Your Challenge Is Ready</Label>
            <Label color="purple"size={17}>Share this link with your friends</Label>
            <SendToDiv>
            <a  href={`https://api.whatsapp.com/send?text=%F0%9F%A4%9C%20${quizData.userName}%20has%20sent%20you%20new%20*Coronavirus%20Challenge*%20%F0%9F%91%B8%F0%9F%A4%B4%EF%B8%8F%0A*Accept%20this%20Challenge%20NOW*%20%0A%E2%80%BC%EF%B8%8F%F0%9F%91%87%F0%9F%91%87%F0%9F%91%87%F0%9F%91%87%F0%9F%91%87%F0%9F%91%87%E2%80%BC%EF%B8%8F%20%0A%20%20https://quizee.netlify.app//quiz/${quizId}`}>
            <IconDivWrap color="green">
            <IcomImg send src="https://i.ibb.co/51TNRQw/whatsapp.png"/>
            <div>Whatsapp Status</div>
            </IconDivWrap>
            </a>
            <a href="https://www.instagram.com/accounts/edit/">
            <IconDivWrap color="#C13584">
            <IcomImg send src="https://i.ibb.co/0rkDtXH/instagram.png"/>
            <div>Instagram Bio</div>
            </IconDivWrap>
            </a>
            </SendToDiv>
              <LinkDiv><div>{`https://quizee.netlify.app/quiz/${quizId}`}</div><IcomImg onClick={() => copyToClip(`https://quizee.com/quiz/${quizId}`)} src="https://i.ibb.co/Z2Vwmy8/copy.png"/></LinkDiv>
            <Label size={23}>Who Knows You Best</Label>
            <Dashboard>
              <Tr>
                <Th>Name</Th>
                <Th>Score</Th>
              </Tr>
              {
                quizData.results.length > 0 ? 
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
          </QuizCard>
          }
          {
            toaster && 
             <Toaster>Copied to Clipboard</Toaster>
          }
          <Footer/>
        </Wrapper>   
    )
}

export default QuizResults