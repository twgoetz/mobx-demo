import { initConfigModel } from './ConfigState';

describe('state handling test', () => {
  it('should validate min and max instances', () => {
    const model = initConfigModel();

    model.content.setMinInstances('0');
    expect(model.minInstancesError).toBeUndefined();

    model.content.setMinInstances('-1');
    expect(model.minInstancesError).not.toBeUndefined();

    model.content.setMinInstances('1');
    model.content.setMaxInstances('2');
    expect(model.minInstancesError).toBeUndefined();
    expect(model.maxInstancesError).toBeUndefined();

    model.content.setMaxInstances('0');
    expect(model.minInstancesError).not.toBeUndefined();
    expect(model.maxInstancesError).not.toBeUndefined();
  });
});
