import  React from 'react'
import  { withStyles } from 'material-ui/styles'
import  { Form
        , Field
        } from 'react-final-form'
import  Button from 'material-ui/Button'
import  AddIcon from 'material-ui-icons/Add'
import  ChatFormTextField from './ChatFormTextField'


const styles = { }

const ChatForm = ( props ) => {
  const { classes
        , onSubmit
        , validate
        } = props
  return (
    <Form
      onSubmit={ onSubmit }
      initialValues={{ message:'' }}
      validate={ validate }
      render={({ handleSubmit, reset, submitting, pristine, values }) => (
        <form onSubmit={ ( event ) => handleSubmit( event ).then( reset )} >
          <Field
            style={{ display:'flex' }}
            id='chatFormMessage'
            name='message'
            component={ ChatFormTextField }
            autoFocus
            multiline
            margin='normal'
            placeholder='Enter your message here...'
            inputProps={{
              'aria-label': 'Chat Message:'
            }}
          />
          <Button type='submit' variant='fab' color='primary' aria-label='add' disabled={ submitting || pristine } className={ classes.button } >
            <AddIcon />
          </Button>
        </form>
      )}
    />
  )
}
export default withStyles(styles)(ChatForm)
