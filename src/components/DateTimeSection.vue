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
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'DateTimeSection',
  components: {},
  props: {},
  data() {
    return {}
  },
  computed: {
    // ...mapGetters({
    //   startTime: 'getStartTime',
    //   endTime: 'getEndTime',
    //   startDate: 'getStartDate',
    //   endDate: 'getEndDate',
    //   startDateM: 'getStartDateM',
    //   startDateD: 'getStartDateD',
    //   endDateM: 'getEndDateM',
    //   endDateD: 'getEndDateD',
    //   dayToDay: 'getDayToDay',
    //   startWeek: 'getStartWeek',
    //   endWeek: 'getEndWeek',
    // }),
    ...mapGetters('time', {
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
    ...mapMutations('time', {
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
    // font-size: 0.5rem;
  }

  .timeText {
    font-size: 0.8rem;
    color: #565656;
  }
}
</style>
