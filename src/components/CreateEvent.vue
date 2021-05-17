<template>
  <div>


      <div class="signup-dialogue">
        <div class="dialog-header"
             style="background: whitesmoke; padding: 2vh; font-size: xx-large; text-align: center">
          {{ update ? 'Update Event' : 'Create Event' }}
        </div>
        <div class="dialog-body" style="padding: 2vh">

          <div style="text-align: center">
            <label style="text-align: center">Title*</label>
          </div>
          <div class="email" style="text-align: center;">
                  <span class="p-input" style="border-radius: 10px; width: 75%">
                    <p-input v-model="eventTitle" placeholder="e.g. 'My 21st'" style="border-radius: 20px; width: 100%"
                             type="text"/>
                  </span>
          </div>
          <br>

          <div style="text-align: center">
            <label style="text-align: center">Categories*</label>
          </div>
          <div class="categories" style="text-align: center;">
            <p-multiselect v-model="selectedCategories"
                           :filter="true"
                           :options="allCategories"
                           display="chip"
                           optionLabel="name" placeholder="Select Categories" style="width: 100%; text-align: left; border-radius: 20px"/>
          </div>
          <br>

          <div style="text-align: center">
            <label style="text-align: center">Description*</label>
          </div>
          <div class="email" style="text-align: center;">
                  <span class="p-input" style="border-radius: 10px; width: 75%">
                    <p-input v-model="eventDescription" placeholder="e.g. 'A night of fun stuff'" style="border-radius: 20px; width: 100%;"
                             type="text"/>
                  </span>
          </div>

          <br>

          <div style="text-align: center; display: inline-flex; width: 100%; justify-content: space-evenly">
            <div style="text-align: center">
              <label style="text-align: center">Maximum Capacity</label>
            </div>
            <div style="text-align: center">
              <label style="text-align: center">Event Type*</label>
            </div>
          </div>

          <div class="capacity-is-online" style="display: inline-flex; width: 100%; justify-content: space-evenly">


            <div class="capacity" style="text-align: center;width: 45%; display: inline-flex;">
              <p-number v-model="eventCapacity" style="width: 13vh" placeholder="Blank for no capacity"></p-number>
            </div>
            <div class="is-online" style="text-align: center; width: 45%">
              <p-dropdown v-model="selectedType" :options="eventTypes" placeholder="Select a Type" @change="onEventTypeChange($event)"/>
            </div>

          </div>


          <br>
          <br>
          <div style="text-align: center" v-if="selectedType !== 'Online'">
            <label style="text-align: center">URL</label>
          </div>
          <div style="text-align: center" v-if="selectedType === 'Online'">
            <label style="text-align: center">URL*</label>
          </div>
          <div class="isOnline" style="text-align: center;">
                  <span class="p-input" style="border-radius: 10px; width: 75%">
                    <p-input v-model="eventURL" placeholder="e.g. 'http://stackoverflow.com/'" style="border-radius: 20px; width: 100%;"
                             type="text"/>
                  </span>
          </div>

          <transition name="slide-fade">
            <div style="text-align: center" v-if="selectedType === 'In-Person'">
              <br>
              <label style="text-align: center">Venue</label>
            </div>
          </transition>
          <transition name="slide-fade">
            <div class="venue" style="text-align: center;" v-if="selectedType === 'In-Person'">
                  <span class="p-input" style="border-radius: 10px; width: 75%">
                    <p-input v-model="eventVenue" placeholder="e.g. '221b Baker Street'" style="border-radius: 20px; width: 100%;"
                             type="text"/>
                  </span>
            </div>
          </transition>

          <br>

          <div style="text-align: center" >
            <label style="text-align: center; padding-right: 1vh;">Control Attendance Status*</label>
            <p-checkbox v-model="eventControl" :binary="true" />

          </div>

          <br>

          <div style="display: inline-flex; justify-content: space-around; width: 100%">
            <div style="text-align: center">
              <label style="text-align: center">Date*</label>
            </div>
            <div style="text-align: center">
              <label style="text-align: center">Fee</label>
            </div>
          </div>
          <div style="display: inline-flex; justify-content: space-around; width: 100%">
            <div class="date" style="text-align: center;">

              <p-calender v-model="eventDate" :showTime="true" :manualInput="false" :inline="false" :minDate="mindDate" />

            </div>

            <div class="price" style="text-align: center;">
                  <span class="p-input" style="border-radius: 10px; width: 75%">
                    <p-number v-model="eventFee" mode="currency" currency="USD" locale="en-US" />
                  </span>
            </div>
          </div>

          <br>

          <br>
          <div style="text-align: center">
            <label style="text-align: center">Event Image</label>
          </div>
          <div v-if="!eventFileUploaded" class="img-upload" style="text-align: center">
            <!--                <input type="file">-->
            <p-file-upload :auto="true" :customUpload="true" :fileLimit="1" accept="image/*, .gif" chooseLabel="Browse"
                           mode="basic" name="demo[]" @uploader="myEventUploader">
            </p-file-upload>
          </div>
          <div style="text-align: center; color: green">
            <label v-if="eventFileUploaded">File: {{ eventImage.name }}</label>
          </div>

          <br>
          <div v-if="showEventError">
            <p-message severity="error"> {{eventErrorMessage}}</p-message>
          </div>
          <br>
          <div v-if="!update" style="display: flex; justify-content: space-between;">
            <p-button class="p-button-text" icon="pi pi-times" label="Cancel" @click="myCloseCreateEvent"/>
            <p-button label="Create Event" icon="pi pi-check" @click="createEvent" autofocus/>
          </div>

          <div v-if="update" style="display: flex; justify-content: space-between;">
            <p-button class="p-button-text" icon="pi pi-times" label="Cancel" @click="myCloseCreateEvent"/>
<!--            <p-button label="Create Event" icon="pi pi-check" @click="updateEvent" autofocus/>-->
          </div>
        </div>


      </div>
  </div>
</template>

<script>
import api from "@/api/api";

export default {
  name: "CreateEvent",
  props: ['closeCreateEvent', 'update', 'initData'],

  data () {
    return {
      data: {},
      // CREATE EVENT
      // displayCreateEvent: false,
      allCategories: [],
      selectedCategories: [],
      eventTitle: '',
      eventDate: null,
      eventImage: null,
      eventDescription: '',
      eventCapacity: null,
      eventIsOnline: null,
      eventURL: '',
      eventVenue: '',
      eventControl: false,
      eventFee: 0,
      eventTypes : ['Online', 'In-Person'],
      selectedType: null,
      mindDate: new Date(),
      eventFileUploaded: false,
      showEventError: false,
      eventErrorMessage: 'Error creating event'
    }
  },

  created() {
    this.mindDate.setDate(this.mindDate.getDate() + 1)
    api.events.getAllCategories()
      .then(res => {
        this.allCategories = res.data;
        if (this.update) {
          for (let i = 0; i < this.initData.categories.length; i++ ) {
            for (let j = 0; j < this.allCategories.length; j++) {
              if (this.initData.categories[i] === this.allCategories[j].id) {

                this.selectedCategories.push(this.allCategories[j]);
              }
            }
          }
        }
      }).catch(err => {
      console.error(err);
    });

    if (this.update) {
      // set init data
      this.eventTitle = this.initData.title;
      this.eventDescription = this.initData.description;
      this.eventCapacity = (this.initData.capacity === "Unlimited") ? null : this.initData.capacity;
      this.selectedType = this.initData.isOnline ? 'Online': 'In-Person';
      this.eventIsOnline = this.initData.isOnline;
      this.eventURL = this.initData.url;
      if (!this.eventIsOnline) {
        this.eventVenue = this.initData.venue;
      }
      this.eventDate = this.initData.date;
      this.eventControl = this.initData.requiresAttendanceControl;
      this.eventFee = parseFloat(this.initData.fee);
    }
  },


  methods: {
    myCloseCreateEvent() {
      this.closeCreateEvent();
    },

    myEventUploader(event) {
      this.eventImage = event.files[0];
      this.eventFileUploaded = true;
    },

    onEventTypeChange(event) {
      this.eventIsOnline = event.value === 'Online'
    },


    createEvent() {

      if (this.selectedType === null) {
        this.showEventErrorMessage('Please select an event type');
      } else if (this.selectedType === 'Online' && (this.eventURL === null || this.eventURL.length < 1)) {
        this.showEventErrorMessage('Online events must have a URL!')
      } else if (this.selectedType === 'In-Person' && (this.eventVenue === null || this.eventVenue.length < 1)) {
        this.showEventErrorMessage('In person events must have a venue!')
      } else if (this.eventTitle.length < 1) {
        this.showEventErrorMessage('You must provide a title!');
      } else if (this.eventDescription.length < 1) {
        this.showEventErrorMessage('You must provide a description!');
      } else if (this.selectedCategories.length < 1) {
        this.showEventErrorMessage('You must provide at least one category!');
      } else if (this.eventImage === null) {
        this.showEventErrorMessage('You must provide an image!');
      } else if (this.eventDate === null) {
        this.showEventErrorMessage('You must provide a date!');
      } else {
        let sqlDate = this.eventDate.toISOString().slice(0, 19).replace('T', ' ');
        let categoryIds = [];
        for (let i = 0; i < this.selectedCategories.length; i++) {
          categoryIds.push(this.selectedCategories[i].id);
        }
        let payload = {
          title: this.eventTitle,
          description: this.eventDescription,
          categoryIds: categoryIds,
          date: sqlDate,
          isOnline: this.eventIsOnline,
          url: this.eventURL,
          venue: this.eventVenue,
          requiresAttendanceControl: this.eventControl,
          fee: this.eventFee
        }
        if (this.eventCapacity) {
          payload.capacity = this.eventCapacity
        }

        api.events.postEvent(payload)
          .then((res) => {
            let eventId = res.data.eventId;
            if (this.eventImage) {
              api.events.putEventImage(eventId, this.eventImage)
                .then(() => {
                  this.closeCreateEvent();
                  this.showEventCreateSuccess();
                })
                .catch(err => {
                  console.log(err);
                })
            } else {
              this.closeCreateEvent();
              this.showEventCreateSuccess();
            }

          }).catch(err => {
          console.log(err);
        })
      }

    },

    showEventErrorMessage(message) {
      if (message) {
        this.eventErrorMessage = message;
      }
      this.showEventError = true;
    },

    showEventCreateSuccess() {
      window.location.reload();

      this.$toast.add({
        severity: 'success',
        summary: 'Success Message',
        detail: 'Event successfully created!',
        group: 'br',
        life: 3000
      });
    },
  }
}
</script>

<style scoped>

</style>