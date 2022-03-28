const template = document.createElement('template');
template.innerHTML = `
    <link rel="stylesheet" href="/components/thread-pool/thread-pool.css">
    <div class="thread-pool">
        <div class="sleeping hidden">
          <div class="instruction"></div>
          <div class="thread">thread</div>
        </div>
        <div class="running hidden">
            <div class="instruction"></div>
            <div class="thread">thread</div>
        </div>
    </div>
`;

const $ = (el, selector) => el.shadowRoot.querySelector(selector);

class ThreadPool extends HTMLElement {
  static get observedAttributes() {
    return ['next-instruction'];
  }

  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(template.content.cloneNode(true));
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    if (newVal === 'instruction4()') {
      // blocking instruction
      $(this, '.running').classList.add('hidden');
      $(this, '.sleeping').classList.remove('hidden');
      $(this, '.sleeping .instruction').innerHTML = newVal;
    } else {
      $(this, '.sleeping').classList.add('hidden');
      $(this, '.running').classList.remove('hidden');
      $(this, '.running .instruction').innerHTML = newVal;
      this.#moveRunningThread();
    }
  }

  #moveRunningThread() {
    let margin = $(this, '.running').style.marginLeft || '0px';
    if (margin.includes('px')) {
      margin = Number(margin.replace('px', ''));
    }
    $(this, '.running').style.marginLeft = `${margin + 50}px`;
  }
}

customElements.define('thread-pool', ThreadPool);
