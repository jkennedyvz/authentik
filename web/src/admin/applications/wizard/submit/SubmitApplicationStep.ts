import {
    BackStep,
    CancelWizard,
    CloseWizard,
} from "@goauthentik/components/ak-wizard-main/commonWizardButtons";

import { msg } from "@lit/localize";
import { html } from "lit";

import "./ak-application-wizard-submit-application.js";

export class SubmitApplicationStep implements ApplicationStepType {
    id = "submit";
    label = msg("Submit Application");
    disabled = true;
    valid = false;

    get buttons() {
        return this.valid ? [CloseWizard] : [BackStep, CancelWizard];
    }

    render() {
        return html`<ak-application-wizard-submit-application></ak-application-wizard-submit-application>`;
    }
}
