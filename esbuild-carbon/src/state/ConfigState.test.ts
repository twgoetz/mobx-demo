import { initConfigModel } from './ConfigState3';

describe('state handling test', () => {
  it('should validate min and max instances', () => {
    const model = initConfigModel();

    model.content.setMinInstances('0');
    expect(model.minInstancesValid).toBeUndefined();

    model.content.setMinInstances('-1');
    expect(model.minInstancesValid).not.toBeUndefined();

    model.content.setMinInstances('1');
    model.content.setMaxInstances('2');
    expect(model.minInstancesValid).toBeUndefined();
    expect(model.maxInstancesValid).toBeUndefined();

    model.content.setMaxInstances('0');
    expect(model.minInstancesValid).not.toBeUndefined();
    expect(model.maxInstancesValid).not.toBeUndefined();
  });
});
