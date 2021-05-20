<template>
  <div>
    <!--      EVENT DISPLAY-->
    <p-panel>
      <div class="card">
        <p-dataview :value="events" :layout="layout" :paginator="true" :paginatorPosition="paginatorPosition" :rows="10" :sortOrder="sortOrder" :sortField="sortField">
          <template #header>
            <div class="p-grid p-nogutter">
              <div class="p-col-6" style="text-align: left">
                <p-dropdown v-model="sortKey" :options="sortOptions" optionLabel="label" placeholder="Sort By" @change="onSortChange($event)"/>
              </div>
            </div>
          </template>


          <template #grid="slotProps">
            <div class="p-col-12 p-md-4">
              <div class="product-grid-item card">
                <div class="product-grid-item-top" style="height: 8vh">
                  <div>
                    <i class="pi pi-tag icon"></i>
                    <span class="product-category">{{getCategoriesFromId(slotProps.data.categories)}}</span>
                  </div>
                </div>
                <div class="product-grid-item-content">
                  <div class="zoom">
                    <router-link :to="`/events/${slotProps.data.eventId}`">
                      <img class="img-grid" :alt="slotProps.data.title" :src="`${slotProps.data.image} `" style="max-width: 26vw; max-height: 30vh"/>
                    </router-link>
                  </div>
                  <div class="product-name">{{slotProps.data.title}} - {{slotProps.data.dateString}}</div>
                  <div class="num-attendees">Attendees: {{slotProps.data.numAcceptedAttendees}}/{{slotProps.data.capacity || 'Unlimited'}}</div>
                </div>
                <div class="product-grid-item-bottom">
                  <div class="bottom-left" style="display: inline-flex; width: 30vh;">
                    <img :src="`${slotProps.data.userImage}`" :alt="slotProps.data.organizerFirstName" style="width: 5vh; height: 5vh; border-radius: 50%; -webkit-box-shadow: 3px 3px 6px rgba(0,0,0,0.4);"/>
                    <div class="product-price" style="padding-left: 2vh">
                      <p style="font-size: 1rem;font-weight: 400;text-align: center;padding: 0;margin: 0;">Hosted by</p>
                      <p style="margin: 0; text-align: center">{{slotProps.data.organizerFirstName}} {{slotProps.data.organizerLastName}}</p>
                    </div>
                  </div>
                  <p-button class="zoom" @click="toEvent(slotProps.data.eventId)" style="color: white;
                   background-image: linear-gradient(to right, #3700ff, #c800ff);
                   -webkit-box-shadow: 2px 2px 2px rgba(0,0,0,0.4);">View Details</p-button>
                </div>
              </div>
            </div>
          </template>
        </p-dataview>
      </div>
    </p-panel>
  </div>

</template>

<script>
import api from "@/api/api";

export default {
  name: "EventSearchResults",
  props: ['events'],

  data() {
    return {
      allCategories: [],
      layout: 'grid',
      paginatorPosition: "both",
      images: [],
      sortKey: null,
      sortOrder: null,
      sortField: null,
      sortOptions: [
        {label: 'Number of attendees (Low to High)', value: 'numAcceptedAttendees'},
        {label: 'Number of attendees (High to Low)', value: '!numAcceptedAttendees'},
        {label: 'Date (Later to Earlier)', value: '!date'},
        {label: 'Date (Earlier to Later)', value: 'date'},
      ],

    }
  },

  created() {
    api.events.getAllCategories()
      .then(res => {
        this.allCategories = res.data;
      }).catch(err => {
      console.error(err);
    });
    this.getEventImages();
    this.getEventDatesAndUserImages()

  },

  watch: {
    events: function () {
      this.getEventImages();
      this.getEventDatesAndUserImages()
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

    onSortChange(event){
      const value = event.value.value;
      const sortValue = event.value;

      if (value.indexOf('!') === 0) {
        this.sortOrder = -1;
        this.sortField = value.substring(1, value.length);
        this.sortKey = sortValue;
      }
      else {
        this.sortOrder = 1;
        this.sortField = value;
        this.sortKey = sortValue;
      }
    },

    getEventImages() {
      for (let i = 0; i < this.events.length; i++) {
        let curEvent = this.events[i];
        curEvent.image = null;
        api.events.getImage(curEvent.eventId)
          .then(res => {
            console.log(res.data);
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
      for (let i = 0; i < this.events.length; i++) {
        let curEvent = this.events[i];
        curEvent.dateString = null;
        curEvent.date = null;
        curEvent.userId = null;
        curEvent.userImage = null;

        api.events.getOneEvent(curEvent.eventId)
          .then(res => {
            curEvent.userId = res.data.organizerId;

            curEvent.date = new Date(res.data.date);
            curEvent.dateString = this.getDateString(curEvent.date);

            api.users.getUserImage(curEvent.userId)
              .then(res => {
                let reader = new window.FileReader();
                reader.readAsDataURL(res.data);
                reader.onload = function () {
                  curEvent.userImage = reader.result;
                }

              })
              .catch(err => {
                console.error(err);
                curEvent.userImage = "https://www.wallpaperup.com/template/dist/images/default/avatar.png?v=3.5.1";
              })
          })
          .catch(err => {
            console.error(err);
          });
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



    toEvent(id) {
      this.$router.push({ name: 'Event', params: {eventId: id} });
    }
  }
}
</script>

<style scoped>
@import '../../public/styles/home.css';
</style>