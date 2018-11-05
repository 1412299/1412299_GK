import  React from 'react'
import  { withStyles } from 'material-ui/styles'
import  Typography from 'material-ui/Typography'
import  GoogleButton from './GoogleButton'


const styles = {
  center: {
    margin: 'auto'
  , width: '50%'
  , padding: 8
  }
}

const showMessage = ( msg ) => {
  const defaultMessage = 'You may need to enable pop-ups, and will be temporarily redirected to Google for your consent'
  return (
    <p>
      { defaultMessage }
    </p>
  )
}


const onSignInClick = ( providerLogin, provider ) => {
    return () => providerLogin( provider )
  }


const SignIn = ( props ) => {
  const { providerLogin
        , errorMessage = ''
        } = props

  return (
    <div>
      <Typography variant="title" color="inherit" >
        Sign In
      </Typography>
      { showMessage( errorMessage ) }
      <div style={styles.center}>
        <a onClick={ onSignInClick( providerLogin, 'google' ) }><GoogleButton/></a>
      </div>
    </div>
  )
}

export default withStyles(styles)(SignIn)
