<template>
  <the-scrollbar>
    <div :class="$style.container">
      <the-section title="最新MV" cols="4" :to="{ name: 'Mv', params: { order: '最新' } }">
        <template #cards>
          <card-mv v-for="item in state.newMvs" :key="item.id" :mv="item" />
        </template>
        <template #nav>
          <nav :class="$style.nav">
            <span
              v-for="value in areas"
              @click="() => (state.newMvArea = value)"
              :class="state.newMvArea === value ? $style.active : ''"
              >{{ value }}</span
            >
          </nav>
        </template>
      </the-section>
      <the-section title="网易出品" cols="4" :to="{ name: 'Mv', params: { type: '网易出品' } }">
        <template #cards>
          <card-mv v-for="item in state.neteaseMvs" :key="item.id" :mv="item" />
        </template>
      </the-section>
      <the-section title="MV排行榜" :to="{ name: 'MvRank' }">
        <div :class="$style.rank">
          <div :class="$style.rankItem" v-for="(item, index) in state.topMvs" :key="index">
            <div :class="$style.index">
              <span>{{ addZero(index + 1) }}</span>
              <the-icon v-if="item.lastRank < index + 1" name="arrow-up" size="16" color="red"></the-icon>
              <the-icon
                v-else-if="item.lastRank > index + 1"
                name="arrow-down"
                size="16"
                color="black"
              ></the-icon>
              <the-icon v-else name="transverse-line" size="16" color="black"></the-icon>
            </div>
            <the-link :to="{ name: 'MvDetail', params: { id: item.id } }">
              <img :class="$style.picture" v-lazy="item.picUrl" />
            </the-link>
            <div :class="$style.info">
              <the-link :to="{ name: 'MvDetail', params: { id: item.id } }">{{ item.name }}</the-link>
              <the-link :to="{ name: 'ArtistDetail', params: { id: item.artistId } }">{{
                item.artistName
              }}</the-link>
            </div>
          </div>
        </div>
        <template #nav>
          <nav :class="$style.nav">
            <span
              v-for="value in areas"
              @click="() => (state.topMvArea = value)"
              :class="state.topMvArea === value ? $style.active : ''"
              >{{ value }}</span
            >
          </nav>
        </template>
      </the-section>
    </div>
  </the-scrollbar>
</template>

<script setup>
import TheSection from '@/components/TheSection.vue';
import CardMv from '@/components/CardMv.vue';
import http from '@/api/http.js';
import { onMounted, reactive, watch } from 'vue';
import { addZero } from '@/utils/index.js';

const areas = ['内地', '港台', '欧美', '日本', '韩国'];

const state = reactive({
  newMvArea: '内地',
  topMvArea: '内地',
  newMvs: [],
  neteaseMvs: [],
  topMvs: [],
});

const getNewMv = () => {
  http
    .getNewMvs({
      area: state.newMvArea,
      limit: 8,
    })
    .then((res) => (state.newMvs = res));
};

const getTopMv = () => {
  http
    .getTopMvs({
      area: state.topMvArea,
      limit: 10,
    })
    .then((res) => (state.topMvs = res));
};
const getNetease = () => {
  http
    .getNeteaseMvs({
      limit: 8,
    })
    .then((res) => (state.neteaseMvs = res));
};

onMounted(() => {
  getNewMv();
  getNetease();
  getTopMv();
});

watch(
  () => state.newMvArea,
  () => getNewMv(),
);

watch(
  () => state.topMvArea,
  () => getTopMv(),
);
</script>

<style module>
.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 20px;
}
.container > :not(:first-child) {
  margin-top: 20px;
}
.nav > span {
  display: inline-block;
  width: 4em;
  text-align: right;
  cursor: pointer;
}
.nav > :not(:first-child) {
  position: relative;
}
.nav > :not(:first-child):hover {
  color: #18a058;
}
.nav > :not(:first-child)::before {
  content: '';
  height: 1em;
  position: absolute;
  top: 50%;
  left: 25%;
  transform: translate(-50%, -50%);
  border: 1px solid rgba(0, 0, 0, 0.1);
}
.active {
  color: #18a058;
}

.rank {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}
.rankItem:nth-child(even) {
  padding-left: 10px;
}
.rankItem:nth-child(odd) {
  padding-right: 10px;
}
.rankItem {
  padding-top: 10px;
  padding-bottom: 10px;
}
.rankItem:nth-child(-n + 2) {
  padding-top: 0;
}
.rankItem:nth-child(n + 8) {
  padding-bottom: 0;
}
.rankItem:nth-child(-n + 8) {
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}
.rankItem:nth-child(even) {
  border-left: 1px solid rgba(0, 0, 0, 0.2);
}
.rankItem {
  display: grid;
  grid-template-columns: 3em 200px 1fr;
  column-gap: 10px;
}
.index {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: rgba(0, 0, 0, 0.5);
}
.picture {
  display: block;
  width: 200px;
  height: 112px;
  border-radius: 6px;
  cursor: pointer;
}
.info {
  display: flex;
  flex-direction: column;
}
.info > :first-child {
  margin-bottom: 10px;
}
</style>
