import {
    BackStep,
    CancelWizard,
    CloseWizard,
    DisabledNextStep,
    NextStep,
    SubmitStep,
} from "@goauthentik/components/ak-wizard-main/commonWizardButtons";

import { msg } from "@lit/localize";
import { html } from "lit";

import "./application/ak-application-wizard-application-details";
import "./auth-method-choice/ak-application-wizard-authentication-method-choice";
import "./commit/ak-application-wizard-commit-application";
import "./methods/ak-application-wizard-authentication-method";
import "./policies/ak-application-wizard-policy-binding-form";
import "./policies/ak-application-wizard-policy-bindings";
import { ApplicationStep as ApplicationStepType } from "./types";

/**
 * In the current implementation, all of the child forms have access to the wizard's
 * global context, into which all data is written, and which is updated by events
 * flowing into the top-level orchestrator.
 */

class ApplicationStep implements ApplicationStepType {
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

class ProviderMethodStep implements ApplicationStepType {
    id = "provider-method";
    label = msg("Provider Type");
    disabled = false;
    valid = false;

    get buttons() {
        return [this.valid ? NextStep : DisabledNextStep, BackStep, CancelWizard];
    }

    render() {
        // prettier-ignore
        return html`<ak-application-wizard-authentication-method-choice
          ></ak-application-wizard-authentication-method-choice> `;
    }
}

class ProviderStepDetails implements ApplicationStepType {
    id = "provider-details";
    label = msg("Provider Configuration");
    disabled = true;
    valid = false;
    get buttons() {
        return [BackStep, this.valid ? NextStep : DisabledNextStep, CancelWizard];
    }

    render() {
        return html`<ak-application-wizard-authentication-method></ak-application-wizard-authentication-method>`;
    }
}

class PolicyStepDetails implements ApplicationStepType {
    id = "policy-bindings";
    label = msg("Policy / Group / User Bindings");
    disabled = true;
    valid = true;
    get buttons() {
        return [BackStep, SubmitStep, CancelWizard];
    }

    render() {
        return html`<ak-application-wizard-policy-bindings></ak-application-wizard-policy-bindings>`;
    }
}

class PolicyStepBinding implements ApplicationStepType {
    id = "policy-binding-form";
    label = msg("Bind one Policy / Group / User to this Application");
    disabled = false;
    valid = false;
    hidden = true;
    get buttons() {
        return [
            BackStep,
            this.valid ? [msg("Next"), { command: "goto", step: 3 }] : DisableNextStep,
            CancelWizard,
        ];
    }

    render() {
        return html`<ak-application-wizard-policy-binding-form></ak-application-wizard-policy-binding-form>`;
    }
}

class SubmitApplicationStep implements ApplicationStepType {
    id = "submit";
    label = msg("Submit Application");
    disabled = true;
    valid = false;

    get buttons() {
        return this.valid ? [CloseWizard] : [BackStep, CancelWizard];
    }

    render() {
        return html`<ak-application-wizard-commit-application></ak-application-wizard-commit-application>`;
    }
}

export const newSteps = (): ApplicationStep[] => [
    new ApplicationStep(),
    new ProviderMethodStep(),
    new ProviderStepDetails(),
    new PolicyStepDetails(),
    new PolicyStepBinding(),
    new SubmitApplicationStep(),
];
