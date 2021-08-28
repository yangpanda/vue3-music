import * as mv from '@/api/service/mv.js'
import { ref, onMounted } from 'vue'

export function useMvPrivatecontent() {
  const privatecontents = ref([])
  const getPrivatecontent = async () => {
    const response = await mv.getPrivatecontent(3)
    response.result.map(item => privatecontents.value.push(item))
  }

  onMounted(getPrivatecontent)

  return {
    privatecontents
  }
}

export function useMvGetNewMv() {
  const newMv = ref([])
  const getNewMv = async () => {
    const response = await mv.getNewMv(8);
    response.data.map(item => newMv.value.push(item));
  };

  onMounted(getNewMv);

  return {
    newMv
  }
}

export function useMvGetNeteaseMv() {
  const neteaseMv = ref([])
  const getNeteaseMv = async () => {
    const response = await mv.getNeteaseMv(8);
    response.data.map(item => neteaseMv.value.push(item));
  };

  onMounted(getNeteaseMv);

  return {
    neteaseMv
  }
}
