<template>
  <div>
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
      <p-table :value="hostedEvents" v-model:expandedRows="expandedRows" dataKey="id" responsiveLayout="scroll" >

        <p-column field="title" header="Title" sortable></p-column>

        <p-column field="attendeeCount" header="Attending" sortable></p-column>
        <p-column field="capacity" header="Capacity" sortable></p-column>
        <template #body="slotProps">
          {{slotProps.data.capacity || 'Unlimited'}}
        </template>
        <p-column field="dateString" header="Date" sortable></p-column>
        <p-column field="fee" header="Fee ($)" sortable></p-column>
        <p-column field="attendees" header="Attendees">
          <template #body>
            <p-button icon="pi pi-user" label="Attendees" style="background: #1ecb00"/>
          </template>
        </p-column>
        <p-column field="edit" header="Edit">
          <template #body="slotProps">
<!--            TODO-->
            <p-button icon="pi pi-pencil" style="background: #8bc7ee" :disabled="inPast(slotProps.data.date)" @click="showEdit(slotProps.data.id)"/>
          </template>
        </p-column>
        <p-column field="delete" header="Delete">
          <template #body="slotProps">
            <p-button icon="pi pi-times" style="background: #cb0000" :disabled="inPast(slotProps.data.date)" @click="deleteEvent(slotProps.data.id)"/>
          </template>
        </p-column>
      </p-table>
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
export default {
  name: "MyEvents",
  components: {EventSearchResults, NavbarComponent},

  data() {
    return {
      allEvents: [],
      myEvents: [],
      hostedEvents: [],
      userId: null,
      loadingComplete: false,
      expandedRows: [],
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
              let date = '';
              let rawDate = new Date(eventData.date);
              date += rawDate.toLocaleDateString();
              let time = `${rawDate.getHours()}:${rawDate.getMinutes()}:${rawDate.getSeconds()}`
              eventData.dateString = `${date} ${time}`;
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
            } else {
              curEvent.image = 'https://tacm.com/wp-content/uploads/2018/01/no-image-available.jpeg'
            }
          })
          .catch(err => {
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

    deleteEvent(id) {
      api.events.deleteEvent(id).then(() => {
        for (let j = 0; j < this.myEvents.length; j++) {
          console.log(this.myEvents[j], id, this.myEvents[j].eventId === id);
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



  }


}
</script>

<style scoped>

</style>