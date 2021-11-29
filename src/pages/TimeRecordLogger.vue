<template>
  <main>
    <form role="form" class="entry-form" @submit.prevent="pushQuery">
      <label id="employee-email-label">Email address:</label>
      <input
        type="email"
        v-model.trim="data_email"
        placeholder="employee email address"
        aria-labelledby="employee-email-label"
        required="true"
      />
      <label id="from-label">From:</label>
      <input
        type="datetime-local"
        v-model.trim="data_from_time"
        placeholder=" "
        aria-labelledby="from-label"
        required="true"
      />
      <label id="to-label">To:</label>
      <input
        type="datetime-local"
        v-model.trim="data_to_time"
        placeholder=" "
        aria-labelledby="to-label"
        required="true"
      />
      <button type="submit" id="submit-button">Submit</button>
       <button type="reset" id="reset-button" @click="resetInputs">Reset</button>
    </form>

    <div class="submit-info">{{submitMessage}}</div>
  </main>
</template>

<script>
import * as TimeTrackerService from "@/services/TimeTrackerService";

const DEFAULT_MESSAGE = "Submit new time record.";

export default {
  today: new Date(),
  name: "Submit",
  components: {},
  data() {
    return {
      data_email: "",
      data_from_time: "",
      data_to_time: "",
      submitMessage: DEFAULT_MESSAGE,
      timeRecords: []
    };
  },
  watch: {
    $route(to) {
      this.query = to.query.q;
      this.submit();
    }
  },
  mounted() {
    this.data_from_time = new Date();
    this.data_to_time = new Date();
  },
  methods: {
    pushQuery() {
      if (this.query != this.$route.query.q) {
        this.$router.push({ query: { q: this.query } });
      }
    },
    resetInputs() {
      this.query = "";
      this.data_email = "";
      this.data_from_time = "";
      this.data_to_time = "";
    },
    submit() {
      this.timeRecords = [];

      if (this.query) {
        this.submitMessage = `submiting for ${this.query}`;
      } else {
        this.submitMessage = DEFAULT_MESSAGE;
      }

      TimeTrackerService.getTimeRecords(this.query).then(timeRecords => {
        this.timeRecords = timeRecords;
        if (this.query) {
          const s = this.timeRecords.length == 1 ? "" : "s";
          this.submitMessage = `Found ${this.timeRecords.length} timeRecord${s} for ${this.query}`;
        }
      });
    }
  }
};
</script>

<style>
input[type="submit"] {
  -webkit-appearance: none;
  -moz-appearance: none;
  background-color: white;
  border: none;
  padding-left: 0.5em;
  margin: 0;
  font-family: inherit;
  font-size: 1em;
  height: 2.5rem;
  width: 100%;
}

::placeholder {
  color: var(--primary-color);
  opacity: 0.5;
}

::-webkit-search-decoration,
::-webkit-search-cancel-button {
  -webkit-appearance: none;
}
</style>

<style scoped>
.search-form {
  display: flex;
  justify-content: center;
  width: 500px;
}

.entry-form input {
  width: 300px;
  display: grid;
  grid-gap: 50px 50px;
  justify-content: center;
  align-items: center;
  grid-template-columns: repeat(4, auto-fit);
}

.entry-form button {
  width: 100%;
  margin-right: 0.5em;
}

@media (max-width: 600px) {
  .search-form {
    width: 100%;
    margin-top: 1rem;
  }
}

.search-info {
  font-weight: bold;
  font-size: 1.5rem;
  line-height: 1.8rem;
  margin: 3rem 0;
  text-align: center;
}

.timeRecordList {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, 300px);
  grid-gap: 50px 50px;
  justify-content: center;
  align-items: center;
}
</style>