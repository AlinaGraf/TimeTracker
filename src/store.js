import Vuex from "vuex";
import * as TimeTrackerService from "@/services/TimeTrackerService";

export default function buildStore() {
  return new Vuex.Store({
    state: {
      records: []
    },
    actions: {
      async loadRecords(context) {
        const records = await TimeTrackerService.getTimeRecords()
        context.commit('setRecords', records)
      },
      async addRecord(context, record) {
        const ok = await TimeTrackerService.addTimeRecord(record)
        await context.dispatch('loadRecords')
        return ok
      },
    }
  })
}
