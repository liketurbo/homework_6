import MicroEvent from '../utils/microevent';

const MainStore = {
  msgs: [],
  getAll() {
    return this.items;
  },
};
MicroEvent.mixin(MainStore);

export default MainStore;
