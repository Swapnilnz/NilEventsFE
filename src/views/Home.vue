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

        <p-button class="p-button-raised p-button-rounded p-button-lg zoom" @click="searchQueryOnly"
                  style="color: white; margin-right: 3vh;
                  background-image: linear-gradient(to right, #3700ff, #c800ff);
                  -webkit-box-shadow: 5px 5px 15px rgba(0,0,0,0.4);">
          Search
        </p-button>

        <p-button class="p-button-raised p-button-rounded p-button-lg zoom" @click="showAdvancedSearchMethod"
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
            <p-multiselect style="width: 22vh; -webkit-box-shadow: 2px 2px 2px rgba(0,0,0,0.4); text-align: left; border-radius: 30px"
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
            <p-button class="p-button-raised p-button-rounded p-button-lg zoom" @click="search"
                      style="color: white; margin-right: 3vh;
                  background-image: linear-gradient(to right, #3700ff, #c800ff);
                  -webkit-box-shadow: 2px 2px 2px rgba(0,0,0,0.4);">
              Search
            </p-button>
          </div>
        </div>
      </div>
    <EventSearchResults  :events="events" />

    </div>
    </transition>

  </div>
</template>

<script>
import NavbarComponent from "@/components/NavbarComponent";
import api from "@/api/api";
import EventSearchResults from "@/components/EventSearchResults";

export default {
  name: "Home",
  components: {EventSearchResults, NavbarComponent},
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
      ],
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
            this.events = [];
            for (let i = 0; i < res.data.length; i++) {
                this.events.push(res.data[i]);
            }

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
              this.events = [];

              for (let i = 0; i < res.data.length; i++) {
                  this.events.push(res.data[i]);
              }

            }).catch(err => {
          console.error(err);
        })
      } else {
        api.events.getFilteredEventsOnly(this.selectedCategoryIds)
            .then(res => {
              this.events = [];

              for (let i = 0; i < res.data.length; i++) {
                  this.events.push(res.data[i]);
              }
            }).catch(err => {
          console.error(err);
        })
      }
    },

    showAdvancedSearchMethod() {
      this.showAdvancedSearch = !this.showAdvancedSearch;
      if (this.showAdvancedSearch) {
        this.scrollTo();
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

  }

}
</script>

<style>
@import '../../public/styles/home.css';



</style>