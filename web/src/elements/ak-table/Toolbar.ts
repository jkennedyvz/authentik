import { AKElement } from "@goauthentik/elements/Base";

import { css, html, nothing } from "lit";

import PFToolbar from "@patternfly/patternfly/components/Toolbar/toolbar.css";
import PFBase from "@patternfly/patternfly/patternfly-base.css";

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

    public renderSearch() {
        return nothing;
    }

    public renderToolbar() {
        return nothing;
    }

    public renderToolbarSelected() {
        return nothing;
    }

    public renderToolbarAfter() {
        return nothing;
    }

    public renderTablePagination() {
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
