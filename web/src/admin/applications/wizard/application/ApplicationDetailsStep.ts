import {
    CancelWizard,
    DisabledNextStep,
    NextStep,
} from "@goauthentik/components/ak-wizard-main/commonWizardButtons";

import { msg } from "@lit/localize";
import { html } from "lit";

import "./ak-application-wizard-application-details";

export class ApplicationDetailsStep implements ApplicationStepType {
    id = "application";
    label = msg("Application Details");
    disabled = false;
    valid = false;

    get buttons() {
        return [this.valid ? NextStep : DisabledNextStep, CancelWizard];
    }

    render() {
        return html`<ak-application-wizard-application-details></ak-application-wizard-application-details>`;
    }
}
