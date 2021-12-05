<template>
  <div>
    <span>{{timeRecord.email}}</span> |
    <span>{{timeRecord.start}}</span> |
    <span>{{timeRecord.end}}</span>
  </div>
</template>

<script>
export default {
  name: "TimeRecordItem",
  props: {
    timeRecord: {
      email: String,
      start: Date,
      end: Date
    }
  }
};
</script>

<style scoped>
</style>