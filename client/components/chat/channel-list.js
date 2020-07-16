import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { setCurrentChannel } from '../../redux/reducers/chat'

const ChannelList = () => {
  const dispatch = useDispatch()
  const channels = useSelector((s) => s.chat.channels)
  const currentChannel = useSelector((s) => s.chat.currentChannel)

  return (
    <div>
      {channels.map((channelName) => {
        return (
          <button
            type="button"
            key="channelName"
            className="text-blue-900 flex"
            onClick={() => {
              dispatch(setCurrentChannel(`#${channelName}`))
            }}
          >
            {currentChannel === `#${channelName}` ? <b>#{channelName}</b> : `#${channelName}`}
          </button>
        )
      })}
    </div>
  )
}

ChannelList.propTypes = {}

export default ChannelList
