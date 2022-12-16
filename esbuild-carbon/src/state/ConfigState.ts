import { Instance, SnapshotIn, types } from "mobx-state-tree";
import { IConfiguration } from "../types";
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
    import(config: IConfiguration): void {
      const {
        port,
        instances: { max, min },
      } = config;
      self.maxInstances = max.toString();
      self.minInstances = min.toString();
      self.port = port?.toString();
    },
    export(): IConfiguration {
      const max = parseInt(self.maxInstances || "1");
      const min = parseInt(self.minInstances || "0");
      const port =
        typeof self.port === "undefined" ? undefined : parseInt(self.port);
      return {
        instances: {
          min,
          max,
        },
        port,
      };
    },
  }));

const ConfigUIModel = types
  .model({
    content: ConfigContentModel,
    isDirty: types.boolean,
  })
  .actions((self) => ({
    setIsDirty(flag: boolean): void {
      self.isDirty = flag;
    },
  }))
  .views((self) => ({
    get minInstancesError(): string | undefined {
      if (typeof self.content.minInstances === "undefined") {
        return undefined;
      }
      const minErr = minInstancesError(self.content.minInstances);
      if (minErr) {
        return minErr;
      }
      if (
        typeof self.content.maxInstances === "undefined" ||
        maxInstancesError(self.content.maxInstances)
      ) {
        return undefined;
      }
      const minVal = parseInt(self.content.minInstances, 10);
      const maxVal = parseInt(self.content.maxInstances, 10);
      if (minVal > maxVal) {
        return "The minimum number of instances must not be larger than the maximum number of instances";
      }
    },
    get maxInstancesError(): string | undefined {
      if (typeof self.content.maxInstances === "undefined") {
        return undefined;
      }
      const maxErr = maxInstancesError(self.content.maxInstances);
      if (maxErr) {
        return maxErr;
      }
      if (
        typeof self.content.minInstances === "undefined" ||
        minInstancesError(self.content.minInstances)
      ) {
        return undefined;
      }
      const minVal = parseInt(self.content.minInstances, 10);
      const maxVal = parseInt(self.content.maxInstances, 10);
      if (minVal > maxVal) {
        return "The maximum number of instances must not be less than the minimum number of instances";
      }
    },
    get portError(): string | undefined {
      if (typeof self.content.port === "undefined") {
        return undefined;
      }
      return portError(self.content.port);
    },
  }))
  .views((self) => ({
    get canSave(): boolean {
      return (
        typeof self.content.maxInstances !== "undefined" &&
        typeof self.content.minInstances !== "undefined" &&
        !self.maxInstancesError &&
        !self.minInstancesError &&
        !self.portError
      );
    },
  }));

interface IConfigContentModel extends Instance<typeof ConfigContentModel> {}
interface IConfigUIModel extends Instance<typeof ConfigUIModel> {}
interface IConfigUIStateInput extends SnapshotIn<IConfigUIModel> {}

const initConfigModel = (): IConfigUIModel => {
  const input: IConfigUIStateInput = {
    isDirty: false,
    content: {
    }
  }
  return ConfigUIModel.create(input);
}

export { type IConfigContentModel, type IConfigUIModel, initConfigModel };
