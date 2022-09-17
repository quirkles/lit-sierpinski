import {LitElement, css, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('app-point')
export class Point extends LitElement {
    // Define scoped styles right with your component, in plain CSS
    static styles = css`
       :host {
       width: 100%;
       height: 100%;
       position: absolute
       }
      .point {
        position: absolute;
        background-color: black;
        height: 2px;
        width: 2px;
      }
  `;

    @property()
    x: number = 0
    @property()
    y: number = 0;

    // Render the UI as a function of component state
    render() {
        return html`<div class="point" style="left:${this.x}px;bottom:${this.y}px;"></div>`;
    }
}
