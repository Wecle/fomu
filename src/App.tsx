import React from 'react'

interface Props {
  children?: React.ReactNode
}

const App: React.FC<Props> = (props) => {
  return <div>{props.children}</div>
}

export default App
