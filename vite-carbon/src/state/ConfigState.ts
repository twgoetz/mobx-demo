import { types } from 'mobx-state-tree';
import { maxInstancesError, minInstancesError, portError } from './Validation';

const ConfigModel = types
    .model({
        minInstances: '',
        maxInstances: '',
        port: '',
    })
    .actions((self) => ({
        setMinInstances(value: string): void {
            self.minInstances = value;
        },
        setMaxInstances(value: string): void {
            self.maxInstances = value;
        },
        setPort(value: string): void {
            self.port = value;
        }
    }))
    .views((self) => ({
        get minInstancesError(): string | undefined {
            const minError = minInstancesError(self.minInstances);
            if (minError) {
                return minError;
            }
            const maxError = maxInstancesError(self.maxInstances);
            if (maxError) {
                return undefined;
            }
            const min = Number.parseInt(self.minInstances);
            const max = Number. parseInt(self.maxInstances);
            if (min > max) {
                return 'The minimum value must be no larger than the maximum value';
            }
            return undefined;
        },
        get maxInstancesError(): string | undefined {
            const maxError = maxInstancesError(self.maxInstances);
            if (maxError) {
                return maxError;
            }
            const minError = minInstancesError(self.minInstances);
            if (minError) {
                return undefined;
            }
            const min = Number.parseInt(self.minInstances);
            const max = Number. parseInt(self.maxInstances);
            if (min > max) {
                return 'The maximum value must be no smaller than the minimum value';
            }
            return undefined;
        },
        get portError(): string | undefined {
            return portError(self.port);
        },
        get isValid(): boolean {
            return !minInstancesError && !maxInstancesError && !portError;
        }
    }))
    .views((self) => ({
        get isValid(): boolean {
            return !(self.minInstancesError || self.maxInstancesError || self.portError);
        }

    }));

export { ConfigModel };
