import useSWR, { type Fetcher } from 'swr';
import { useSalableContext } from './Context';
import { Schemas } from './types';

type HasCapability = {
  (capability: string): boolean;
  <T extends string>(capabilities: readonly T[]): { [Key in T]: boolean };
};

type UserLicense = {
  uuid: string;
  subscriptionUuid: string;
  planUuid: string;
  purchaser: string;
  granteeId: string;
  email: string;
  name: string;
  startTime: Date;
  endTime: Date;
  updatedAt: Date;
  status:
    | 'ACTIVE'
    | 'CANCELED'
    | 'EVALUATION'
    | 'SCHEDULED'
    | 'TRIALING'
    | 'INACTIVE';
};

/**
 * Should we have two separate functions rather than just `hasCapability`.
 *
 * The alternative solution is `hasCapability: (capabilityName: string) => bool
 * and `checkCapabilities(capabilities: string[]): Record<string, boolean>`
 */
type UserData = {
  isTest: boolean;
  licenses: UserLicense[];
  /**
   * A list of combined capabilities that the user has access to based on their
   * active licenses. This array contains both active and in-active
   * capabilities.
   */
  capabilities: { name: string; status: Schemas['Capability']['status'] }[];
  /**
   * Used to check whether a user has either an active capability, or a list of
   * supplied capabilities.
   *
   * All inactive capabilities will return false. If you want to check against a
   * capability that isn't active, use the `capabilities` array returned by this
   * hook.
   *
   * To check a single capability:
   * ```
   * const hasCreate = hasCapability('create');
   * ```
   *
   * To check a list of capabilities:
   * ```
   * const { create, update } = hasCapability(['create', 'update']);
   * ```
   */
  hasCapability: HasCapability;
};

const fetcher: Fetcher<Schemas['License'][], string> = (...args) =>
  fetch(...args).then((res) => res.json());

export function useUser(): UserData | null {
  const { granteeId } = useSalableContext();
  if (!granteeId) return null;

  const { data, isLoading } = useSWR(
    `https://api.salable.app/licenses/granteeId/${granteeId}`,
    fetcher,
  );

  if (isLoading || typeof data === 'undefined') return null;

  const globalCapabilities = data.flatMap(
    (license) =>
      license.capabilities?.flatMap((capability) => ({
        // TODO: Both `name` and `status` should be required, not optional.
        name: capability.name as string,
        status: capability.status as Schemas['Capability']['status'],
      })) ?? [],
  );

  // Overload for checking an individual capability.
  function hasCapability(capability: string): boolean;
  // Overload for checking a list of capabilities and receiving an object with
  // those capabilities as keys.
  function hasCapability<T extends string>(
    capabilities: readonly T[],
  ): { [Key in T]: boolean };

  // Implementation of the hasCapability function based on the above overloads.
  function hasCapability<T extends string>(
    capabilityOrCapabilities: string | readonly string[],
  ): boolean | { [Key in T]: boolean } {
    const activeCapabilities = globalCapabilities
      .filter(({ status }) => status === 'ACTIVE')
      .map(({ name }) => name);

    if (typeof capabilityOrCapabilities === 'string') {
      return activeCapabilities.includes(capabilityOrCapabilities);
    }

    return capabilityOrCapabilities.reduce((acc, curr) => {
      return {
        ...acc,
        [curr]: activeCapabilities.includes(curr),
      };
    }, {}) as { [Key in T]: boolean };
  }

  const licenses: UserLicense[] = data.map((license) => ({
    email: license.email as string,
    name: license.name as string,
    purchaser: license.purchaser as string,
    granteeId: license.granteeId as string,
    uuid: license.uuid as string,
    planUuid: license.planUuid as string,
    subscriptionUuid: license.subscriptionUuid as string,
    status: license.status as UserLicense['status'],
    startTime: new Date(license.startTime as string),
    endTime: new Date(license.endTime as string),
    updatedAt: new Date(license.updatedAt as string),
  }));

  return {
    isTest: data.some((license) => license.isTest),
    licenses,
    capabilities: globalCapabilities,
    hasCapability,
  };
}