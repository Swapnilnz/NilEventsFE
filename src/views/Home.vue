<template>
  <div style="-webkit-box-shadow: 5px 5px 15px rgba(0,0,0,0.4)">
<!--    NAVBAR-->
    <NavbarComponent/>

<!--    CAROUSEL-->
    <p-carousel :value="images"
                :responsiveOptions="responsiveOptions"
                :showItemNavigators="false" :showThumbnails="false"
                :autoPlay="true"
                :transitionInterval="5000"
                :circular="true" >
      <template #item="slotProps">
        <img :src="slotProps.item.itemImageSrc" :alt="slotProps.item.alt" style="opacity: 60%; width: 100%; -webkit-box-shadow: 5px 5px 5px rgba(0,0,0,0.4);" />
      </template>
    </p-carousel>

<!--    OVERLAY-->
    <div class="overlay">

      <img class="logo-overlay" src="../assets/nil_events_logo_vertical.png" alt="Logo">
      <div class="home-searching" style="align-self: center; margin-left: 8vh; width: 70vh; text-align: center; height: 100%; margin-top: 55vh">
        <span class="p-input-icon-left">
          <i class="pi pi-search" />
          <p-input type="text" v-model="query" class="p-inputtext-lg" placeholder="Search events..." style="border-radius: 33px; width: 70vh"/>
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
              <p-input type="text" v-model="query" placeholder="Search events..." style="border-radius: 33px; width: 50vh;-webkit-box-shadow: 2px 2px 2px rgba(0,0,0,0.4);"/>
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

      <p-panel>
        <div class="card">
          <p-dataview :value="data" :layout="layout" :paginator="true" :rows="9" :sortOrder="sortOrder" :sortField="sortField">
            <template #header>
              <div class="p-grid p-nogutter">
                <div class="p-col-6" style="text-align: left">
                  <p-dropdown v-model="sortKey" :options="sortOptions" optionLabel="label" placeholder="Sort By" @change="onSortChange($event)"/>
                </div>
                <div class="p-col-6" style="text-align: right">
                  <p-dataview-layout-options v-model="layout" />
                </div>
              </div>
            </template>

            <template #list="slotProps">
              <div class="p-col-12">
                <div class="product-list-item">
                  <img src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png" :alt="slotProps.data.title"/>
                  <div class="product-list-detail">
                    <div class="product-name">{{slotProps.data.title}}</div>
                    <div class="product-description">Product description</div>
                    <i class="pi pi-tag product-category-icon"></i><span class="product-category">Category</span>
                  </div>
                  <div class="product-list-action">
                    <span class="product-price">$66</span>
                    <p-button icon="pi pi-shopping-cart" label="Add to Cart" :disabled="false"></p-button>
                    <span :class="'product-badge status-instock'">IN STOCK</span>
                  </div>
                </div>
              </div>
            </template>

            <template #grid="slotProps">
              <div class="p-col-12 p-md-4">
                <div class="product-grid-item card">
                  <div class="product-grid-item-top">
                    <div>
                      <i class="pi pi-tag product-category-icon"></i>
                      <span class="product-category">Category</span>
                    </div>
                    <span :class="'product-badge status-instock'">IN STOCK</span>
                  </div>
                  <div class="product-grid-item-content">
                    <img src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png" :alt="slotProps.data.title"/>
                    <div class="product-name">{{slotProps.data.title}}</div>
                    <div class="product-description">Product description</div>
                  </div>
                  <div class="product-grid-item-bottom">
                    <span class="product-price">$55</span>
                    <p-button icon="pi pi-shopping-cart" :disabled="false"></p-button>
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
      query: null,
      showAdvancedSearch: false,
      data: [],
      layout: 'grid',
      images: [],
      sortKey: null,
      sortOrder: null,
      sortField: null,
      sortOptions: [
          // TODO categories
        {label: 'Number of attendees (Low to High)', value: 'price'},
        {label: 'Number of attendees (High to Low)', value: '!price'},
        {label: 'Date (Most to Least recent)', value: 'price'},
        {label: 'Date (Least to Most recent)', value: '!price'},
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
    })
  },

  methods: {
    // TODO better images
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
      api.events.getEventsQueryOnly(this.query)
          .then(res => {
            this.data = res.data;
            this.showAdvancedSearch = true;
            this.scrollTo();
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
              this.data = res.data;
            }).catch(err => {
          console.error(err);
        })
      } else {
        api.events.getFilteredEventsOnly(this.selectedCategoryIds)
            .then(res => {
              this.data = res.data;
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
      window.scrollTo({
        top: 1000,
        left: 0,
        behavior: 'smooth'
      });
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
    }
  }

}
</script>

<style>
@import '../../public/styles/home.css';

</style>