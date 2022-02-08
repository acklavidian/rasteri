export class OverlayBuilder extends HTMLElement {
  #color = 'blue'
  constructor() {
    super()
    Object.assign(this, {
      is: 'view-overlay',
      textContent: 'POINT',
      innerHTML: this.render()
    })
  }
  
  set color(value) {
    this.#color = value
    this.innerHTML = this.render()
  }

  get color(){
    return this.#color
  }

  render () {
    return `<style>
    .dot {
      border-radius: 50%;
      display: inline-block;
    }

    .grey {
      background-color: ${this.color};
      margin: 5px;
      padding: 5px;
    }

    .white {
     background-color: white;
    }

    .border-black {
      border: solid black 1px;
    }

    </style>
    <div class='white dot'>
      <div class='grey dot border-black'></div>
    </div>
    `
  }
}
customElements.define('view-overlay', OverlayBuilder)