//import { policyOptions } from "@goauthentik/admin/applications/ApplicationForm";
// import { PFSize } from "@goauthentik/common/enums.js";
// import { first } from "@goauthentik/common/utils";
import { PFSize } from "@goauthentik/common/enums.js";
import "@goauthentik/components/ak-radio-input";
import "@goauthentik/components/ak-slug-input";
import "@goauthentik/components/ak-switch-input";
import "@goauthentik/components/ak-text-input";
import { Toolbar } from "@goauthentik/elements/ak-table/Toolbar";
import "@goauthentik/elements/ak-table/ak-select-table.js";
import { bound } from "@goauthentik/elements/decorators/bound";
import "@goauthentik/elements/forms/FormGroup";
import "@goauthentik/elements/forms/HorizontalFormElement";

import { msg } from "@lit/localize";
import { html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";

import PFButton from "@patternfly/patternfly/components/Button/button.css";

import { PolicyBinding } from "@goauthentik/api";

// import { ifDefined } from "lit/directives/if-defined.js";
import BasePanel from "../BasePanel";
import "./ak-policy-binding-form.js";

const COLUMNS = [
    [msg("Order"), "order"],
    [msg("Binding")],
    [msg("Enabled"), "enabled"],
    [msg("Timeout"), "timeout"],
    [msg("Actions")],
];

@customElement("ak-application-wizard-policy-bindings-toolbar")
export class ApplicationWizardPolicyBindingsToolbar extends Toolbar {
    static get styles() {
        return [...Toolbar.styles, PFButton];
    }

    public override renderToolbar() {
        return html`<button slot="trigger" class="pf-c-button pf-m-primary">
            ${msg("Bind existing policy/group/user")}
        </button>`;
    }
}

const _pageStates = ["table", "form"] as const;
type PageState = (typeof _pageStates)[number];

@customElement("ak-application-wizard-policy-bindings")
export class ApplicationWizardPolicyBindings extends BasePanel {
    @state()
    pageState: PageState = "table";

    @state()
    instance?: PolicyBinding;

    @bound
    onClick(ev: Event) {
        ev.stopPropagation();
        this.pageState = this.pageState === "table" ? "form" : "table";
    }

    renderPolicyBindingForm() {
        return html`<ak-policy-binding-form-view .instance=${ifDefined(this.instance)}>
        </ak-policy-binding-form-view>`;
    }

    renderEmptyCollection() {
        return html` <ak-select-table
                multiple
                order="order"
                .columns=${COLUMNS}
                .content=${[]}
            ></ak-select-table>
            <ak-empty-state header=${msg("No bound policies.")} icon="pf-icon-module">
                <div slot="body">${msg("No policies are currently bound to this object.")}</div>
                <div slot="primary">
                    <ak-forms-modal size=${PFSize.Medium}>
                        <span slot="submit"> ${msg("Create")} </span>
                        <span slot="header"> ${msg("Create Binding")} </span>
                        <p>Insert static binding form here</p>
                        <button
                            @click=${this.onClick}
                            slot="trigger"
                            class="pf-c-button pf-m-primary"
                        >
                            ${msg("Bind existing policy/group/user")}
                        </button>
                    </ak-forms-modal>
                </div>
            </ak-empty-state>`;
    }

    renderCollection() {
        return html`<ak-application-wizard-policy-bindings-toolbar
                @click=${this.onClick}
            ></ak-application-wizard-policy-bindings-toolbar>
            <ak-select-table
                multiple
                order="order"
                .columns=${COLUMNS}
                .content=${[]}
            ></ak-select-table> `;
    }

    render() {
        if (this.pageState === "form") {
            return this.renderPolicyBindingForm();
        }

        if (this.wizard.policies.length === 0) {
            return this.renderEmptyCollection();
        }

        return this.renderCollection();
    }
}

export default ApplicationWizardPolicyBindings;

declare global {
    interface HTMLElementTagNameMap {
        "ak-application-wizard-policy-bindings": ApplicationWizardPolicyBindings;
    }
}
