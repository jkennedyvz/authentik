import { ISearchSelectApi } from "@goauthentik/elements/forms/SearchSelect/ak-search-select-ez.js";
import "@goauthentik/elements/forms/SearchSelect/ak-search-select-ez.js";

const withQuery = <T>(search: string | undefined, args: T) => (query ? { ...args, search } : args);

const SearchConfig = ISearchSelectApi<Policy> | ISearchSelectApi<Group> | ISearchSelectApi<User>;

@customElement("ak-policy-binding-form-view")
export class PolicyBindingFormView extends AKElement {
    @state()
    policyGroupUser: target = target.policy;

    @property({ type: Object, attribute: false })
    instance?: PolicyBinding;

    get policySearchConfig() {
        return {
            fetchObjects: async (query?: string): Promise<Policy[]> => {
                const args: PoliciesAllListRequest = withQuery(query, {
                    ordering: "name",
                });
                const policies = await new PoliciesApi(DEFAULT_CONFIG).policiesAllList(args);
                return policies.results;
            },
            groupBy: (items: Policy[]) => groupBy(items, (policy) => policy.verboseNamePlural),
            renderElement: (policy: Policy): string => policy.name,
            value: (policy: Policy | undefined): string | undefined => policy?.pk,
            selected: (policy: Policy): boolean => policy.pk === this.instance?.policy,
        };
    }

    get groupSearchConfig() {
        return {
            fetchObjects: async (query?: string): Promise<Group[]> => {
                const args: CoreGroupsListRequest = withQuery(query, {
                    ordering: "name",
                    includeUsers: false,
                });
                const groups = await new CoreApi(DEFAULT_CONFIG).coreGroupsList(args);
                return groups.results;
            },
            renderElement: (group: Group): string => group.name,
            value: (group: Group | undefined): string | undefined => group?.pk,
            selected: (group: Group): boolean => group.pk === this.instance?.group,
        };
    }

    get userSearchConfig() {
        return {
            fetchObjects: async (query?: string): Promise<User[]> => {
                const args: CoreUsersListRequest = withQuery(query, {
                    ordering: "username",
                });
                const users = await new CoreApi(DEFAULT_CONFIG).coreUsersList(args);
                return users.results;
            },
            renderElement: (user: User): string => user.username,
            renderDescription: (user: User) => html`${user.name}`,
            value: (user: User | undefined): number | undefined => user?.pk,
            selected: (user: User): boolean => user.pk === this.instance?.user,
        };
    }

    renderModeSelector(): TemplateResult {
        return html` <ak-toggle-group
            value=${this.policyGroupUser}
            @ak-toggle=${(ev: CustomEvent<{ value: target }>) => {
                this.policyGroupUser = ev.detail.value;
            }}
        >
            <option value=${target.policy}>${msg("Policy")}</option>
            <option value=${target.group}>${msg("Group")}</option>
            <option value=${target.user}>${msg("User")}</option>
        </ak-toggle-group>`;
    }

    renderSearch(title: string, name: string, config: SearchConfig, policyKind: target) {
        return html`<ak-form-element-horizontal
            label=${title}
            name="policy"
            ?hidden=${this.policyGroupUser !== policyKind}
        >
            <ak-search-select-ez config=${config} blankable></ak-search-select-ez>
        </ak-form-element-horizontal>`;
    }

    render() {
        return html` <div class="pf-c-card pf-m-selectable pf-m-selected">
            <div class="pf-c-card__body">${this.renderModeSelector()}</div>
            <div class="pf-c-card__footer">
                ${this.renderSearch(
                    msg("Policy"),
                    "policy",
                    target.policy,
                    this.policySearchConfig,
                )}
                ${this.renderSearch(msg("Group"), "group", target.group, this.groupSearchConfig)}
                ${this.renderSearch(msg("User"), "user", target.user, this.userSearchConfig)}
            </div>
            <ak-switch-input
                name="enabled"
                ?checked=${first(this.instance?.enabled, true)}
                label=${msg("Enabled")}
            ></ak-switch-input>
            <ak-switch-input
                name="negate"
                ?checked=${first(this.instance?.negate, false)}
                label=${msg("Negate result")}
                help=${msg("Negates the outcome of the binding. Messages are unaffected.")}
            ></ak-switch-input>
            <ak-number-input
                label=${msg("Order")}
                name="order"
                value="${this.instance?.order ?? this.defaultOrder}"
                required
            ></ak-number-input>
            <ak-number-input
                label=${msg("Timeout")}
                name="timeout"
                value="${first(this.instance?.timeout, 30)}"
                required
            ></ak-number-input>
            <ak-radio-input
                name="failureResult"
                label=${msg("Failure result")}
                options=${PASS_FAIL}
            ></ak-radio-input>
        </div>`;
    }
}
