import { mapState } from '@/lib/lib.js';
import { computed, h, defineComponent } from 'vue';
import { NResult } from 'naive-ui';

const useLoginStatus = () => {
  const { userinfo, logined } = mapState();
  const loginStatus = computed(() => logined.value && userinfo.value);

  return {
    loginStatus,
  };
};

export default useLoginStatus;
