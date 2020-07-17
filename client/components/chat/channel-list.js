import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { setCurrentChannel, addNewChannel } from '../../redux/reducers/chat'

const ChannelList = () => {
  const [newChannelName, setNewChannelName] = useState('')
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
      <div>
        <input
          type="text"
          value={newChannelName}
          onKeyDown={({ key }) => {
            if (key === 'Enter') {
              dispatch(addNewChannel(newChannelName))
              setNewChannelName('')
            }
            if (key === 'Escape') {
              setNewChannelName('')
            }
          }}
          onChange={({ target: { value } }) => {
            setNewChannelName(value)
          }}
          className="shadow appearance-none border border-red-500 rounded w-32 mr-4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <button
          type="button"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={() => {
            dispatch(addNewChannel(newChannelName))
            setNewChannelName('')
          }}
        >
          +
        </button>
      </div>
    </div>
  )
}

ChannelList.propTypes = {}

export default ChannelList
