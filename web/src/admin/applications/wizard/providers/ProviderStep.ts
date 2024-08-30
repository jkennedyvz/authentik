import {
    BackStep,
    CancelWizard,
    DisabledNextStep,
    NextStep,
} from "@goauthentik/components/ak-wizard-main/commonWizardButtons";

import { msg } from "@lit/localize";
import { html } from "lit";

import "./ak-application-wizard-provider.js";

export class ProviderStep implements ApplicationStepType {
    id = "provider-details";
    label = msg("Provider Configuration");
    disabled = true;
    valid = false;
    get buttons() {
        return [BackStep, this.valid ? NextStep : DisabledNextStep, CancelWizard];
    }

    render() {
        return html`<ak-application-wizard-provider></ak-application-wizard-provider>`;
    }
}
