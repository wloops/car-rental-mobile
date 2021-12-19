<template>
  <div class="DateTimeSection">
    <div class="startDateCell">
      <p class="startDateMD">{{ startDateM }}月{{ startDateD }}日</p>
      <p class="startDateTime timeText">{{ startWeek }} {{ startTime }}</p>
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
        共<span class="dayinTotalNum"> {{ dayToDay }} </span>天
      </van-divider>
    </div>
    <div class="endDateCell">
      <p class="endDateMD">{{ endDateM }}月{{ endDateD }}日</p>
      <p class="endDateTime timeText">{{ endWeek }} {{ endTime }}</p>
    </div>
  </div>
</template>

<script>
import { Divider } from 'vant'
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'DateTimeSection',
  components: {
    [Divider.name]: Divider,
  },
  props: {},
  data() {
    return {
      // dayToDay: 2,
      // startDateM: 1,
      // startDateD: 15,
      // startWeek: '二',
      // startTime: '12:30',
      // endDateM: 1,
      // endDateD: 17,
      // endTime: '12:30',
      // endWeek: '三',
    }
  },
  computed: {
    ...mapGetters({
      startTime: 'getStartTime',
      endTime: 'getEndTime',
      startDate: 'getStartDate',
      endDate: 'getEndDate',
      startDateM: 'getStartDateM',
      startDateD: 'getStartDateD',
      endDateM: 'getEndDateM',
      endDateD: 'getEndDateD',
      dayToDay: 'getDayToDay',
      startWeek: 'getStartWeek',
      endWeek: 'getEndWeek',
    }),
  },
  watch: {
    endDate: {
      handler(newValue, oldValue) {
        this.setEndDate(newValue)
      },
      deep: true,
      immediate: true,
    },
  },
  created() {},
  mounted() {},
  methods: {
    ...mapMutations({
      setStartTime: 'setStartTime',
      setEndTime: 'setEndTime',
      setStartDate: 'setStartDate',
      setEndDate: 'setEndDate',
    }),
  },
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
    font-size: 0.8rem;
    color: #565656;
  }
}
</style>
