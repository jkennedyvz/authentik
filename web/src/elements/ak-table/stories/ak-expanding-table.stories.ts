import { Meta, StoryObj } from "@storybook/web-components";
import { slug } from "github-slugger";

import { LitElement, TemplateResult, html } from "lit";
import { customElement, state } from "lit/decorators.js";

import { TableSortEvent } from "../TableColumn.js";
import "../ak-expandable-table.js";
import { ExpandableTable } from "../ak-expandable-table.js";
import { type TableFlat } from "../types";
import "./ak-gradient-demo.js";
import { nutritionDbUSDA } from "./sample_nutrition_db.js";

const metadata: Meta<ExpandableTable> = {
    title: "Elements / Table / <ak-expandable-table>",
    component: "ak-expanding-table",
    parameters: {
        docs: {
            description: {
                component: "Our basic table, now with expandables",
            },
        },
    },
    argTypes: {
        content: {
            type: "function",
            description: "An array of arrays of items to show",
        },
        columns: {
            type: "function",
            description: "An array of column headers",
        },
        order: {
            type: "string",
            description:
                "A key indicating which column to highlight as the current sort target, if any",
        },
    },
};

export default metadata;

type Story = StoryObj;

const container = (testItem: TemplateResult) =>
    html` <div style="background: #fff; padding: 2em">
        <style>
            li {
                display: block;
            }
            p {
                margin-top: 1em;
            }
        </style>
        ${testItem}
    </div>`;

const columns = ["Name", "Calories", "Protein", "Fiber", "Sugar"];
const content: TableFlat = {
    kind: "flat",
    content: nutritionDbUSDA.map(({ name, description, calories, sugar, fiber, protein }) => ({
        key: slug(name),
        content: [name, calories, protein, fiber, sugar].map((name) => html`${name}`),
        expansion: () => html`<ak-demo-gradient>${description}</ak-demo-gradient>`,
    })),
};

export const Default: Story = {
    render: () =>
        container(
            html`<ak-expandable-table
                .columns=${columns}
                .content=${content}
            ></ak-expandable-table>`,
        ),
};

type Ord = Record<string | number, string | number>;

@customElement("ak-expandable-table-test-sort")
export class SimpleTableSortTest extends LitElement {
    @state()
    order = "name";

    @state()
    sortDown = true;

    columns = columns.map((a) => [a, a.toLowerCase()]);

    get content() {
        const contentCopy = [...nutritionDbUSDA];
        const comparison = this.sortDown
            ? (a: Ord, b: Ord) => (a[this.order] < b[this.order] ? -1 : 1)
            : (a: Ord, b: Ord) => (a[this.order] < b[this.order] ? 1 : -1);
        contentCopy.sort(comparison);
        return {
            kind: "flat",
            content: contentCopy.map(({ name, description, calories, sugar, fiber, protein }) => ({
                key: slug(name),
                content: [name, calories, protein, fiber, sugar].map((name) => html`${name}`),
                expansion: () => html`<ak-demo-gradient>${description}</ak-demo-gradient>`,
            })),
        };
    }

    render() {
        const onTableSort = (event: TableSortEvent) => {
            if (event.value === this.order) {
                this.sortDown = !this.sortDown;
                return;
            }
            this.order = event.value;
        };

        const direction = this.sortDown ? "" : "-";

        return html`<ak-expandable-table
            .columns=${this.columns}
            .content=${this.content}
            .order="${direction}${this.order}"
            @tablesort=${onTableSort}
        ></ak-expandable-table>`;
    }
}

export const TableWithSorting: Story = {
    render: () => container(html`<ak-expandable-table-test-sort></ak-expandable-table-test-sort>`),
};
