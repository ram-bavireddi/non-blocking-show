import '/components/code-editor/code-editor.js';
import '/components/blocking-code/blocking-code.js';
import '/components/thread-pool/thread-pool.js';

const template = document.createElement('template');
template.innerHTML = `
  <link rel="stylesheet" href="/app-root/app-root.css">
  <code-editor> 
    <blocking-code></blocking-code>
  </code-editor>
  <thread-pool></thread-pool>
`;

const $ = (el, selector) => el.shadowRoot.querySelector(selector);

class AppRoot extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(template.content.cloneNode(true));
    this.onInstruction();
  }

  onInstruction() {
    this.addEventListener('onInstruction', (e) => {
      $(this, 'thread-pool').setAttribute(
        'next-instruction',
        e.detail.instruction
      );
    });
  }
}

customElements.define('app-root', AppRoot);
