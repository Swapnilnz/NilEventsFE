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
                        <div class="p-col-12" style="height: 28vh">
                            <div class="box box-stretched">
                                <p-card class="all-attendees-card" style="width: 100%; height: 100%">
                                    <template #header>
                                        <div class="user-name" style="font-size: 3vh; padding-top: 1vh">
                                            Event Attendees
                                        </div>
                                    </template>
                                    <template #content>
                                        <div v-if="eventLoaded" class="attendees-table">
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
                            <div class="p-col-12">
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
                                            <span
                                                class="product-category">{{ getCategoriesFromId(eventInfo.categories) }}</span>
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
                                            <span class="venue">
                      <strong>Fee:</strong> ${{ eventInfo.fee }}
                    </span>
                                        </div>

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
                            <p-carousel :autoplayInterval="3000" :indicatorsContentClass="null" :numScroll="5" :numVisible="5"
                                        :value="similarEvents" class="carousel" orientation="vertical"
                                        verticalViewPortHeight="60vh">

                                <template #item="slotProps">
                                    <div class="product-item">
                                        <div class="product-item-content">
                                            <div class="p-mb-3">
                                                <img :alt="slotProps.data.title" :src="`${slotProps.data.eventImage}`"
                                                     class="product-image"/>
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
        }
    },

    created() {
        this.eventId = this.$route.params.eventId;
        this.onInitialize();

    },

    methods: {
        onInitialize() {
            this.eventId = this.$route.params.eventId;
            this.getAllEventData();
        },

        getAllEventData() {
            api.events.getOneEvent(this.eventId)
                .then(res => {
                    this.eventInfo = res.data;

                    let date = '';
                    let rawDate = new Date(this.eventInfo.date);
                    date += rawDate.toLocaleDateString();
                    let time = `${rawDate.getHours()}:${rawDate.getMinutes()}:${rawDate.getSeconds()}`
                    this.eventInfo.dateString = `${date} ${time}`;
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

        getAllAttendees() {
            api.events.getEventAttendees(this.eventId)
                .then(res => {
                    this.attendees = res.data
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

                    let reader = new window.FileReader();
                    reader.readAsDataURL(res.data);
                    reader.onload = function () {
                        curEventInfo.eventImage = reader.result;
                    }
                })
                .catch(err => {
                    console.error(err);
                    curEventInfo.eventImage = 'https://t3.ftcdn.net/jpg/02/35/35/38/360_F_235353859_bnOvXsJfJoDBbGXJYO2soMTlJaOBaom2.jpg';
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
    background: #7b30aa;
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
}

.info-card >>> .p-card-header {
    background: #033c92;
    min-height: 5vh;
    color: white;
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
}

.user-img-card {
    border-radius: 30px;
    padding: 0;
}

.user-img-card >>> .p-card-header {
    background: #000000;
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
    background: #167403;
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
    background: #800404;
    min-height: 5vh;
    color: white;
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
}
</style>