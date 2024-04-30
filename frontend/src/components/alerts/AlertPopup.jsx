import { Alert } from '@mui/material'
import useAlert from './useAlert'

const AlertPopup = () => {
  const { text, type } = useAlert()

  if (text && type) {
    return (
      <div
        style={{
          position: 'fixed',
          top: '12%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 10,
        }}
      >
        <Alert severity={type}>{text}</Alert>
      </div>
    )
  } else {
    return <></>
  }
}

export default AlertPopup
