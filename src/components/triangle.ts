import {LitElement, css, html} from 'lit';
import {customElement, state} from 'lit/decorators.js';
import {repeat} from 'lit/directives/repeat.js';

import {v4} from 'uuid'


const TAN60 = 1.73205080757

function getYatX(x: number): number {
    return TAN60 * x
}

function randomElOFArr<T>(items: T[]): T {
    return items[Math.floor(Math.random()*items.length)]
}

function randomIntInRange(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


@customElement('app-tri')
export class Triangle extends LitElement {
    // Define scoped styles right with your component, in plain CSS
    static styles = css`
      .triangle {
        width: 5822px;
        height: 5042px;
        position: relative;
      }
  `;

    vertices: { x: number, y: number }[] = [
        {x: 0, y: 0},
        {x: 5822, y: 0},
        {x: 2911, y: 5042},
    ]

    // Declare reactive properties
    @state()
    points: {
        id: string,
        x: number,
        y: number
    }[] = [];

    @state() private running = false;

    private lastPoint: {
        id: string,
        x: number,
        y: number
    } = {
        id: '',
        x: 0,
        y: 0
    }

    start() {
        this.running = true
        if (this.points.length === 0) {
            const initialX = randomIntInRange(1, 5822)
            const xInput = (initialX < 2911 ? initialX : 5822 - initialX)
            const initialY = Math.round(randomIntInRange(0, getYatX(xInput)))
            const point = {
                id: v4(),
                x: initialX, y: initialY
            };
            this.lastPoint = point
            this.points = [point]
        }
        this.tick();
    }

    pause() {
        this.running = false;
    }

    reset() {
        const running = false;
        this.points = [];
    }

    tick() {
        if (this.running) {
            const vertex = randomElOFArr(this.vertices)
            const newPoint: {
                x: number,
                y: number,
                id?: string
            } = {
                x: Math.round((this.lastPoint.x + vertex.x) / 2),
                y: Math.round((this.lastPoint.y + vertex.y) / 2),
            }

            if (newPoint.y > getYatX(newPoint.x)) {
                console.warn("Point outside triangle")
                console.warn('newPoint', newPoint)
                console.warn('height at x:', getYatX(newPoint.x))
            }

            (newPoint as {
                x: number,
                y: number,
                id: string,
            }).id =v4()

            this.lastPoint = newPoint as {
                x: number,
                    y: number,
                    id: string,
            }

                // const initialY = randomIntInRange(0, getYatX(xInput))
                this.points = [
                    ...this.points,
                    newPoint as {
                        x: number,
                        y: number,
                        id: string,
                    }
                ]
            requestAnimationFrame(
                () => this.tick()
            )
        }
    }

    // Render the UI as a function of component state
    render() {
        return html`
            <div>
                <div class="controls">
                    <button @click=${this.start}>start</button>
                    <button @click=${this.pause}>stop</button>
                    <button @click=${this.reset}>reset</button>
                </div>
                <div>
                    points: ${this.points.length}
                    <br>
                    running: ${this.running}
                </div>
                <div class="triangle">
                    ${repeat(
                            this.points,
                            (point) => point.id,
                            (point) => html`
                                <app-point x=${point.x} y=${point.y}></app-point>
                            `
                    )}
                </div>
            </div>`;
    }
}
