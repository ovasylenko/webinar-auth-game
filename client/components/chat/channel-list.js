import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { setCurrentChannel, addNewChannel, toggleChannel } from '../../redux/reducers/chat'

const ChannelList = () => {
  const [newChannelName, setNewChannelName] = useState('')
  const dispatch = useDispatch()
  const channels = useSelector((s) => s.chat.channels)
  const userChannels = useSelector((s) => s.auth.user.channels)

  const currentChannel = useSelector((s) => s.chat.currentChannel)

  return (
    <div>
      {channels.map((channelName) => {
        return (
          <div key={channelName} className="flex  items-center h-8">
            <button
              type="button"
              className="hover:bg-blue-700 text-xs mr-4 text-white w-6 h-6 flex justify-center items-center bg-blue-600 rounded-full focus:outline-none focus:shadow-outline"
              onClick={() => {
                dispatch(toggleChannel(channelName))
              }}
            >
              {userChannels.includes(channelName) ? '-' : '+'}
            </button>
            <button
              type="button"
              className="text-blue-900 flex"
              onClick={() => {
                dispatch(setCurrentChannel(`#${channelName}`))
              }}
            >
              {currentChannel === `#${channelName}` ? <b>#{channelName}</b> : `#${channelName}`}
            </button>{' '}
          </div>
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
