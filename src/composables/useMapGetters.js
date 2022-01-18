import { computed } from 'vue';
import { useStore } from 'vuex';

const useMapGetters = (namespace) => {
  const store = useStore();
  if (namespace in store.state) {
    const moduleGetters = Object.keys(store.getters).filter((key) => key.startsWith(namespace));
    return Object.fromEntries(
      moduleGetters.map((key) => {
        return [key.slice(key.indexOf('/') + 1), computed(() => store.getters[key])];
      }),
    );
  }
};

export default useMapGetters;
