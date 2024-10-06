import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

export class counterApp extends DDDSuper(LitElement) {

  static get tag() {
    return "counter-app";
  }

  constructor() {
    super();
    this.title = "";
    this.min = 10;
    this.max = 25;
    this.counter= 16;
  }

  static get properties() {
    return {
      title: { type: String },
      min: {type: Number },
      max:{type: Number},
      counter: { type: Number},
    };
  }

  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-accent);
        font-family: var(--ddd-font-navigation);
        font-size: var(--counter-app-font-size, var(--ddd-font-size-s));
      }
      .wrapper {
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
      }
      div {
        padding: 0;
        margin: 0;
      }
      .counter{
        font-size: 4rem;
        margin: 8px 16px;
        padding: 8px;
      }
      .counter.red{color: var(--ddd-theme-default-original87Pink)}
      .counter.green{color: var(--ddd-theme-default-forestGreen);}
      .counter.blue{color: var(--ddd-theme-default-beaverBlue);}

      button {
        padding: 8px 16px;
        font-size: 1rem;
        margin: 0 8px;
        cursor: pointer;
      }
      button:disabled{
        background-color: #ccc;
        cursor: not-allowed;
      }
      button:hover:not(:disabled){
        background-color: #f0f0f0;
      }
      .button-container{
        display:flex;
        justify-content:center;
      }
    `]
    
  
  }
increment(e){
  if(this.counter < this.max)
  this.counter ++;
}
decrement(e){
  if(this.counter > this.min)
    this.counter--;
}
updated(changedProperties) {
  if (changedProperties.has('counter')) {
    // do your testing of the value and make it rain by calling makeItRain
  }
}



  render() {
    const counterNum = this.counter >= 21 ? 'red' : 
    this.counter >= 18 ? 'green' : 
    this.counter ==this.min || this.counter == this.max ? 'blue':
    '';
    return html`
<div class="wrapper">
<confetti-container id="confetti">
<div class="counter ${counterNum}">${this.counter}</div>
  <div>${this.title}</div>
  <div class="buttons">
        <button @click=${this.decrement} ?disabled=${this.counter === this.min}>-</button>
        <button @click=${this.increment} ?disabled=${this.counter === this.max}>+</button>
      </div>
      </confetti-container>
      <slot></slot>
</div>`;
  
  }
  updated(changedProperties) {
    if (changedProperties.has('counter')) {
      if (this.counter === 21) {
        this.makeItRain();
      }
      // do your testing of the value and make it rain by calling makeItRain
    }
  }
  makeItRain() {
    import("@haxtheweb/multiple-choice/lib/confetti-container.js").then(
      (module) => {
        setTimeout(() => {
          this.shadowRoot.querySelector("#confetti").setAttribute("popped", "");
        }, 0);
      }
    );
  }
  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
  
}

globalThis.customElements.define(counterApp.tag, counterApp);