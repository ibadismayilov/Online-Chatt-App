import React from 'react'
import Sidebar from '../../components/Sidebar'
import Conversation from '../../components/Conversation'
import MessagesContainer from '../../components/messages/MessagesContainer'

const Home = () => {
  return (
    <div className='home-container'>
      <div className='home-page'>
        <div className='home-page-elements'>
          <Sidebar />
          <MessagesContainer />
        </div>
      </div>
    </div>
  )
}

export default Home