import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("ak-demo-gradient")
export class AkGradientMultiline extends LitElement {
    static get styles() {
        return css`
            .gradient-multiline {
                position: relative;
                max-width: 42ch;
                margin: 40px auto;
                background-color: #fff;
                text-align: center;
                line-height: 1.5em;
                overflow: hidden;
            }

            .gradient-multiline span {
                color: #fff;
                background-color: #000;
                padding: 0.225rem 0.5rem;
                -webkit-box-decoration-break: clone;
                box-decoration-break: clone;
            }

            @supports (mix-blend-mode: lighten) {
                .gradient-multiline::after {
                    position: absolute;
                    content: "";
                    top: 0;
                    right: 0;
                    bottom: 0;
                    left: 0;
                    pointer-events: none;
                    background: linear-gradient(
                        60deg,
                        var(--pf-global--palette--orange-100),
                        var(--pf-global--palette--orange-500)
                    );

                    mix-blend-mode: lighten;
                }
            }
        `;
    }

    content = "";

    connectedCallback() {
        super.connectedCallback();
        this.content = this.textContent;
    }

    render() {
        return html`<h2 class="gradient-multiline"><span>${this.content}</span></h2>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "ak-demo-gradient": AkGradientMultiline;
    }
}
