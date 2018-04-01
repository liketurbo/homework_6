import action from './actions/main-actions';
import store from './store/main-store';
import '../styles/index.css';

const input = document.querySelector('.view-stub__input');
const button = document.querySelector('.view-stub__apply');
const log = document.querySelector('.log');

const msgSent = () => {
  // eslint-disable-next-line
  console.log('rerender dom');
  log.innerHTML = store.msgs.map(msg => `<span class="log__msg">${msg}</span>`);
};

store.bind('change', msgSent);

button.addEventListener('click', () => {
  action.sendMsg(input.value);
});
