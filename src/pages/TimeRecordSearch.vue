<template>
  <main>
    <form role="search" class="search-form" @submit.prevent="pushQuery">
      <label id="employee-email-label">Email address:</label>
      <input
        type="email"
        v-model.trim="emailQuery"
        placeholder="employee email address"
        aria-labelledby="employee-email-label"
      />
      <label id="offset-label">Offset:</label>
      <input
        type="number"
        v-model.trim="offsetQuery"
        placeholder="skip first # entries"
        aria-labelledby="offset-label"
        min="1"
      />
      <label id="length-label">Number of records:</label>
      <input
        type="number"
        v-model.trim="lengthQuery"
        placeholder="limit number of entries in result"
        aria-labelledby="length-label"
        min="1"
      />
      <button type="submit" id="search-button">Search</button>
      <button type="reset" id="reset-button" @click="resetQuery">Reset</button>
    </form>

    <div class="search-info">{{searchMessage}}</div>

    <ul id="timeRecordList" class="timeRecordList">
      <li v-for="timeRecord in timeRecords" :key="timeRecord.start">{{ timeRecord.email }}</li>
    </ul>
  </main>
</template>

<script>
import * as TimeTrackerService from "@/services/TimeTrackerService";

const DEFAULT_MESSAGE = "Search for time records.";

export default {
  name: "Search",
  components: {},
  data() {
    return {
      emailQuery: "",
      offsetQuery: "",
      lengthQuery: "",
      searchMessage: DEFAULT_MESSAGE,
      timeRecords: []
    };
  },
  watch: {
    $route(to) {
      this.query = to.query.q;
      this.search();
    }
  },
  mounted() {
    this.query = this.$route.query.q;
  },
  methods: {
    pushQuery() {
      this.query = "";

      if (this.emailQuery) {
        this.query = this.query + "email=" + this.emailQuery;
      }
      if (this.offsetQuery) {
        this.query =
          (this.emailQuery ? this.query + "&" : this.query) +
          "offset=" +
          this.offsetQuery;
      }
      if (this.lengthQuery) {
        this.query =
          (this.emailQuery || this.offsetQuery
            ? this.query + "&"
            : this.query) +
          "length=" +
          this.lengthQuery;
      }

      console.log(this.query);

      if (this.query != this.$route.query.q) {
        this.$router.push({ query: { q: this.query } });
      }
    },
    resetQuery() {
      this.query = "";
      this.emailQuery = "";
      this.offsetQuery = "";
      this.lengthQuery = "";
      this.$router.push({ query: { q: this.query } });
    },
    search() {
      this.timeRecords = [];

      if (this.query) {
        this.searchMessage = `Searching for ${this.query}`;
      } else {
        this.searchMessage = DEFAULT_MESSAGE;
      }

      TimeTrackerService.getTimeRecords(this.query).then(timeRecords => {
        this.timeRecords = timeRecords;
        if (this.query) {
          const s = this.timeRecords.length == 1 ? "" : "s";
          this.searchMessage = `Found ${this.timeRecords.length} timeRecord${s} for ${this.query}`;
        }
      });
    }
  }
};
</script>

<style>


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

.search-form input {
  width: 300px;
  display: grid;
  grid-gap: 50px 50px;
  justify-content: center;
  align-items: center;
  grid-template-columns: 60px 240px;
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