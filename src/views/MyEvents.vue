<template>
  <div v-if="ready">
    <NavbarComponent/>
    <div class="hosted-events-title" style="
      -webkit-box-shadow: 5px 5px 15px rgba(0,0,0,0.4);
      text-align: center;
      font-size: xxx-large;
      font-family: Roboto, Helvetica Neue Light, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;
      background-image: linear-gradient(to right, #3700ff, #c800ff); color: whitesmoke; border-radius: 50px; margin-top: 1vh">
      <strong>Hosted Events</strong>
    </div>
    <br>
    <div>
      <p-table :value="hostedEvents" dataKey="id" responsiveLayout="scroll" removableSort style="padding: 1vh;">

        <p-column field="title" header="Title" sortable>
          <template #body="slotProps">
            <router-link :to="`/events/${slotProps.data.id}`">
              {{slotProps.data.title}}
            </router-link>
          </template>
        </p-column>

        <p-column field="attendeeCount" header="Attending" sortable></p-column>
        <p-column field="capacity" header="Capacity" sortable></p-column>
        <template #body="slotProps">
          {{slotProps.data.capacity || 'Unlimited'}}
        </template>

        <p-column field="dateString" header="Date" sortable></p-column>

        <p-column field="fee" header="Fee ($)" sortable></p-column>

<!--        ATTENDEE POPUP-->
        <p-column field="attendees" header="Attendees">
          <template #body="slotProps">
            <p-button icon="pi pi-user" label="Attendees" style="background: rgb(162 0 255)" @click="displayAttendeeDialogMethod(slotProps.data)"/>

          </template>
        </p-column>
        <p-dialog v-model:visible="displayAttendeeDialog" :closable="false" :modal="true" :showHeader="false"
                  :style="{width: '40vw'}"
                  contentStyle="padding:0; border-radius: 15px" style="border-radius: 15px">

          <div class="attendee-dialog" style="max-height: 80vh">
            <div class="dialog-header"
                 style="background: whitesmoke; padding: 2vh; font-size: xx-large; text-align: center">
              Event Attendees
            </div>

            <p-table :value="currAttendees" removableSort responsiveLayout="scroll" sortField="dateOfInterest" :sortOrder="1" style="padding: 1vh">

              <p-column field="firstName" header="First name" sortable></p-column>
              <p-column field="lastName" header="Last name" sortable></p-column>
              <p-column field="dateOfInterest" header="Date of Interest" sortable>
                <template #body="{data}">
                  {{getDateString(data.dateOfInterest)}}
                </template>
              </p-column>

              <p-column field="status" header="Status" sortable>
                <template #body="{data}">
                  <span :class="'customer-badge status-' + getStatus(data.status)"><strong>{{data.status}}</strong></span>
                </template>
              </p-column>

              <p-column field="changeStatus" header="Change Status">
                <template #body="{data}">
                  <p-dropdown :options="attendanceOptions" @change="onAttendanceChange(currEvent, currEventId, data, $event)" placeholder="Select status"/>

                </template>
              </p-column>

            </p-table>
            <transition-group name="p-message" tag="div">
              <p-message v-for="msg of messages" :severity="msg.severity" :key="msg.id">Capacity has been reached!</p-message>
            </transition-group>

            <div style="display: flex; justify-content:center; padding: 1vh;">
              <p-button style="border-radius: 10px" autofocus class="p-button-text" icon="pi pi-arrow-left" label="Exit" @click="closeAttendeesDialog"/>
            </div>

          </div>


        </p-dialog>

        <p-column field="edit" header="Edit">
          <template #body="slotProps">
            <p-button icon="pi pi-pencil" style="background: rgb(182 0 255)" :disabled="inPast(slotProps.data.date)" @click="showEdit(slotProps.data)"/>

          </template>
        </p-column>

        <p-column field="delete" header="Delete">
          <template #body="slotProps">
            <p-button icon="pi pi-times" style="background: #a70101" :disabled="inPast(slotProps.data.date)" @click="deleteEvent($event, slotProps.data.id)"/>
          </template>
        </p-column>
        <p-confirm></p-confirm>

      </p-table>
<!--      EDIT MODAL-->
      <p-dialog v-model:visible="displayUpdateEvent" :closable="true" :modal="true" :showHeader="false"
                :style="{width: '30vw', maxHeight:'99%'}"
                contentStyle="padding:0; border-radius: 15px" style="border-radius: 15px">
        <CreateEvent :close-create-event="closeUpdateEvent" :update="true" :init-data="updateEventInitData"></CreateEvent>
      </p-dialog>
    </div>

    <br>
    <div class="my-events-title" style="
      -webkit-box-shadow: 5px 5px 15px rgba(0,0,0,0.4);
      text-align: center;
      font-size: xxx-large;
      font-family: Roboto, Helvetica Neue Light, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;
      background-image: linear-gradient(to right, #3700ff, #c800ff); color: whitesmoke; border-radius: 50px; margin-top: 1vh">
      <strong>My Events</strong>
    </div>
    <br>
    <EventSearchResults :events="myEvents" ref="childComponent"></EventSearchResults>
  </div>
</template>

<script>
import NavbarComponent from "@/components/NavbarComponent";
import api from "@/api/api";
import EventSearchResults from "@/components/EventSearchResults";
import CreateEvent from "@/components/CreateEvent";
export default {
  name: "MyEvents",
  components: {CreateEvent, EventSearchResults, NavbarComponent},

  data() {
    return {
      allEvents: [],
      myEvents: [],
      hostedEvents: [],
      userId: null,
      loadingComplete: false,
      displayAttendeeDialog: false,
      attendanceOptions: ['Accepted', 'Rejected', 'Pending'],
      displayUpdateEvent: false,
      updateEventInitData: null,
      ready: false,
      currAttendees: [],
      currEventId: null,
      currEvent: null,
      messages: [],
    }
  },

  created() {
    this.userId = parseInt(localStorage.getItem('id'));
    this.getAllEvents();
  },


  methods: {
    getAllEvents() {
      api.events.getEventsQueryOnly('')
        .then(res => {
          this.allEvents = res.data;

          for (let i = 0; i < this.allEvents.length; i++) {

            let curEvent = this.allEvents[i];
            let curEventId = curEvent.eventId
            api.events.getOneEvent(curEventId)
            .then(res => {
              let eventData = res.data;
              if (eventData.capacity === null) { eventData.capacity = 'Unlimited'}
              if (eventData.attendeeCount === null) { eventData.attendeeCount = 0}

              eventData.dateString = this.getDateString(eventData.date);
              if (eventData.organizerId === this.userId) {
                api.events.getEventAttendees(curEventId)
                .then(res => {
                  eventData.attendees = res.data;
                  this.hostedEvents.push(eventData);

                }).catch(err => console.log(err))

                this.myEvents.push(curEvent);
                this.getEventImages();
                this.getEventDatesAndUserImages()
              } else {
                api.events.getEventAttendees(curEventId)
                .then(res => {
                  for (let j = 0; j < res.data.length; j++) {
                    if (res.data[j].attendeeId === this.userId) {
                      this.myEvents.push(curEvent);
                      this.getEventImages();
                      this.getEventDatesAndUserImages()
                    }
                  }
                }).catch(err => console.log(err))
              }
            }).catch(err => console.log(err))

          }
          this.ready = true;

        }).catch(err => {
        console.log(err);
      })
    },

    getEventImages() {
      for (let i = 0; i < this.myEvents.length; i++) {

        let curEvent = this.myEvents[i];

        curEvent.image = null;
        api.events.getImage(curEvent.eventId)
          .then(res => {
            if (res.data.size) {

              let reader = new window.FileReader();
              reader.readAsDataURL(res.data);
              reader.onload = function () {
                curEvent.image = reader.result;
              }
            }
          })
          .catch(err => {
            curEvent.image = 'https://tacm.com/wp-content/uploads/2018/01/no-image-available.jpeg'
            console.log(err);
          });
      }
    },

    getEventDatesAndUserImages() {
      for (let i = 0; i < this.myEvents.length; i++) {
        let curEvent = this.myEvents[i];
        curEvent.dateString = null;
        curEvent.date = null;
        curEvent.userId = null;
        curEvent.userImage = null;

        api.events.getOneEvent(curEvent.eventId)
          .then(res => {
            curEvent.userId = res.data.organizerId;
            let date = '';
            let rawDate = new Date(res.data.date);
            curEvent.date = rawDate;
            date += rawDate.toLocaleDateString();
            let time = `${rawDate.getHours()}:${rawDate.getMinutes()}:${rawDate.getSeconds()}`
            curEvent.dateString = `${date} ${time}`;

            api.users.getUserImage(curEvent.userId)
              .then(res => {
                let reader = new window.FileReader();
                reader.readAsDataURL(res.data);
                reader.onload = function () {
                  curEvent.userImage = reader.result;
                }

              })
              .catch(() => {
                curEvent.userImage = "https://www.wallpaperup.com/template/dist/images/default/avatar.png?v=3.5.1";
              })
          })
          .catch(err => {
            console.error(err);
          });
      }

    },

    inPast(date) {
      let rawDate = new Date(date);
      return rawDate < new Date();
    },

    deleteEvent(event, id) {
      this.$confirm.require({
        target: event.currentTarget,
        message: 'Are you sure you want to proceed?',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          api.events.deleteEvent(id).then(() => {
            for (let j = 0; j < this.myEvents.length; j++) {
              if (this.myEvents[j].eventId === id) {
                delete this.myEvents[j];
              }
            }

            for (let i = 0; i < this.hostedEvents.length; i++) {
              if (this.hostedEvents[i].id === id) {
                delete this.hostedEvents[i];
              }
            }
            window.location.reload();

          })
            .catch(err => {
              console.log(err);
            })
        },
        reject: () => {
          //callback to execute when user rejects the action
        }
      });

    },

    displayAttendeeDialogMethod(data) {
      this.currEvent = data;
      this.currEventId = data.id;
      this.currAttendees = data.attendees;
      this.displayAttendeeDialog = true;
    },

    getStatus(status) {
      switch (status) {
        case 'accepted':
          return 'qualified';
        case 'pending':
          return 'proposal';
        case 'rejected':
          return 'unqualified';
      }
    },

    onAttendanceChange(currEvent, currEventId, attendeeInfo, event) {

      let eventId = currEventId
      let attendeeId = attendeeInfo.attendeeId;
      let newStatus = event.value.toLowerCase();

      if (currEvent.attendeeCount < currEvent.capacity || newStatus === 'pending' || newStatus === 'rejected') {
        api.attendance.updateAttendance(eventId, attendeeId, newStatus)
            .then(() => {
              for (let i = 0; i < this.hostedEvents.length; i++ ) {
                for (let j = 0; j < this.hostedEvents[i].attendees.length; j++) {

                  if (currEventId === this.hostedEvents[i].id
                    && this.hostedEvents[i].attendees[j].attendeeId === attendeeId
                    && this.hostedEvents[i].attendees[j].status !== event.value.toLowerCase()) {
                    let oldStatus = this.hostedEvents[i].attendees[j].status;
                    this.hostedEvents[i].attendees[j].status = event.value.toLowerCase();
                    if (newStatus === 'accepted') {
                      this.currEvent.attendeeCount += 1
                    } else if (oldStatus === 'accepted' && newStatus === 'rejected') {
                      this.currEvent.attendeeCount -= 1
                    } else if (oldStatus === 'accepted' && newStatus === 'pending') {
                      this.currEvent.attendeeCount -= 1
                    }
                    this.messages = [];
                  }
                }
              }
            }).catch(err => {
          console.log(err);
        })

      } else {
        this.messages = [
          {severity: 'warn', content: `Capacity (${this.currEvent.capacity}) has been reached!`, id: 1},
        ]
      }


    },

    getDateString(date) {
      String.prototype.paddingLeft = function (paddingValue) {
        return String(paddingValue + this).slice(-paddingValue.length);
      };

      String.prototype.format = function () {
        let args = arguments;
        return this.replace(/{(\d+)}/g, function (match, number) {
          return typeof args[number] != 'undefined' ? args[number] : match;
        });
      };

      let newDate = '';
      let rawDate = new Date(date);
      newDate += rawDate.toLocaleDateString();
      let hours = rawDate.getHours().toString().paddingLeft("00");
      let minutes = rawDate.getMinutes().toString().paddingLeft("00");
      let time = "{0}:{1}".format(hours, minutes)
      newDate = `${newDate} ${time}`;
      return newDate;
    },

    closeAttendeesDialog() {
      this.displayAttendeeDialog = false;
    },

    showEdit(initData) {
      this.updateEventInitData = {...initData};
      this.displayUpdateEvent = true;
    },

    closeUpdateEvent() {
      this.displayUpdateEvent = false;
    }


  }


}
</script>

<style scoped>
.customer-badge {
  border-radius: 2px;
  padding: .25em .5rem;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 12px;
  letter-spacing: .3px;
}
.customer-badge.status-qualified {
  background-color: #c8e6c9;
  color: #256029;
}
.customer-badge.status-unqualified {
  background-color: #ffcdd2;
  color: #c63737;
}

.customer-badge.status-proposal {
  background-color: #ffd8b2;
  color: #805b36;
}
</style>