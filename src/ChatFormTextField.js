import  React from 'react'
import TextField from 'material-ui/TextField'

const ChatFormTextField = ( props ) => {
  const { input: { name, onChange, value, ...restInput }
        , meta
        , ...rest
        } = props
  return (
    <TextField
    {...rest}
    name={name}
    helperText={meta.touched ? meta.error : undefined}
    error={meta.error && meta.touched}
    inputProps={restInput}
    onChange={onChange}
    value={value}
    multiline={true}
    />
  )
}
export default ChatFormTextField
