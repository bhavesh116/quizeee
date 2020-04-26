import React from 'react'
import styled from 'styled-components'

const Header = styled.div`
 height: 45px;
 width: 100%;
 display: flex;
 align-items: center;
 padding: 0px 10px;
 color: white;
 justify-content: center;
 background-image: linear-gradient(to top right, #d597ce , #745c97);
`

const Icon = styled.i`
font-size: 18px;
`
const TextDiv = styled.div`
 font-size: 20px;
`

const CommonHeader = () => {
    return (
        <Header>
            {/* <Icon className="fas fa-times"/> */}
            <TextDiv>2020 Coronavirus dare</TextDiv>
        </Header>  
    )
}

export default CommonHeader