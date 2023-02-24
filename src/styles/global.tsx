import { css, Global } from '@emotion/react'

const GlobalStyle = () => {
  const style = css`
    html {
      padding: 0;
      margin: 0;
      line-height: 1.65;
      -webkit-tap-highlight-color: transparent;
      text-size-adjust: 100%;
      overflow-wrap: break-word;
      word-break: break-word;
      cursor: initial;
    }

    body {
      margin: 0;
      padding: 0;
      font-size: 1rem;
      background: #fff;
      color: #333;
      font-family: -apple-system, BlinkMacSystemFont, 'ヒラギノ角ゴ Pro W3',
        Hiragino Kaku Gothic Pro, sans-serif;
    }

    a {
      text-decoration: none;
      background-color: transparent;
      color: inherit;

      &:hover,
      &:active,
      &:focus {
        text-decoration: underline;
      }
    }

    img,
    svg {
      vertical-align: bottom;
      max-width: 100%;
    }

    figure {
      margin: 0;
    }

    pre,
    code {
      font-family: 'Menlo', 'Monaco', 'Consolas', 'Bitstream Vera Sans Mono',
        'Lucida Console', 'Courier', monospace;
    }

    strong {
      font-weight: bold;
    }

    em {
      font-weight: bold;
      font-style: normal;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      margin: 0;
      padding: 0;
      font-weight: bold;
    }

    p {
      max-height: 100%;
      margin: 0;
    }

    ul,
    ol,
    li {
      margin: 0;
      padding: 0;
    }

    li {
      // list-style-type: none によるリストマーカーのリセットは li 要素のみで指定し、
      // 個別に指定したい場合はコンポーネントごとに inherit に変更する
      list-style-type: none;
    }

    hr {
      display: none;
    }

    main {
      display: block;
    }

    input,
    textarea,
    button,
    optgroup,
    select {
      margin: 0;
      font: inherit;
    }

    button {
      margin: 0;
      padding: 0;
      border: none;
      background: transparent;
      cursor: pointer;
    }

    [hidden] {
      display: none;
    }

    // スムーススクロール後のキーボードフォーカス遷移のために、
    // 動的に tabindex を設定した要素にはアウトラインを表示しない
    [tabindex='-1'],
    [tabindex='-1']:focus {
      outline: none !important;
    }
  `

  return <Global styles={style} />
}

export default GlobalStyle
