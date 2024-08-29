import { bound } from "@goauthentik/elements/decorators/bound";

import { html, nothing } from "lit";
import { queryAll, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";

import PFButton from "@patternfly/patternfly/components/Button/button.css";

import { SimpleTable } from "./ak-simple-table.js";
import type { TableRow } from "./types";

type Constructor<T = object> = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    new (...args: any[]): T;
    prototype: T;
};

/**
 * class ExpansionRenderer
 *
 * This mixin provides the visual controls and state for the tables with an expansion row. It adds:
 *
 * - style for the control
 * - The control for a row
 * - The expansion row into which the content will be rendered
 * - a state which memoizes which rows are open/closed
 */

export function ExpansionRenderer<T extends Constructor<SimpleTable>>(superclass: T) {
    const parentStyles = (superclass as unknown as typeof SimpleTable)?.styles ?? [];

    class ExpansionRenderer extends superclass {
        static get styles() {
            return [parentStyles, PFButton];
        }

        @state()
        expandedRows: (string | symbol)[] = [];

        @queryAll("tr[value]")
        trows!: HTMLTableRowElement[];

        get tvalues() {
            return Array.from(this.trows)
                .map((tr) => tr.getAttribute("value"))
                .filter((tr) => tr !== null);
        }

        get expandedOnThisPage() {
            const expanded = new Set(this.expandedRows);
            return this.tvalues.filter((value) => value !== null && expanded.has(value));
        }

        get allOpen() {
            return (
                this.tvalues.length > 0 && this.expandedOnThisPage.length === this.tvalues.length
            );
        }

        get anyOpen() {
            return this.expandedOnThisPage.length !== 0;
        }

        protected onExpansion(ev: Event, key: string) {
            ev.stopPropagation();
            this.expandedRows = this.expandedRows.includes(key)
                ? this.expandedRows.filter((v) => v !== key)
                : [...this.expandedRows, key];
        }

        protected onExpandAll(ev: Event) {
            ev.stopPropagation();
            this.expandedRows = !this.anyOpen ? this.tvalues : [];
        }

        @bound
        renderExpansionControl(key: string, expanded: boolean) {
            const expandedClass = { "pf-m-expanded": expanded };
            return html`<td part="expand-cell" class="pf-c-table__toggle" role="cell">
                <button
                    class="pf-c-button pf-m-plain ${classMap(expandedClass)}"
                    @click=${(ev: Event) => this.onExpansion(ev, key)}
                >
                    <div part="expand-icon" class="pf-c-table__toggle-icon">
                        &nbsp;<i class="fas fa-angle-down" aria-hidden="true"></i>&nbsp;
                    </div>
                </button>
            </td>`;
        }

        @bound
        renderExpandAllControl() {
            const expandedClass = { "pf-m-expanded": this.anyOpen };
            return html`<th part="expand-all-cell" class="pf-c-table__toggle" role="cell">
                <button
                    class="pf-c-button pf-m-plain ${classMap(expandedClass)}"
                    @click=${(ev: Event) => this.onExpandAll(ev)}
                >
                    <div part="expand-icon" class="pf-c-table__toggle-icon">
                        &nbsp;<i class="fas fa-angle-down" aria-hidden="true"></i>&nbsp;
                    </div>
                </button>
            </th>`;
        }

        @bound
        renderExpansion(row: TableRow, expanded: boolean) {
            const columns = this.columns.length + 1;
            const hasKey = row.key !== undefined;
            return hasKey && row.expansion && expanded
                ? html` <tr
                      part="expansion-row"
                      key=${ifDefined(row.key)}
                      class="pf-c-table__expandable-row pf-m-expanded"
                      role="row"
                  >
                      <td colspan=${columns} part="expansion-content">${row.expansion()}</td>
                  </tr>`
                : nothing;
        }
    }
    return ExpansionRenderer;
}
