const template = document.createElement('template');
template.innerHTML = `
    <link rel="stylesheet" href="/components/thread-pool/thread-pool.css">
    <div class="thread-pool">
        <div class="parking">
          <div class="thread">thread</div>
        </div>
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
    const insId = this.#instruction.id;
    const insType = this.#instruction.type;
    const ins = this.#instruction.instruction;
    $(this, '.parking .thread').classList.add('hidden');
    if (insId === 'ins4') {
      $(this, '.running').classList.add('hidden');
      $(this, '.sleeping').classList.remove('hidden');
      $(this, '.sleeping .instruction').innerHTML = ins;
      if (insType === 'non-blocking') {
        $(this, '.parking .thread').classList.remove('hidden');
        $(this, '.sleeping .thread').classList.add('hidden');
      } else {
        $(this, '.sleeping .thread').classList.remove('hidden');
      }
    } else {
      $(this, '.sleeping').classList.add('hidden');
      $(this, '.running').classList.remove('hidden');
      $(this, '.running .instruction').innerHTML = ins;
      if (insId === 'end') {
        $(this, '.parking .thread').classList.remove('hidden');
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
