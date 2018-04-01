import dispatcher from '../utils/dispatcher';
import store from '../store/main-store';

dispatcher.register((payload) => {
  // eslint-disable-next-line
  console.log('in main-reducer.js', { payload });
  if (payload.eventName === 'sentMsg') {
    store.msgs.push(payload.data);
    store.trigger('change');
  }
});

export default dispatcher;
