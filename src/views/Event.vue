<template>
  <div class="background"
       style="-webkit-box-shadow: 5px 5px 15px rgba(0,0,0,0.4);
      height: 98vh;
      text-align: -webkit-center;
      border-radius: 15px;
      background-image: url('https://picsum.photos/800/450?grayscale&blur=2');
      background-size: cover;
">
    <!--    NAVBAR-->
    <NavbarComponent/>
    <div class="event-page-main"
         style="width: 100%;
         display: inline-flex;
         place-content: center;">

      <!--      MAIN CONTENT-->
      <div class="all-boxes"
           style="width: 130vh;
         background: white;
         margin-top: 2vh;
         -webkit-box-shadow: 5px 5px 15px rgba(0,0,0,0.4);
         border-radius: 30px; height: 84vh; text-align: center">

        <div class="p-grid nested-grid" style="padding: 1vh; height: 85vh">
          <div class="p-col-8" style="text-align: -webkit-center">
            <!--            IMAGE-->
            <div class="p-col-12">
              <div class="box box-stretched">
                <p-card class="img-card" style="width: 100%; height: 100%">
                  <template #header>
                    <img :src="`${eventInfo.eventImage}`" class="event-img" style="height: 45vh"/>
                  </template>
                  <template #footer>
                    <div class="img-title"
                         style="padding-bottom: 1vh; font-size: 3vh; text-shadow: 5px 5px 5px black;">
                      {{ eventInfo.title }}
                    </div>
                  </template>
                </p-card>
              </div>
            </div>
            <!--          ATTENDEES-->
            <div class="p-col-12" style="height: 27vh">
              <div class="box box-stretched">
                <p-card class="all-attendees-card" style="width: 100%; height: 100%">
                  <template #header>
                    <div class="user-name" style="font-size: 3vh; padding-top: 1vh">
                      Event Attendees
                    </div>
                  </template>
                  <template #content>
                    <div  class="attendees-table">
                      <p-table :value="attendees" responsiveLayout="scroll">
                        <p-column field="attendeeId" header="">
                          <template #body="slotProps">
                            <img :src="`${getAttendeeImage(slotProps.data.attendeeId)}`"
                                 style="width: 6vh; height:6vh; border-radius: 50%;-webkit-box-shadow: 4px 4px 4px rgba(0,0,0,0.4);"/>
                          </template>
                        </p-column>
                        <p-column field="firstName" header="First Name"></p-column>
                        <p-column field="lastName" header="Last Name"></p-column>
                        <p-column field="userRole" header="Role"></p-column>
                      </p-table>
                    </div>
                  </template>

                </p-card>
              </div>
            </div>
          </div>


          <div class="p-col-4">
            <div class="p-grid" style="height: 100%">
              <!--                USER INFO-->
              <div class="p-col-12">
                <div class="box box-stretched">

                  <p-card class="user-img-card" style="width: 100%; height: 100%">
                    <template #header>
                      <div class="user-name" style="font-size: 3vh; padding-top: 1vh">
                        <i class="pi pi-user icon"></i>
                        Host: {{ eventInfo.organizerFirstName }}
                        {{ eventInfo.organizerLastName }}
                      </div>
                    </template>
                    <template #content>
                      <div class="user-img">
                        <img :src="`${eventInfo.userImage}`"
                             style="-webkit-box-shadow: 4px 4px 4px rgba(0,0,0,0.4);border-radius: 5%; max-width: 38vh; max-height: 22vh"/>
                      </div>
                    </template>

                  </p-card>
                </div>
              </div>

              <!--                EVENT INFO-->
              <div class="p-col-12" style="max-height: 51vh;">
                <p-card class="info-card" style="width: 100%; height: 100%">
                  <template #header>
                    <div class="user-name" style="font-size: 3vh; padding-top: 1vh">
                      <i class="pi pi-calendar icon" style="fontSize: 2.5vh"></i>
                      {{ eventInfo.dateString }}
                    </div>
                  </template>
                  <template #content>
                    <div v-if="eventLoaded">
                      <i class="pi pi-tag icon"></i>
                      <span class="product-category">{{ getCategoriesFromId(eventInfo.categories) }}</span>
                    </div>
                    <hr>
                    <div>
                      <i class="pi pi-list icon"></i>
                      <span class="description">
                      <strong>Description:</strong> {{ eventInfo.description }}
                    </span>
                    </div>
                    <hr>
                    <div>
                      <i class="pi pi-filter icon"></i>
                      <span class="capacity">
                      <strong>Capacity:</strong> {{ eventInfo.capacity }}
                    </span>
                    </div>
                    <hr>
                    <div>
                      <i class="pi pi-user icon"></i>
                      <span class="accepted-attendees">
                      <strong>Accepted attendees:</strong> {{ eventInfo.attendeeCount }}
                    </span>
                    </div>
                    <hr>
                    <div>
                      <i class="pi pi-external-link icon"></i>
                      <span class="url">
                      <strong>URL:</strong> {{ eventInfo.url || 'N/A' }}
                    </span>
                    </div>
                    <hr>
                    <div>
                      <i class="pi pi-map-marker icon"></i>
                      <span class="venue">
                      <strong>Venue:</strong> {{ eventInfo.venue || 'N/A' }}
                    </span>
                    </div>
                    <hr>
                    <div>
                      <i class="pi pi-money-bill icon"></i>
                      <span class="fee">
                      <strong>Fee:</strong> ${{ eventInfo.fee }}
                    </span>
                    </div>
                    <hr>
                    <br>
                    <div v-if="currentStatus===null && spotsAvailable && !inPast">
                      <p-button class="p-button-raised p-button-rounded p-button-lg" @click="apply"
                                style="color: white;
                                background-image: linear-gradient(to right, #3700ff, #c800ff);
                                -webkit-box-shadow: 5px 5px 15px rgba(0,0,0,0.4);">
                        Request Attendance
                      </p-button>
                    </div>

                    <div v-else-if="currentStatus==='pending'">
                      <div class="pending">
                        Pending
                      </div>
                    </div>

                    <div v-else-if="currentStatus==='accepted'" style="display: inline-flex">
                      <div class="accepted">
                        Accepted
                      </div>
                      <div style="padding-left: 1vh">
                        <p-button class="p-button-raised p-button-rounded p-button-lg" @click="cancelApplication"
                                  style="color: white; background: #c10303; font-size: xx-large;">
                          <i class="pi pi-times" style="padding-right: 1vh"></i>
                          Cancel
                        </p-button>
                      </div>
                    </div>

                    <div v-else-if="currentStatus==='rejected'">
                      <div class="rejected">
                        Rejected
                      </div>
                    </div>

                    <div v-else>
                      <div class="unavailable">
                        Unavailable
                      </div>
                    </div>

                    <p-dialog v-model:visible="displayLoginErrorModal" :style="{width: '10vw'}" :modal="true">
                      <template #header>
                        <div style="font-size: x-large">
                          <i class="pi pi-exclamation-triangle" />
                          <strong>       Alert</strong>
                        </div>

                      </template>

                      <p class="p-m-0">
                        Please login first</p>
                      <template #footer>
                        <p-button label="OK" icon="pi pi-check" @click="closeLoginErrorModal" autofocus />
                      </template>
                    </p-dialog>

                  </template>

                </p-card>
              </div>

            </div>
          </div>

        </div>
      </div>

      <!--      SIMILAR EVENTS-->
      <div class="similar-events-wrapper"
           style="width: 30vh; background: white; margin-top: 2vh;-webkit-box-shadow: 5px 5px 15px rgba(0,0,0,0.4);
         border-radius: 30px; height: 84vh; text-align: center; margin-left: 1vh;">
        <p-card class="similar-events-card" style="width: 100%; height: 100%">
          <template #header>
            <div class="user-name" style="font-size: 3vh; padding-top: 1vh">
              Similar Events
            </div>
          </template>
          <template #content>
            <div class="sim-card" style="padding: 1vh">
              <p-carousel :autoplayInterval="5000" :indicatorsContentClass="null" :numScroll="3" :numVisible="3"
                          :value="similarEvents" class="carousel" orientation="vertical"
                          verticalViewPortHeight="60vh">

                <template #item="slotProps">
                    <div class="product-item" style="padding-top: 0; cursor: pointer;" @click="routeToEvent(slotProps.data.eventId)">
                      <div class="product-item-content" style="padding-top: 0">

                        <div style="padding-top: 0">
                          <i class="pi pi-tag" style="font-size: 1vh; padding-right:0.5vh"></i>
                          <span class="product-category"><small>{{getCategoriesFromId(slotProps.data.categories)}}</small></span>
                        </div>
                        <br>
                        <div class="p-mb-3">
                            <img :alt="slotProps.data.title" :src="`${slotProps.data.eventImage}`"
                                 class="product-image" style="height: 10vh" />
                        </div>
                        <div>
                          <h4 class="p-mb-1">{{ slotProps.data.title }}</h4>
                        </div>
                      </div>
                    </div>
                </template>
              </p-carousel>
            </div>
          </template>

        </p-card>

      </div>

    </div>


  </div>
</template>

<script>
import api from "@/api/api";
import NavbarComponent from "@/components/NavbarComponent";

export default {
  name: "Event",
  components: {NavbarComponent},

  data() {
    return {
      eventId: null,
      eventInfo: {},
      eventLoaded: false,
      allCategories: [],
      attendees: [],
      similarEvents: [],
      currentStatus: null,
      userId: null,
      isLogged: false,
      displayLoginErrorModal: false,
      inPast: false,
      spotsAvailable: false,
    }
  },

  created() {
    this.eventId = this.$route.params.eventId;
    this.isLogged = localStorage.getItem('token') !== "null";
    this.onInitialize();
    if (this.isLogged) {
      this.userId = parseInt(localStorage.getItem('id'));
      this.getStatus();
    }
  },


  methods: {

    getCategoriesFromId(ids) {
      let names = []
      for (let i = 0; i < ids.length; i++) {
        for (let j = 0; j < this.allCategories.length; j++) {
          if (this.allCategories[j].id === ids[i]) {
            names.push(this.allCategories[j].name)
          }
        }
      }
      return `Categories: ${names.join(', ')}`;
    },

    getStatus() {
      api.events.getEventAttendees(this.eventId)
      .then(res => {
        let allAttendees = res.data;
        for (let i = 0; i < allAttendees.length; i++) {
          if (allAttendees[i].attendeeId === this.userId) {
            this.currentStatus = allAttendees[i].status;
          }
        }

      }).catch(err => {
        console.log(err);
      })

    },

    onInitialize() {
      this.eventId = this.$route.params.eventId;
      this.getAllEventData();
    },

    getAllEventData() {
      api.events.getOneEvent(this.eventId)
        .then(res => {
          this.eventInfo = res.data;

          let rawDate = new Date(this.eventInfo.date);
          this.inPast = rawDate < new Date();
          this.eventInfo.dateString = this.getDateString(rawDate);

          if (this.eventInfo.attendeeCount < this.eventInfo.capacity) {

            this.spotsAvailable = true;
          }

          api.events.getAllCategories()
            .then(res => {
              this.allCategories = res.data;
            }).catch(err => {
            console.error(err);
          });
          this.getAllAttendees();
          this.getEventImage(this.eventInfo);
          this.getUserImage();
          this.getSimilarEvents();
          this.eventLoaded = true;

        }).catch(err => {
        console.error(err);
        this.$router.push({name: 'notFound'});
      });
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

    getAllAttendees() {
      api.events.getEventAttendees(this.eventId)
        .then(res => {
          let attendees = res.data

          for (let i = 0; i < attendees.length; i++) {
            if (attendees[i].status === 'accepted') {
              this.attendees.push(attendees[i])
            }
          }
          this.getAllAttendeeImages();
          this.getAllAttendeeRoles();
        })
        .catch(err => {
          console.error(err);
        });
    },

    getAllAttendeeImages() {
      for (let i = 0; i < this.attendees.length; i++) {
        let curAttendee = this.attendees[i];
        curAttendee.image = null;
        api.users.getUserImage(curAttendee.attendeeId)
          .then(res => {
            let reader = new window.FileReader();
            reader.readAsDataURL(res.data);
            reader.onload = function () {
              curAttendee.image = reader.result;
            }
          }).catch(err => {
          console.error(err);
          curAttendee.image = 'https://www.wallpaperup.com/template/dist/images/default/avatar.png?v=3.5.1';
        });
      }
    },

    getAllAttendeeRoles() {
      for (let i = 0; i < this.attendees.length; i++) {
        let curAttendee = this.attendees[i];
        curAttendee.userRole = 'Attendee';
        if (curAttendee.attendeeId === this.eventInfo.organizerId) {
          curAttendee.userRole = 'Organizer'
        }
      }
    },

    getAttendeeImage(id) {
      for (let i = 0; i < this.attendees.length; i++) {
        if (this.attendees[i].attendeeId === id) {
          return this.attendees[i].image;
        }
      }
    },


    getEventImage(event) {
      let curEventInfo = event;
      curEventInfo.eventImage = null;
      let id = (curEventInfo.eventId) ? curEventInfo.eventId : curEventInfo.id;
      api.events.getImage(id)
        .then(res => {
          if (res.data.size) {
            let reader = new window.FileReader();
            reader.readAsDataURL(res.data);
            reader.onload = function () {
              curEventInfo.eventImage = reader.result;
            }
          } else {
            curEventInfo.eventImage = 'https://tacm.com/wp-content/uploads/2018/01/no-image-available.jpeg'
          }

        })
        .catch(err => {
          console.error(err);
        });
    },

    getUserImage() {
      let curEventInfo = this.eventInfo;
      curEventInfo.userImage = null;
      api.users.getUserImage(curEventInfo.organizerId)
        .then(res => {

          let reader = new window.FileReader();
          reader.readAsDataURL(res.data);
          reader.onload = function () {
            curEventInfo.userImage = reader.result;
          }
        })
        .catch(err => {
          console.error(err);
          curEventInfo.userImage = 'https://www.wallpaperup.com/template/dist/images/default/avatar.png?v=3.5.1';
        });
    },

    getSimilarEvents() {
      api.events.getFilteredEventsOnly(this.eventInfo.categories)
        .then(res => {
          for (let j = 0; j < res.data.length; j++) {
            if (res.data[j].eventId.toString() !== this.eventId) {
              this.similarEvents.push(res.data[j]);
            }
          }
          for (let i = 0; i < this.similarEvents.length; i++) {
            this.getEventImage(this.similarEvents[i]);
          }
        }).catch(err => {
        console.error(err);
      });

    },

    apply() {
      if (!this.isLogged) {
        this.displayLoginErrorModal = true;
      } else {
        api.attendance.requestAttendance(this.eventId)
          .then(() => {
            window.location.reload();
          })
        .catch(err => {
          console.log(err);
        })
      }
    },

    cancelApplication() {
      api.attendance.deleteAttendance(this.eventId)
      .then(() => {
        window.location.reload()
      }).catch(err => {
        console.log(err);
      })
    },

    closeLoginErrorModal() {
      this.displayLoginErrorModal = false;
    },

    routeToEvent(eventId){
      this.$router.push({name: 'Event', params: {eventId: eventId}});
      setTimeout(() => {
        this.$router.go();

      }, 0)
    }

  }
}
</script>

<style scoped>
.box {
  background-color: var(--surface-e);
  text-align: center;
  padding-top: 0;
  /*padding-bottom: 1rem;*/
  border-radius: 30px;
  -webkit-box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.4);
}

.box-stretched {
  height: 100%;
}

.nested-grid .p-col-4 {
  padding-bottom: 1rem;
}

.img-card {
  border-radius: 30px;
}

.img-card >>> .p-card-header {
  padding: 1vh;
}

.img-card >>> .p-card-footer {
  background: #830caa;
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
  min-height: 5vh;
  color: white;
}

.img-card >>> .p-card-body {
  padding: 0;
  border-radius: 30px;
}

.img-card >>> .p-card-content {
  padding: 0;
}

.info-card {
  border-radius: 30px;
  -webkit-box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.4);
  font-size: small;
}

.info-card >>> .p-card-header {
  background: #830caa;
  min-height: 5vh;
  color: white;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
}
.info-card >>> .p-card-content {
  padding: 0;
}


.info-card >>> .p-card-body {
  text-align: -webkit-center;
  max-height: 89%;
  overflow: auto;
}

.user-img-card {
  border-radius: 30px;
  padding: 0;
}

.user-img-card >>> .p-card-header {
  background: #830caa;
  min-height: 5vh;
  color: white;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
}

.user-img-card >>> .p-card-content {
  padding: 0;
}

.event-img {
  border-radius: 2vh;
  -webkit-box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.4)
}

.all-attendees-card {
  border-radius: 30px;
  padding: 0;
}

.all-attendees-card >>> .p-card-header {
  background: #830caa;
  min-height: 5vh;
  color: white;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
}

.attendees-table >>> .p-datatable-wrapper {
  height: 16vh;
}

.product-item-content {
  border: 1px solid var(--surface-d);
  border-radius: 3px;
  margin: .3rem;

  text-align: center;
  padding: 2rem 0;
}

.product-image {
  width: 50%;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)
}

.similar-events-card {
  border-radius: 30px;
}

.similar-events-card >>> .p-card-header {
  background: #830caa;
  min-height: 5vh;
  color: white;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
}

.pending {
  padding: 1vh;
  width: fit-content;
  background-color: #ffd8b2;
  color: #805b36;
  border-radius: 25px;
  font-size: xx-large;
}

.accepted {
  padding: 1vh;
  width: fit-content;
  background-color: #c8e6c9;
  color: #256029;
  border-radius: 25px;
  font-size: xx-large;
}
.rejected {
  padding: 1vh;
  width: fit-content;
  background-color: #ffcdd2;
  color: #c63737;
  border-radius: 25px;
  font-size: xx-large;
}

.unavailable {
  padding: 1vh;
  width: fit-content;
  background-color: #7f7c7c;
  color: #ffffff;
  border-radius: 25px;
  font-size: xx-large;
}
</style>