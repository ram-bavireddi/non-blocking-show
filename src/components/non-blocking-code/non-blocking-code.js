const template = document.createElement('template');

template.innerHTML = `
<style>
    .method {
      line-height: 0;
    }
    .statement {
      margin-left: 16px;
      line-height: 0
    }
    .running {
      color: green;
    }
    .suspending {
      color: red;
    }
</style>
<div class="method">fun method() { </div>
    <div id="ins1" class="statement">instruction1()</div>
    <div id="ins2" class="statement">instruction2()</div>
    <div id="ins3" class="statement">instruction3()</div>
    <div id="ins4" class="statement">nonBlockingInstruction4()</div>
    <div id="ins5" class="statement">instruction5()</div>
    <div id="ins6" class="statement">instruction6()</div>
<div id="end">}</div>
`;

const $ = (el, selector) => el.shadowRoot.querySelector(selector);

class NonBlockingCode extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(template.content.cloneNode(true));
    this.onInstruction(['ins1', 'ins2', 'ins3', 'ins4', 'ins5', 'ins6', 'end']);
  }

  onInstruction(insIds) {
    insIds.forEach((id) => {
      const insEl = $(this, `#${id}`);
      insEl.addEventListener('click', ($event) => {
        if (insEl.id === 'ins4') {
          insEl.classList.add('suspending');
        }
        if (insEl.id !== 'end') {
          insEl.classList.add('running');
        }
        insEl.dispatchEvent(
          new CustomEvent('instruction', {
            bubbles: true,
            composed: true,
            detail: {
              id: insEl.id,
              type: 'non-blocking',
              instruction: insEl.textContent,
            },
          })
        );
      });
    });
  }
}

customElements.define('non-blocking-code', NonBlockingCode);
