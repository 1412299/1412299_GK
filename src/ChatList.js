import  React from 'react'
import  { withStyles } from 'material-ui/styles'
import  List, { ListItem, ListItemText } from 'material-ui/List'
import  Avatar from 'material-ui/Avatar'
import  Tooltip from 'material-ui/Tooltip'
import  moment from 'moment'


const styles = { }

const formattedChat = ( chat, classes ) =>{
  const title = `${chat.displayName} ${moment(chat.timestamp).format('MM/DD, h:mm a')}`
  return (
        <ListItem key={chat.id} styles={{maxWidth:600}}>
          { chat.avatarUrl.length
            ? ( <Tooltip id='tooltip-left-start' title={title} placement='left-start'>
                  <Avatar alt='' src={chat.avatarUrl} className={classes.avatar}/>
                </Tooltip>
              )
            : `{chat.displayName}`
          }
          <ListItemText primary={chat.message}/>
        </ListItem>
  )
}

const ChatList = ( props ) => {
  const { classes
        , chats
        } = props

  return (
    <List>
      { chats.map( ( chat ) => formattedChat( chat, classes ) ) }
    </List>
  )
}
export default withStyles(styles)(ChatList)
