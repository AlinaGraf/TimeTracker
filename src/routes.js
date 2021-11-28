import TimeTracker from "@/pages/TimeRecordSearch";
import TimeLogger from "@/pages/TimeRecordLogger";

const routes = [
  { path: '/', redirect: '/timetracker' },
  { path: '/search', redirect: '/timetracker' },
  { path: '/timetracker', component: TimeTracker },
  { path: '/logtime', component: TimeLogger },
  { path: '*', redirect: '/' },
]

export default routes
