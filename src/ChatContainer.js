import  React  from 'react'
import  { connect } from 'react-redux'
import  { firebaseConnect
        , populate
        } from 'react-redux-firebase'
import  moment from 'moment'
import  Component from './Chat'


class Container extends React.Component {

  // returns a promise for the reset continuation
  onSubmit = ( values ) => {
    const { message } = values
    const timestamp = moment().toISOString()
    const userId = this.props.auth.uid
    const owner = { [this.props.auth.uid]: true }
    const fbPath = `/rooms/main`
    const id = this.props.firebase.ref( fbPath ).push().key
    return this.props.firebase.ref( fbPath + '/' + id )
    .set( { id, userId, owner, timestamp, message } )
  }


  validate = ( values ) => {
   const errors = { }
    if ( !values.message ) {
      errors.message = 'Required'
    } else {
      if ( values.message.length > 512 ) {
        errors.message = 'No more than 512 characters allowed'
      }
    }
    return errors
  }


  render () {
    return (
      <Component chats={this.props.chats} onSubmit={this.onSubmit} validate={this.validate} />
    )
  }

}


// firebase.ordered dnw???
const ordered = ( oChats ) => {
  if ( oChats == null ) return [ ]
  const keys = Object.keys( oChats )
  if ( !keys.length ) return [ ]
  return keys.map( ( key ) =>  {
        const { id, userId, owner, timestamp, message } = oChats[key]
        return { id, message, timestamp, ...owner[userId] }
    })
}

const populates = [ { root: 'users', child: 'owner' } ]

const mapStateToProps = ( { firebase } ) => {
  const { auth } = firebase
  const chats = ordered( populate( firebase, 'rooms/main', populates ) )
  return { auth, chats }
}

const FbContainer = firebaseConnect( [  { path: 'rooms/main'
                                        , queryParams: [ 'limitToLast=5' ]
                                        , populates
                                        }
                                      ] )( Container )

export default connect( mapStateToProps )( FbContainer )
