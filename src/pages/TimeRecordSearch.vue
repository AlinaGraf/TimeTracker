<template>
  <main>
    <form role="search" class="search-form" @submit.prevent="pushQuery">
      <label id="employee-email-label">Email address:</label>
      <input
        type="email"
        v-model.trim="query1"
        placeholder="employee email address"
        aria-labelledby="employee-email-label"
      />
       <label id="offset-label">Offset:</label>
      <input
        type="number"
        v-model.trim="query2"
        placeholder="skip first # entries"
        aria-labelledby="offset-label"
      />
       <label id="length-label">Number of records:</label>
      <input
        type="number"
        v-model.trim="query3"
        placeholder="limit number of entries in result"
        aria-labelledby="length-label"
      />
      <button type="submit" id="search-button">Search</button>
    </form>
  
  <div class="search-info">{{searchMessage}}</div>


    <ul id="timeRecordList" class="timeRecordList">
       <li v-for="timeRecord in timeRecords" :key="timeRecord.start"> 
        {{ timeRecord.email }}
     </li>
    </ul>

  </main>



</template>

<script>
import * as TimeTrackerService from "@/services/TimeTrackerService";

const DEFAULT_MESSAGE = "Search for or log employee time records.";

export default {
  name: "Search",
  components: {
    
  },
  data() {
    return {
      query1: "",
      query2: "",
      query3: "",
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
      if (this.query != this.$route.query.q) {
        this.$router.push({ query: { q: this.query } });
      }
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
input[type="search"] {
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

.search-form input {
  width: 100%;
  display: grid;
  grid-gap: 50px 50px;
  justify-content: center;
  align-items: center;
  grid-template-columns: repeat(1, 300px);
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