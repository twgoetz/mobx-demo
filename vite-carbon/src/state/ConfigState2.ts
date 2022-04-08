import { Instance, types } from "mobx-state-tree";
import { maxInstancesError, minInstancesError, portError } from "./Validation";

const ConfigContentModel = types
  .model({
    minInstances: types.maybe(types.string),
    maxInstances: types.maybe(types.string),
    port: types.maybe(types.string),
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
    },
  }));

const ConfigUIModel = types
  .model({
    content: ConfigContentModel,
  })
  .views((self) => ({
    get minInstancesValid(): string | undefined {
      if (typeof(self.content.minInstances) === 'undefined') {
        return undefined;
      }
      const minErr = minInstancesError(self.content.minInstances);
      if (minErr) {
        return minErr;
      }
      if (typeof(self.content.maxInstances) === 'undefined' || maxInstancesError(self.content.maxInstances)) {
        return undefined;
      }
      const minVal = parseInt(self.content.minInstances, 10);
      const maxVal = parseInt(self.content.maxInstances, 10);
      if (minVal > maxVal) {
        return 'The minimum number of instances must not be larger than the maximum number of instances';
      }
    },
    get maxInstancesValid(): string | undefined {
      if (typeof(self.content.maxInstances) === 'undefined') {
        return undefined;
      }
      const maxErr = maxInstancesError(self.content.maxInstances);
      if (maxErr) {
        return maxErr;
      }
      if (typeof(self.content.minInstances) === 'undefined' || minInstancesError(self.content.minInstances)) {
        return undefined;
      }
      const minVal = parseInt(self.content.minInstances, 10);
      const maxVal = parseInt(self.content.maxInstances, 10);
      if (minVal > maxVal) {
        return 'The maximum number of instances must not be less than the minimum number of instances';
      }
    },
    get portValid(): string | undefined {
      if (typeof(self.content.port) === 'undefined') {
        return undefined;
      }
      return portError(self.content.port);
    },
  }));

interface IConfigContentModel extends Instance<typeof ConfigContentModel> {}
interface IConfigUIModel extends Instance<typeof ConfigUIModel> {}

const initConfigModel = (): IConfigUIModel =>
  ConfigUIModel.create({content: ConfigContentModel.create({})});

export { type IConfigContentModel, type IConfigUIModel, initConfigModel };
