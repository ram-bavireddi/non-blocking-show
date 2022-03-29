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
  #instruction;

  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(template.content.cloneNode(true));
  }

  set instruction(newIns) {
    this.#instruction = newIns;
    this.#render();
  }

  #render() {
    if (this.#instruction.id === 'ins4') {
      $(this, '.running').classList.add('hidden');
      $(this, '.sleeping').classList.remove('hidden');
      $(this, '.sleeping .instruction').innerHTML =
        this.#instruction.instruction;
      if (this.#instruction.type === 'non-blocking') {
        $(this, '.sleeping .thread').classList.add('hidden');
      } else {
        $(this, '.sleeping .thread').classList.remove('hidden');
      }
    } else {
      $(this, '.sleeping').classList.add('hidden');
      $(this, '.running').classList.remove('hidden');
      $(this, '.running .instruction').innerHTML =
        this.#instruction.instruction;
      if (this.#instruction.id === 'end') {
        $(this, '.running').classList.add('hidden');
        $(this, '.running').style.marginLeft = '0';
        $(this, '.running .instruction').innerHTML = '';
      } else {
        this.#moveRunningThread();
      }
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
