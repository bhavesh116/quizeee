import React from 'react'
import styled from 'styled-components'

const Footer = styled.div`
 height: 200px;
 width: 100%;
 padding: 10px;
 align-items: flex-end;
 display: flex;
 font-size: 20px;
 color: grey;
`

const CommonFooter = () => {
    return (
        <Footer>
          Enter your name, Create a Quiz, Share it with your friends on Whatsapp or Instagram.
          Once your friends attempt the quiz you will see the results on the leaderboard.
        </Footer>  
    )
}

export default CommonFooter