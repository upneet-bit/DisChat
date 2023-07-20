import React, { useState } from 'react'
import { ChannelList, useChatContext } from 'stream-chat-react'
import Cookies from 'universal-cookie'

import { ChannelSearch, TeamChannelList, TeamChannelPreview } from './';
import ChatIcon from '../assets/logo.png';
import LogoutIcon from '../assets/logout.png';

const cookies = new Cookies();

const SideBar= ({ logout }) => {
    return(
        <div className="channel-list__sidebar">
            <div className="channel-list__sidebar__icon1">
                <div className="icon1__inner">
                    <img src={ChatIcon} alt="Chat" width="30" />
                </div>
            </div>
            <div className="channel-list__sidebar__icon2">
                <div className="icon1__inner" onClick={logout}>
                    <img src={LogoutIcon} alt="Logout" width="30" />
                </div>
            </div>
        </div>
    )
}

const CompanyHeader = () => {
    return(
        <div className="channel-list__header">
            <p className="channel-list__header__text">
                Dis-Chat
            </p>
        </div>
    )
}

const customChannelTeamFilter = (channels) => {
    return channels.filter( (channel) => channel.type==='team' );
}

const customChannelMessagingFilter = (channels) => {
    return channels.filter( (channel) => channel.type==='messaging' );
}

const ChannelListContent = ({ isCreating ,setIsCreating ,setCreateType ,setIsEditing, setToggleContainer }) => {

    const { client } = useChatContext();

    const logout = ( ) => {
        cookies.remove('userId');
        cookies.remove('token');
        cookies.remove('username');
        cookies.remove('fullName');
        cookies.remove('avatarURL');
        cookies.remove('hashedPassword');
        cookies.remove('phonenumber');
        
        window.location.reload();
    }

    const filters = { members: { $in: [ client.userID ] } };

  return (
        <>
            <SideBar logout={ logout } />
            <div className="channel-list__list__wrapper" >
                <CompanyHeader/>
                <ChannelSearch setToggleContainer={setToggleContainer} />

                <ChannelList
                    customClass='custom-channel-list-container'
                    filters={filters}
                    channelRenderFilterFn={customChannelTeamFilter}
                    List={ (listProps) => (
                        <TeamChannelList
                            // isCreating    ={isCreating}
                            setToggleContainer={setToggleContainer}
                            setIsCreating ={setIsCreating}
                            setCreateType ={setCreateType}
                            setIsEditing  ={setIsEditing} 
                            {...listProps}
                            type="team"
                        />
                    )}
                    Preview={ (previewProps) => (
                        <TeamChannelPreview 
                        setIsCreating={setIsCreating}
                        setIsEditing={setIsEditing}
                        setToggleContainer={setToggleContainer}
                            {...previewProps}
                            type="team"
                        />
                    )}
                />
                <ChannelList
                    customClass='custom-channel-list-container'
                    filters={filters}
                    channelRenderFilterFn={customChannelMessagingFilter}
                    List={ (listProps) => (
                        <TeamChannelList
                            // isCreating    ={isCreating}
                            setToggleContainer={setToggleContainer}
                            setIsCreating ={setIsCreating}
                            setCreateType ={setCreateType}
                            setIsEditing  ={setIsEditing} 
                            {...listProps}
                            type="messaging"
                        />
                    )}
                    Preview={ (previewProps) => (
                        <TeamChannelPreview
                            {...previewProps}
                            setIsCreating={setIsCreating}
                            setIsEditing={setIsEditing}
                            setToggleContainer={setToggleContainer}
                            type="messaging"
                        />
                    )}
                />
            </div>
        </>
  )
}

const ChannelListContainer = ( { setIsCreating ,setCreateType ,setIsEditing } ) => {
    const [toggleContainer, setToggleContainer] = useState (false);

    return (
        <>
            <div className="channel-list__container">
                <ChannelListContent 
                 setIsCreating ={setIsCreating}
                 setCreateType ={setCreateType}
                 setIsEditing  ={setIsEditing}
                 />
            </div>
            <div className="channel-list__container-responsive"
                style={ { left: toggleContainer ? "0%" : "-89%", background: "#005fff" } }
            >
                <div className="channel-list__container-toggle" onClick={ () => setToggleContainer((prev)=> !prev)}>
                </div>
                <ChannelListContent 
                 setIsCreating ={setIsCreating}
                 setCreateType ={setCreateType}
                 setIsEditing  ={setIsEditing}
                 setToggleContainer ={setToggleContainer}
                 />
            </div>
        </>
    )
}
export default ChannelListContainer