import * as mv from '@/api/service/mv.js'
import { ref, onMounted } from 'vue'

export function useMvGetPrivatecontent() {
  const privatecontent = ref([])
  const getPrivatecontent = async () => {
    const response = await mv.getPrivatecontent(3)
    response.result.map(item => privatecontent.value.push(item))
  }

  onMounted(getPrivatecontent)

  return {
    privatecontent
  }
}

export function useMvGetPersonalizedMv() {
  const personalized_mv = ref([])
  const getPersonalizedMv = async () => {
    const response = await mv.getPersonalizedMv();
    response.result.map(item => personalized_mv.value.push(item));
    personalized_mv.value = personalized_mv.value.slice(0, 3);
  };

  onMounted(getPersonalizedMv);

  return {
    personalized_mv
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
