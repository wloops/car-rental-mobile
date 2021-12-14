<template>
  <div class="DateTimeSection">
    <div class="startDateCell">
      <p class="startDateMD">{{ startDateM }}月{{ startDateD }}日</p>
      <p class="startDateTime timeText">周{{ startWeek }} {{ startTime }}</p>
    </div>
    <div class="dayinTotal">
      <van-divider
        :style="{
          color: '#565656',
          borderColor: '#a3a3a3',
          fontSize: 'small',
          padding: '0 16px',
        }"
      >
        共<span class="dayinTotalNum">{{ dayinTotalNum }}</span
        >天
      </van-divider>
    </div>
    <div class="endDateCell">
      <p class="endDateMD">{{ endDateM }}月{{ endDateD }}日</p>
      <p class="endDateTime timeText">周{{ endWeek }} {{ endTime }}</p>
    </div>
  </div>
</template>

<script>
import { Divider } from 'vant'

export default {
  name: 'DateTimeSection',
  components: {
    [Divider.name]: Divider,
  },
  props: {},
  data() {
    return {
      dayinTotalNum: 1,
      startDateM: 1,
      startDateD: 15,
      startWeek: '二',
      startTime: '12:30',
      endDateM: 1,
      endDateD: 17,
      endTime: '12:30',
      endWeek: '三',
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {},
}
</script>

<style scoped lang="less">
.DateTimeSection {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  font-weight: 500;
  padding: 0.625rem;
  .dayinTotal {
    flex: 1;
    font-size: 0.5rem;
  }

  .timeText {
    font-size: 0.15rem;
    color: #565656;
  }
}
</style>
