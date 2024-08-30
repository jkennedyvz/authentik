import {
    BackStep,
    CancelWizard,
    DisabledNextStep,
    NextStep,
} from "@goauthentik/components/ak-wizard-main/commonWizardButtons";

import { msg } from "@lit/localize";
import { html } from "lit";

import "./ak-application-wizard-provider-choice.js";

export class ProviderChoiceStep implements ApplicationStepType {
    id = "provider-type";
    label = msg("Provider Type");
    disabled = false;
    valid = false;

    get buttons() {
        return [this.valid ? NextStep : DisabledNextStep, BackStep, CancelWizard];
    }

    render() {
        // prettier-ignore
        return html`<ak-application-wizard-provider-choice
          ></ak-application-wizard-provider-choice> `;
    }
}
