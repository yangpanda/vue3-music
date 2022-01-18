import { useStore } from 'vuex';

const useMapMutations = (namespace) => {
  const store = useStore();
  if (namespace in store.state) {
    const moduleMutations = Object.keys(store._mutations).filter((key) => key.startsWith(namespace));
    return Object.fromEntries(
      moduleMutations.map((key) => {
        return [key.slice(key.indexOf('/') + 1), (playload) => store.commit(key, playload)];
      }),
    );
  }
};

export default useMapMutations;
