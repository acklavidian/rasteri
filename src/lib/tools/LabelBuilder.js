import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer'

class LabelBuilder {
    tagName = 'div'
    className = 'label'
    textContent = 'unknown point'
    style = {
        marginTop = '-1em'
    }
    
    constructor(){
        this.element = document.createElement(this.tagName)
        this.cssObject = new CSS2DObject(this.element)
    }

}