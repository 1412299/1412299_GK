import  React from 'react'
import  Component from './SignIn'
import  { withFirebase
        } from 'react-redux-firebase'
import  { connect } from 'react-redux'


class Container extends React.Component {
  constructor( props, context ) {
    super( props, context )
    this.state =  { showLoadingOverlay: false
                  , errorMessage: ''
                  }
  }


  componentWillReceiveProps( nextProps ) {
    if ( this.props.authError && !this.props.authError.message.length
       && nextProps.authError && nextProps.authError.message.length
       ) {
    this.setState(  { showLoadingOverlay: false
                    , errorMessage: nextProps.authError.message
                    } )
    }
  }


  providerLogin = ( provider ) => {
//    this.setState( { showLoadingOverlay: true } )
    this.props.firebase.login( {provider} )
  }


  render() {
    return (
      <Component providerLogin={ this.providerLogin } errorMessage={ this.state.errorMessage } />
    )
  }

}


const mapStateToProps = ( ( { firebase: { auth, authError } } ) => ( { auth, authError } ) )

export default connect( mapStateToProps )( withFirebase( Container ) )
