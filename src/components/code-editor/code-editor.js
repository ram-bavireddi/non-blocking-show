const template = document.createElement('template');
template.innerHTML = `
  <link rel="stylesheet" href="components/code-editor/code-editor.css"></link>
  <div class="code-editor">
    <span class="control"></span>
    <span class="control"></span>
    <span class="control"></span>
    <pre class="line-numbers">
      <code class="language-css">
      <slot class="code"></slot>
      </code>
    </pre>
  </div>
`;

class CodeEditor extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

customElements.define('code-editor', CodeEditor);
