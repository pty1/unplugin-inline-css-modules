import { css } from 'unplugin-inline-css-modules'
import './app.css'

const classes = css`
  .root {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
  }

  .button {
    background-color: #1f1e33;
    color: white;
    padding: 1rem 2rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
`

export default function App() {
  return (
    <div class={classes.root}>
      <button id="detect" class={classes.button}>
        Click me
      </button>
    </div>
  )
}
