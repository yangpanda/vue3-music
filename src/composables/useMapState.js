import { computed } from 'vue';
import { useStore } from 'vuex';

const useMapState = (namespace) => {
  const store = useStore();
  if (namespace in store.state) {
    return Object.fromEntries(
      Object.keys(store.state[namespace]).map((key) => {
        return [key, computed(() => store.state[namespace][key])];
      }),
    );
  }
};

export default useMapState;
