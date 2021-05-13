<template>
  <div style="-webkit-box-shadow: 5px 5px 15px rgba(0,0,0,0.4)">
<!--    NAVBAR-->
    <NavbarComponent/>

<!--    CAROUSEL-->
    <p-galleria :value="images"
                :responsiveOptions="responsiveOptions"
                :showItemNavigators="false" :showThumbnails="false"
                :autoPlay="true"
                :transitionInterval="5000"
                :circular="true" >
        <template #item="slotProps">
          <img :src="slotProps.item.itemImageSrc" :alt="slotProps.item.alt" style="opacity: 60%; width: 100%; -webkit-box-shadow: 5px 5px 5px rgba(0,0,0,0.4);" />
        </template>

    </p-galleria>


    <!--    OVERLAY-->
    <div class="overlay">

      <img class="logo-overlay" src="../assets/nil_events_logo_vertical.png" alt="Logo">

      <div class="home-searching" style="align-self: center; margin-left: 8vh; width: 70vh; text-align: center; height: 100%; margin-top: 55vh">
        <span class="p-input-icon-left">
          <i class="pi pi-search" />
          <p-input type="text" :disabled=showAdvancedSearch v-model="query" class="p-inputtext-lg" v-on:keyup.enter="searchQueryOnly" placeholder="Search events..." style="border-radius: 33px; width: 70vh"/>
        </span>

        <p-button class="p-button-raised p-button-rounded p-button-lg" @click="searchQueryOnly"
                  style="color: white; margin-right: 3vh;
                  background-image: linear-gradient(to right, #3700ff, #c800ff);
                  -webkit-box-shadow: 5px 5px 15px rgba(0,0,0,0.4);">
          Search
        </p-button>

        <p-button class="p-button-raised p-button-rounded p-button-lg" @click="showAdvancedSearchMethod"
                  style="color: grey;
                  background-color: white;
                  -webkit-box-shadow: 5px 5px 15px rgba(0,0,0,0.4);
                  margin-top: 1vh;">
          Advanced Search
        </p-button>
      </div>
    </div>

<!--    ADVANCED SEARCH-->
    <transition name="fade">
    <div class="advanced-search" style="width: 100%;" v-if="showAdvancedSearch">
      <div class="adv-search-title" style="
      -webkit-box-shadow: 5px 5px 15px rgba(0,0,0,0.4);
      text-align: center;
      font-size: xxx-large;
      font-family: Roboto, Helvetica Neue Light, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;
      background-image: linear-gradient(to right, #3700ff, #c800ff); color: whitesmoke; border-radius: 50px; margin-top: 1vh">
        <strong>Advanced Search</strong>
      </div>

      <div class="advanced-search-header" style="text-align: -webkit-center">
        <div class="p-grid" style="margin-top: 0.5vh; width: 60%">

          <div class="p-col" style="text-align: right">
            <p-multiselect style="width: 13rem; -webkit-box-shadow: 2px 2px 2px rgba(0,0,0,0.4); text-align: left; border-radius: 30px"
                           v-model="selectedCategories"
                           :filter="true"
                           :options="allCategories"
                           optionLabel="name" placeholder="Select Categories" display="chip"/>
          </div>

          <div class="p-col">
            <span class="p-input-icon-left">
              <i class="pi pi-search" />
              <p-input type="text" v-model="query" v-on:keyup.enter="search" placeholder="Search events..." style="border-radius: 33px; width: 50vh;-webkit-box-shadow: 2px 2px 2px rgba(0,0,0,0.4);"/>
            </span>
          </div>

          <div class="p-col" style="text-align: left">
            <p-button class="p-button-raised p-button-rounded p-button-lg" @click="search"
                      style="color: white; margin-right: 3vh;
                  background-image: linear-gradient(to right, #3700ff, #c800ff);
                  -webkit-box-shadow: 2px 2px 2px rgba(0,0,0,0.4);">
              Search
            </p-button>
          </div>
        </div>
      </div>

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
                  <div class="product-grid-item-top">
                    <div>
                      <i class="pi pi-tag icon"></i>
                      <span class="product-category">{{this.getCategoriesFromId(slotProps.data.categories)}}</span>
                    </div>
                  </div>
                  <div class="product-grid-item-content">
                    <img class="img-grid" :alt="slotProps.data.title" :src="`${slotProps.data.image || 'https://thewifiexperts.co.nz/wp-content/uploads/2018/06/new_statesman_events.jpg'} `" style="max-width: 50vh; min-width: 50vh; min-height: 30vh; max-height: 30vh"/>
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
                    <p-button @click="toEvent(slotProps.data.eventId)" style="color: white; background-image: linear-gradient(to right, #3700ff, #c800ff);-webkit-box-shadow: 2px 2px 2px rgba(0,0,0,0.4);">View Details</p-button>
                  </div>
                </div>
              </div>
            </template>
          </p-dataview>
        </div>
      </p-panel>
    </div>
    </transition>

  </div>
</template>

<script>
import NavbarComponent from "@/components/NavbarComponent";
import api from "@/api/api";

export default {
  name: "Home",
  components: {NavbarComponent},
  data() {
    return {
      query: '',
      showAdvancedSearch: false,
      events: [],
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
      allCategories: [],
      selectedCategories: [],
      selectedCategoryIds: [],
      responsiveOptions: [
        {
          breakpoint: '1024px',
          numVisible: 5
        },
        {
          breakpoint: '768px',
          numVisible: 3
        },
        {
          breakpoint: '560px',
          numVisible: 1
        }
      ]
    }
  },

  created() {
    this.getImages();
    api.events.getAllCategories()
        .then(res => {
          this.allCategories = res.data;
        }).catch(err => {
      console.error(err);
    });

  },

  methods: {
    getImages() {
      for (let i = 0; i < 20; i++) {
        this.images.push({
          "itemImageSrc": `https://picsum.photos/id/${i + 50}/1230/500?grayscale`,
          "thumbnailImageSrc": "",
          "alt": `Image ${i + 50}`,
          "title": `Image ${i + 50}`
        })
      }
    },



    searchQueryOnly() {
      this.showAdvancedSearch = true;
      this.scrollTo();
      api.events.getEventsQueryOnly(this.query)
          .then(res => {
            for (let i = 0; i < res.data.length; i++) {
              if (res.data[i].title.includes(this.query)) {
                this.events.push(res.data[i]);
              }
            }

            this.getEventImages();
            this.getEventDatesAndUserImages();
          }).catch(err => {
        console.error(err);
      })
    },

    search() {
      this.selectedCategoryIds = [];
      for (let i = 0; i < this.selectedCategories.length; i++) {
        this.selectedCategoryIds.push(this.selectedCategories[i].id);
      }
      if (this.query.length > 0) {
        api.events.getQueryAndFilteredEvents(this.query, this.selectedCategoryIds)
            .then(res => {
              this.events = res.data;
              this.getEventImages();
              this.getEventDatesAndUserImages();
            }).catch(err => {
          console.error(err);
        })
      } else {
        api.events.getFilteredEventsOnly(this.selectedCategoryIds)
            .then(res => {
              this.events = res.data;
              this.getEventImages()
              this.getEventDatesAndUserImages();
            }).catch(err => {
          console.error(err);
        })
      }
    },

    getEventImages() {
      for (let i = 0; i < this.events.length; i++) {
        let curEvent = this.events[i];
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
      for (let i = 0; i < this.events.length; i++) {
        let curEvent = this.events[i];
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
    showAdvancedSearchMethod() {
      this.showAdvancedSearch = !this.showAdvancedSearch;
      if (this.showAdvancedSearch) {
        this.scrollTo();
      }
    },

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

    scrollTo() {
      setTimeout(function () {
        window.scrollTo({
          top: 1100,
          left: 0,
          behavior: 'smooth'
        });
      }, 50);

    },

    toEvent(id) {
      this.$router.push({ name: 'Event', params: {eventId: id} });
    }
  }

}
</script>

<style>
@import '../../public/styles/home.css';



</style>