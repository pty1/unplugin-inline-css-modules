import type { Component } from 'solid-js'
import { css } from 'unplugin-inline-css-modules'

const styles = css`
  .container {
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

const App: Component = () => {
  return (
    <div class={styles.container}>
      <button id="detect" class={styles.button}>
        Click me
      </button>
    </div>
  )
}

export default App
