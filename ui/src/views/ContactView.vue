<template>
  <p>Fill the contact form</p>
  <p>{{ error }}</p>
  <p>{{ result }}</p>
  <div id="contactForm" v-show="result === ''">
    <input type="text" name="name" id="name" v-model="name" placeholder="Name">
    <input type="email" name="email" id="email" v-model="email" placeholder="Email">
    <input type="text" name="subject" id="subject" v-model="subject" placeholder="Subject">
    <input type="text" name="message" id="message" v-model="message" placeholder="Message">
    <input type="button" value="Submit" v-on:click="contact()">
  </div>
</template>

<script>
import axios from "axios";

export default{
  name: 'ContactView',
  data(){
    return {
      name: "",
      email: "",
      subject: "",
      message: "",
      error: "",
      result: "",
    }
  },
  methods: {
    async contact(){
      if(!this.name || !this.email || !this.subject || !this.message){
        console.error("Please fill all the fields");
        this.error("Please fill all the fields");
        return;
      }

      axios({method: "POST",
        "url": "http://localhost:5656/contact",
        data: {name: this.name, email: this.email, subject: this.subject, message: this.message},
      }).then(() => {
        this.error = "";
        this.result = "Thanks for contacting us. We will get back to you as soon as possible";
        console.log("Contacted support");
      }).catch(err => {
        console.log(err);
        this.error = err.response.data;
        this.result = "Thanks for contacting us. We will get back to you as soon as possible";
      });
    }
  }
}
</script>
