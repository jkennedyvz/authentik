import { AKElement } from "@goauthentik/elements/Base";

import { TemplateResult, css, html, nothing } from "lit";

import PFToolbar from "@patternfly/patternfly/components/Toolbar/toolbar.css";
import PFBase from "@patternfly/patternfly/patternfly-base.css";

type Renderer = TemplateResult | typeof nothing;

export class Toolbar extends AKElement {
    static get styles() {
        return [
            PFBase,
            PFToolbar,
            css`
                .pf-c-toolbar__content {
                    padding-left: 0;
                }
            `,
        ];
    }

    public renderSearch(): Renderer {
        return nothing;
    }

    public renderToolbar(): Renderer {
        return nothing;
    }

    public renderToolbarSelected(): Renderer {
        return nothing;
    }

    public renderToolbarAfter(): Renderer {
        return nothing;
    }

    public renderTablePagination(): Renderer {
        return nothing;
    }

    public override render() {
        const [search, toolbar, selected, after, pagination] = [
            this.renderSearch(),
            this.renderToolbar(),
            this.renderToolbarAfter(),
            this.renderToolbarSelected(),
            this.renderTablePagination(),
        ];

        return html`<div class="pf-c-toolbar">
            <div class="pf-c-toolbar__content">
                ${search !== nothing
                    ? html` <div class="pf-c-toolbar__group pf-m-search-filter">${search}</div>`
                    : nothing}
                ${toolbar !== nothing
                    ? html` <div class="pf-c-toolbar__bulk-select">${toolbar}</div>`
                    : nothing}
                ${after !== nothing
                    ? html` <div class="pf-c-toolbar__group">${after}</div>`
                    : nothing}
                ${selected !== nothing
                    ? html` <div class="pf-c-toolbar__group">${selected}</div>`
                    : nothing}
                ${pagination !== nothing
                    ? html` <div class="pf-c-toolbar__group">${pagination}</div>`
                    : nothing}
            </div>
        </div>`;
    }
}
