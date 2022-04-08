import { Instance, types } from "mobx-state-tree";

const ConfigContentModel = types
  .model({
    minInstances: "",
    maxInstances: "",
    port: "",
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

interface IConfigContentModel extends Instance<typeof ConfigContentModel> {}

const initConfigContentModel = (): IConfigContentModel =>
  ConfigContentModel.create();

export { type IConfigContentModel, initConfigContentModel};
