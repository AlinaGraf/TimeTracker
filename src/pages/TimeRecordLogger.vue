<template>
	<main>
		<form role="form" class="entry-form">
      <label id="employee-email-label">Email address:</label> 
      <input class="formInput" type="email" v-model.trim="data_email" placeholder="email address" aria-labelledby="employee-email-label" required="true" /> 
        
      <label id="from-label">From:</label> 
      <input class="formInput" type="datetime-local" v-model.trim="data_from_time" aria-labelledby="from-label" required="true" /> 

      <label id="to-label">To:</label> 
      <input class="formInput" type="datetime-local" v-model.trim="data_to_time" aria-labelledby="to-label" required="true" />

      <button type="submit" id="submit-button" @click="submit">Submit</button>
      <button type="reset" id="reset-button" @click="resetInputs">Reset</button>
		</form>

		<div class="submit-info">{{submitMessage}}</div>
	</main>
</template>

<script>
import * as TimeTrackerService from "@/services/TimeTrackerService";

const DEFAULT_MESSAGE = "Submit new time record.";
const SUCCESS_MESSAGE = "TimeRecord logged successfully.";
const FAIL_MESSAGE = "TimeRecord could not be logged due to an error.";
const ERROR_END_TIME_BEFORE_START_MESSAGE = "The end time cannot be before the start time.";

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
      requestBody: new FormData(),
      startTime: "",
      endTime: "",
    };
  },
  mounted() {

  },
  methods: {
    resetInputs() {
      this.data_email = "";
      this.data_from_time = "";
      this.data_to_time = "";
    },

    submit() {
      const now = new Date();

      const from = new Date();
      from.setTime(Date.parse(this.data_from_time));
      this.startTime = from.getDate() + '.' + (from.getMonth()+1) + '.' + from.getFullYear() + ' ' + from.getHours() + ':' + from.getMinutes(); 

      const to = new Date();
      to.setTime(Date.parse(this.data_to_time));
      this.endTime = to.getDate() + "." + (to.getMonth()+1) + "." + to.getFullYear() +" "+to.getHours() + ":" + to.getMinutes(); 


      if (from > to) {
        this.submitMessage = ERROR_END_TIME_BEFORE_START_MESSAGE;
      } else {
        this.createRequestBody();
        this.postTimeRecord();
      }
    },

    createRequestBody(){
      this.requestBody = new FormData();
      this.requestBody.append("email", this.data_email );
      this.requestBody.append("start", this.startTime);
      this.requestBody.append("end", this.endTime  );
    },

    postTimeRecord(){
      this.submitMessage = `Submiting for ${this.requestBody}`;
      TimeTrackerService.addTimeRecord(this.requestBody).then(res => {
        if (res) {
          this.submitMessage = SUCCESS_MESSAGE;
        } else {
          this.submitMessage = FAIL_MESSAGE;
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

.entry-form {
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 300px;
}

.entry-form .formInput {
  align-items: center;
  justify-content: center;
  margin-bottom:0.5em;
  width: 100%;
  height:2em;
}

.entry-form button {
	width: 100%;
	margin-bottom: 0.5em;
}

@media ( max-width : 600px) {
	.entry-form {
		width: 100%;
		margin-top: 1rem;
	}
}

.submit-info {
	font-weight: bold;
	font-size: 1.5rem;
	line-height: 1.8rem;
	margin: 3rem 0;
	text-align: center;
}

</style>
