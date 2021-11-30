<template>
  <main>
    <form role="search" class="search-form" @submit.prevent="pushQuery">
      <label id="employee-email-label">Email address:</label>
      <input class="formInput" type="email" v-model.trim="emailQuery" placeholder="employee email address" aria-labelledby="employee-email-label"/>
      
      <label id="offset-label">Offset:</label>
      <input class="formInput" type="number" v-model.trim="offsetQuery" placeholder="skip first # entries" aria-labelledby="offset-label" min="0"/>

      <label id="length-label">Number of records:</label>
      <input class="formInput" type="number" v-model.trim="lengthQuery" placeholder="limit number of entries in result" aria-labelledby="length-label" min="1"/>
      
      <button type="submit" id="search-button">Search</button>
      <button type="reset" id="reset-button" @click="resetQuery">Reset</button>
    </form>

    <div class="search-info">{{searchMessage}}</div>

    <section class="gallery" v-if="showResults">
      <div>
        <span>email</span> | <span>start</span> | <span>end</span>
      </div>
      <time-record
          v-for="timeRecord in timeRecords"
          :key="timeRecord.start"
        />
    </section>

  </main>
</template>

<script>
import * as TimeTrackerService from "@/services/TimeTrackerService";
import TimeRecord from "@/components/TimeRecord";

const DEFAULT_MESSAGE = "Search for time records.";

export default {
  name: "Search",
  components: {
    TimeRecord
  },
  data() {
    return {
      emailQuery: "",
      offsetQuery: "",
      lengthQuery: "",
      searchMessage: DEFAULT_MESSAGE,
      timeRecords: [],
      showResults: false,
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
    this.search();
  },
  methods: {
    pushQuery() {
      this.query = "";

      this.addEmailToQuery();
      this.addOffsetToQuery();
      this.addLengthToQuery();

      if (this.query != this.$route.query.q) {
        this.$router.push({ query: { q: this.query } });
      }
    },

    addEmailToQuery(){
      if (this.emailQuery) {
        this.query = this.query + "email=" + this.emailQuery;
      }
    },

    addOffsetToQuery(){
      if (this.offsetQuery) {
        this.query =
          (this.emailQuery ? this.query + "&" : this.query) +
          "offset=" +
          this.offsetQuery;
      }
    },

    addLengthToQuery(){
      if (this.lengthQuery) {
        this.query =
          (this.emailQuery || this.offsetQuery
            ? this.query + "&"
            : this.query) +
          "length=" +
          this.lengthQuery;
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
      this.setStatusMessage();     
      // console.log(this.query);

      TimeTrackerService.getTimeRecords(this.query).then(timeRecords => {
        this.timeRecords = timeRecords;
        // console.log(this.timeRecords);
          if (this.query) { 
            this.displayResults();
             this.showResults=true;
        }
      } );
    },

    displayResults(){
      const s = this.timeRecords.length == 1 ? "" : "s";
        this.searchMessage = `Found ${this.timeRecords.length} timeRecord${s} for ${this.query}`;
        if (this.timeRecords.length > 0) {
            this.showResults=true;
        }
    },

    setStatusMessage(){
        if (this.query) {
        this.searchMessage = `Searching for ${this.query}`;
      } else {
        this.searchMessage = DEFAULT_MESSAGE;
      }
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
  flex-direction: column;
  width: 300px;
}

.search-form .formInput {
  align-items: center;
  justify-content: center;
  margin-bottom:0.5em;
  width: 100%;
  height:2em;
}

.search-form button {
	width: 100%;
	margin-bottom: 0.5em;
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