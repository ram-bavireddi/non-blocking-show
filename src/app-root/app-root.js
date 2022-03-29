import '/components/code-editor/code-editor.js';
import '/components/blocking-code/blocking-code.js';
import '/components/non-blocking-code/non-blocking-code.js';
import '/components/thread-pool/thread-pool.js';

const template = document.createElement('template');
template.innerHTML = `
  <link rel="stylesheet" href="/app-root/app-root.css">
  <code-editor> 
    <blocking-code></blocking-code>
    <non-blocking-code class="hidden"></non-blocking-code>
  </code-editor>
  <thread-pool></thread-pool>
  <div>
    <a id="non-blocking-switch" href="#">Let's not block</a>
    <a id="blocking-switch" class="hidden" href="#">Let's block</a>
  </div>
`;

const $ = (el, selector) => el.shadowRoot.querySelector(selector);

class AppRoot extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(template.content.cloneNode(true));
    this.#onInstruction();
    this.#onCodeSwitch();
  }

  #onInstruction() {
    this.addEventListener('instruction', (event) => {
      $(this, 'thread-pool').instruction = event.detail;
    });
  }

  #onCodeSwitch() {
    const blockingCode = $(this, 'blocking-code');
    const nonBlockingCode = $(this, 'non-blocking-code');
    const blockingSwitch = $(this, '#blocking-switch');
    const nonBlockingSwitch = $(this, '#non-blocking-switch');
    nonBlockingSwitch.addEventListener('click', (event) => {
      nonBlockingSwitch.classList.add('hidden');
      blockingSwitch.classList.remove('hidden');
      nonBlockingCode.classList.remove('hidden');
      blockingCode.classList.add('hidden');
    });
    blockingSwitch.addEventListener('click', (event) => {
      blockingSwitch.classList.add('hidden');
      nonBlockingSwitch.classList.remove('hidden');
      blockingCode.classList.remove('hidden');
      nonBlockingCode.classList.add('hidden');
    });
  }
}

customElements.define('app-root', AppRoot);
