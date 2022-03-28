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
    .blocking {
      color: red;
    }
</style>
<div class="method">fun method() { </div>
    <div id="ins1" class="statement">instruction1()</div>
    <div id="ins2" class="statement">instruction2()</div>
    <div id="ins3" class="statement">instruction3()</div>
    <div id="ins4" class="statement">instruction4()</div>
    <div id="ins5" class="statement">instruction5()</div>
    <div id="ins6" class="statement">instruction6()</div>
<div>}</div>
`;

const $ = (el, selector) => el.shadowRoot.querySelector(selector);

class BlockingCode extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(template.content.cloneNode(true));
    this.onInstruction(['ins1', 'ins2', 'ins3', 'ins4', 'ins5', 'ins6']);
  }

  onInstruction(insIds) {
    insIds.forEach((id) => {
      const insEl = $(this, `#${id}`);
      insEl.addEventListener('click', ($event) => {
        if (insEl.id === 'ins4') {
          insEl.classList.add('blocking');
        } else {
          insEl.classList.add('running');
        }
        insEl.dispatchEvent(
          new CustomEvent('onInstruction', {
            bubbles: true,
            composed: true,
            detail: {
              instruction: insEl.textContent,
            },
          })
        );
      });
    });
  }
}

customElements.define('blocking-code', BlockingCode);
