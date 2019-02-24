import bara, {createTrigger, useTrigger, useEvent} from '../src';

describe('main bara application', () => {
  it('run bara application', () => {
    const trigger = createTrigger('Test Trigger', () => {
      const [eventA, emitEventA] = useEvent({
        name: 'initialized',
      });
      const [eventB, emitEventB] = useEvent({
        name: 'update',
      });
    });

    const app = () => {
      console.log('Before initialize Bara application..');
      const t = useTrigger(trigger);
      console.log('Application exited!');
    };
    bara(app).run();
  });
});