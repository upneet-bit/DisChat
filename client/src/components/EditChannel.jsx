import React, { useState } from 'react'

import { UserList } from './'
import { CloseCreateChannel } from '../assets'
import { useChatContext } from 'stream-chat-react'

const ChannelNameInput = ({ channelName= '', setChannelName }) => {
  const handleChange = ( e ) => {
    e.preventDefault();

    setChannelName(e.target.value);
  }
  return (
    <div className="channel-name-input__wrapper">
      <p>Name</p>
      <input type="text" onChange={handleChange} placeholder='channel-name' value={channelName} />
      <p>Add Members</p>
    </div>
  )
}

const EditChannel = ({ setIsEditing }) => {
  const { channel } = useChatContext();
  const [channelName, setChannelName] = useState(channel?.data?.name);
  const [selectedUsers, setselectedUsers] = useState([]);

  const updateChannel = async (e) => {
    e.preventDefault();

    const nameChange = channelName !== (channel.data.name || channel.data.id);

    if(nameChange){
      await channel.update({ name:  channelName }, { text : `Channel Name changed to ${channelName}`});
    }
    if(selectedUsers.length){
      await channel.addMembers(selectedUsers);
    }
    
    setChannelName(null);
    setIsEditing(false);
    setselectedUsers([]);
  }

  return (
    <div className='edit-channel__container'>
      <div className="edit-channel__header">
        <p>Edit Channel</p>
        <CloseCreateChannel setIsEditing={setIsEditing} />
      </div>
      <ChannelNameInput channelName={channelName} setChannelName={setChannelName} />
      < UserList setselectedUsers={setselectedUsers} />
      <div className="edit-channel__button-wrapper" onClick={updateChannel}>
        <p>Save Changes</p>
      </div>
    </div>
  )
}

export default EditChannel