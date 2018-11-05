import  React from 'react'
import  { withStyles } from 'material-ui/styles'
import  Paper from 'material-ui/Paper'
import  Grid from 'material-ui/Grid'
import  Divider from 'material-ui/Divider'
import  ChatList from './ChatList'
import  ChatForm from './ChatForm'


const styles = theme => ({
  root: {
    flexGrow: 1
  }
, paper: {
    padding: theme.spacing.unit * 2
  , textAlign: 'center'
  , color: theme.palette.text.secondary
  }
})

const Chat = ( props ) => {
  const { classes
        , chats
        , onSubmit
        , validate
        } = props
  return (
    <div>
    <Grid item >
      <Paper className={classes.paper}><ChatList chats={chats}/></Paper>
    </Grid>
    <Divider inset={true} />
    <Grid item >
      <Paper className={classes.paper}><ChatForm onSubmit={onSubmit} validate={validate}/></Paper>
    </Grid>
    </div>
  )
}
export default withStyles(styles)(Chat)
