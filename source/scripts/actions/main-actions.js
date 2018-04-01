import appDispatcher from '../reducers/main-reducer';

const MainActoins = {
  sendMsg(msg) {
    // eslint-disable-next-line
    console.log('in main-actions.js', { msg });
    appDispatcher.dispatch({
      eventName: 'sentMsg',
      data: msg,
    });
  },
};

export default MainActoins;
