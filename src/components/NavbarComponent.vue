<template>
  <div>
    <p-toast position="bottom-right" group="br" />

    <p-navbar :model="navbarItems" class="navbar" style="background: whitesmoke">

      <template #start >
        <div class="menu-start" style="display: inline-flex">
          <a href="/">
            <img alt="logo" src="../assets/nil_events_logo_horizontal.png" height="50" >
          </a>
          <div class="create-event-btn" v-if="isLogged" style="margin-left: 4vh">
            <p-button  class="p-button-raised p-button-rounded p-button-lg" @click="openCreateEvent" style="color: white; background-image: linear-gradient(to right, #3700ff, #c800ff); width: max-content ">
              Create Event
            </p-button>
          </div>
<!--          CREATE EVENT-->
          <p-dialog v-model:visible="displayCreateEvent" :style="{width: '20vw'}" :closable="false" :showHeader="false" :modal="true"
                    contentStyle="padding:0; border-radius: 15px" style="border-radius: 15px">

            <div class="signup-dialogue">
              <div class="dialog-header" style="background: whitesmoke; padding: 2vh; font-size: xx-large; text-align: center">
                Create Event
              </div>
              <div class="dialog-body" style="padding: 2vh">

                <div style="text-align: center">
                  <label style="text-align: center">Title*</label>
                </div>
                <div class="email" style="text-align: center;">
                  <span class="p-input" style="border-radius: 10px; width: 75%">
                    <p-input id="title" type="text" v-model="eventTitle" placeholder="e.g. 'My 21st'" style="border-radius: 20px; width: 100%"/>
                  </span>
                </div>
                <br>

                <div style="text-align: center">
                  <label style="text-align: center">Categories*</label>
                </div>
                <div class="categories" style="text-align: center;">
                  <p-multiselect style="width: 100%; text-align: left; border-radius: 20px"
                                 v-model="selectedCategories"
                                 :filter="true"
                                 :options="allCategories"
                                 optionLabel="name" placeholder="Select Categories" display="chip"/>
                </div>
                <br>

                <div style="text-align: center">
                  <label style="text-align: center">Description</label>
                </div>
                <div class="email" style="text-align: center;">
                  <span class="p-input" style="border-radius: 10px; width: 75%">
                    <p-input id="title" type="text" v-model="eventDescription" placeholder="e.g. 'A night of fun stuff'" style="border-radius: 20px; width: 100%;"/>
                  </span>
                </div>

                <br>
                <br>
                <div style="display: flex; justify-content: space-between;">
                  <p-button label="Cancel" icon="pi pi-times" @click="closeCreateEvent" class="p-button-text"/>
<!--                  TODO-->
<!--                  <p-button label="Create Event" icon="pi pi-check" @click="" autofocus/>-->
                </div>
              </div>


            </div>
          </p-dialog>

        </div>
      </template>

<!--      END BUTTONS-->
      <template #end style="padding-right: 2%">
<!--        IS NOT LOGGED IN-->
        <div class="navbar-login" v-if="!isLogged" >
          <div style="margin-right: 5%">
            <p-button class="p-button-raised p-button-rounded p-button-lg" @click="openSignUp" style="color: white; background-image: linear-gradient(to right, #3700ff, #c800ff); width: max-content ">
              Sign Up
            </p-button>
          </div>

<!--          SIGN UP DIALOG-->
          <p-dialog v-model:visible="displaySignUpModal" :style="{width: '20vw'}" :closable="false"  :showHeader="false" :modal="true"
                    contentStyle="padding:0; border-radius: 15px" style="border-radius: 15px">

            <div class="signup-dialogue">
              <div class="dialog-header" style="background: whitesmoke; padding: 2vh; font-size: xx-large; text-align: center">
                Register an account
              </div>
              <div class="dialog-body" style="padding: 2vh">
                <div class="name" style="display: inline-flex; width: 100%; justify-content: space-evenly">
                  <!--                <i class="pi pi-user" style="fontSize: 2vh; padding-top:1vh"/>-->
                  <div class="first-name" style="text-align: center;width: 45%">
                  <span class="p-input" style="border-radius: 10px; ">
                    <p-input type="text" v-model="firstName" placeholder="First Name*" style="border-radius: 20px; width: 100%"/>
                  </span>
                    <small v-if="firstName.length < 1" class="p-error">Please provide a first name</small>

                  </div>

                  <div class="last-name" style="text-align: center; width: 45%">
                   <span class="p-input" style="border-radius: 10px; ">
                    <p-input type="text" v-model="lastName" placeholder="Last Name*" style="border-radius: 20px; width: 100%"/>
                  </span>
                    <small v-if="lastName.length < 1" class="p-error">Please provide a last name</small>

                  </div>

                </div>
                <br>
                <br>

                <div style="text-align: center">
                  <label style="text-align: center">Email*</label>
                </div>
                <div class="email" style="text-align: center;">
                <span class="p-input-icon-left" style="border-radius: 10px; width: 75%">
                  <i class="pi pi-envelope" />
                  <p-input id="email" type="email" aria-describedby="email-help" v-model="email" placeholder="user@mail.com" style="border-radius: 20px; width: 100%"/>
                </span>

                </div>
                <div style="text-align: center">
                  <small v-if="invalidEmail" id="email-help" class="p-error">Email is {{emailInvalidString}}</small>
                </div>

                <br>


                <div style="text-align: center">
                  <label style="text-align: center">Password*</label>
                </div>
                <div class="password" style="text-align: center;">
                <span class="p-input-icon-left" style="border-radius: 10px; width: 75%">
                  <i class="pi pi-unlock" />
<!--                  <p-input id="password" type="password" aria-describedby="password-help" v-model="password" placeholder="********" style="border-radius: 20px; width: 100%"/>-->
                  <p-password class="password" toggleMask v-model="password" placeholder="********"  style="border-radius: 20px; width: 100%" >
                    <template #header>
                        <h6>Pick a password</h6>
                    </template>
                    <template #footer="sp">
                        {{sp.level}}
                      <hr>
                        <p class="p-mt-2">Requirements</p>
                        <ul class="p-pl-2 p-ml-2 p-mt-0" style="line-height: 1.5">
                            <li>Minimum 8 characters</li>
                        </ul>
                        <p class="p-mt-2">Suggestions</p>
                        <ul class="p-pl-2 p-ml-2 p-mt-0" style="line-height: 1.5">
                            <li>At least one lowercase</li>
                            <li>At least one uppercase</li>
                            <li>At least one numeric</li>
                        </ul>

                    </template>
                  </p-password>

                </span>
                </div>
                <div style="text-align: center">
                  <small v-if="invalidPassword" id="password-help" class="p-error">Password must be at least 8 characters.</small>
                </div>
                <br>

                <div style="text-align: center">
                  <label style="text-align: center">Profile Image (optional)</label>
                </div>
                <br>
                <div v-if="!fileUploaded" class="img-upload" style="text-align: center">
                  <!--                <input type="file">-->
                  <p-file-upload mode="basic" :auto="true" chooseLabel="Browse" name="demo[]" :customUpload="true" @uploader="myUploader" accept="image/*, .gif" :fileLimit="1"  >
                    <template #empty>
                      <p>Drag and drop files to here to upload.</p>
                    </template>
                  </p-file-upload>
                </div>
                <div style="text-align: center; color: green">
                  <label v-if="fileUploaded" >File: {{ image.name}}</label>
                </div>
                <div class="img" v-if="fileUploaded" style="text-align: center">
                  <img id="new_img" :src="`${image.objectURL}`" alt="img" style="max-width:-webkit-fill-available; max-height: 15vh"/>
                </div>

                <br>
                <br>
                <div style="display: flex; justify-content: space-between;">
                  <p-button label="Cancel" icon="pi pi-times" @click="closeSignUp" class="p-button-text"/>
                  <p-button label="Register" icon="pi pi-check" @click="register" autofocus/>
                </div>
              </div>


            </div>
          </p-dialog>

          <div >
            <p-button class="p-button-raised p-button-rounded p-button-lg" @click="openLogin" style="color: black; background-color: white">
              Login
            </p-button>
          </div>

          <!--          LOG IN DIALOG-->
          <p-dialog v-model:visible="displayLoginModal" :style="{width: '20vw'}" :closable="false"  :showHeader="false" :modal="true"
                    contentStyle="padding:0; border-radius: 15px" style="border-radius: 15px">

            <div class="signup-dialogue">
              <div class="dialog-header" style="background: whitesmoke; padding: 2vh; font-size: xx-large; text-align: center">
                Log in
              </div>
              <div class="dialog-body" style="padding: 2vh">

                <div style="text-align: center">
                  <label style="text-align: center">Email*</label>
                </div>
                <div class="email" style="text-align: center;">
                <span class="p-input-icon-left" style="border-radius: 10px; width: 75%">
                  <i class="pi pi-envelope" />
                  <p-input id="email" type="email" aria-describedby="email-help" v-model="loginEmail" placeholder="user@mail.com" style="border-radius: 20px; width: 100%"/>
                </span>
                </div>
                <br>

                <div style="text-align: center">
                  <label style="text-align: center">Password*</label>
                </div>
                <div class="password" style="text-align: center;">
                <span class="p-input-icon-left" style="border-radius: 10px; width: 75%">
                  <i class="pi pi-unlock" />
                  <p-password class="password" placeholder="********" toggleMask :feedback="false" v-model="loginPass" strongRegex style="border-radius: 20px; width: 100%" />
                </span>
                </div>
                <br>
                <div v-if="showLoginErrorMsg">
                  <p-message severity="error" >Email Or Password Is Incorrect</p-message>
                </div>

                <br>
                <br>
                <div style="display: flex; justify-content: space-between;">
                  <p-button label="Cancel" icon="pi pi-times" @click="closeLogin" class="p-button-text"/>
                  <p-button label="Login" icon="pi pi-check" @click="login(loginEmail, loginPass, null)" autofocus/>
                </div>
              </div>


            </div>
          </p-dialog>
        </div>

<!--        IS LOGGED IN-->
        <div class="navbar-welcome" v-if="isLogged" style="width: fit-content; justify-content: space-evenly">

          <div class="profile-btn" style="padding: 1vh;">
            <p-button class="p-button-raised p-button-rounded p-button-lg"  style="color: white; background-image: linear-gradient(to right, #3700ff, #c800ff); width: max-content ">
              <i class="pi pi-user icon"></i>
              Profile
            </p-button>

          </div>
          <div class="logout-btn" style="padding: 1vh;">
            <p-button class="p-button-raised p-button-rounded p-button-lg" @click="route('Home')" style="color: gray; background: white; width: max-content ">
              <i class="pi pi-sign-out icon"></i>
              Logout
            </p-button>

          </div>

          <div class="user-name-string" style="padding: 2vh 1vh 1vh;">
            {{navbarInfo.loggedUserFirstName}} {{navbarInfo.loggedUserLastName}}
          </div>

          <div class="profile-img" style="padding-top: 1.5vh">
            <img :src="`${navbarInfo.image}`" class="img-thumbnail" style="width: 5vh; height: 5vh; ">
          </div>


        </div>

      </template>
    </p-navbar>
  </div>
</template>

<script>
import api from "@/api/api";
const emailRegEx = /.+@.+\..+/;

export default {
  name: "NavbarComponent",
  data() {
    return {
      navbarItems: [],
      dropdownOptions: [{name: 'Profile', icon: 'pi pi-user', route: 'Profile'}, {name: 'Logout', icon: 'pi pi-sign-out', route: 'Home'}],

      isLogged: false,
      // SIGN UP
      displaySignUpModal: false,
      firstName: '',
      lastName: '',
      email: null,
      invalidEmail: true,
      emailInvalidString: 'invalid',
      password: null,
      invalidPassword: true,
      image: null,
      fileUploaded: false,

      // LOG IN
      displayLoginModal: false,
      loginEmail: null,
      loginPass: null,
      showLoginErrorMsg: false,
      loginSuccess: false,
      navbarInfo: {},
      loggedUserFirstName: '',
      loggedUserLastName: '',
      loggedImage: null,

      // CREATE EVENT
      displayCreateEvent: false,
      allCategories: [],
      selectedCategories: [],
      eventTitle: null,
      eventDate: null,
      eventImage: null,
      eventDescription: '',
      eventCapacity: null,
      eventIsOnline: false,
      eventURL: null,
      eventVenue: null,
      eventControl: false,
      eventFee: null

    }
  },
  created() {
    if (localStorage.getItem('token') !== null) {
      this.getLoggedInfo();
    }
    api.events.getAllCategories()
      .then(res => {
        this.allCategories = res.data;
      }).catch(err => {
      console.error(err);
    });
  },

  watch: {
    email: function (newEmail) {
      this.invalidEmail = !emailRegEx.test(newEmail);
    },

    password: function (newPass) {
      this.invalidPassword = newPass.length < 8;
    },

  },

  methods: {
    openSignUp() {
      this.displaySignUpModal = true;
    },

    closeSignUp() {
      this.displaySignUpModal = false;
    },

    openLogin() {
      this.displayLoginModal = true;
    },

    closeLogin() {
      this.displayLoginModal = false;
    },

    openCreateEvent() {
      this.displayCreateEvent = true;
    },

    closeCreateEvent() {
      this.displayCreateEvent = false;
    },



    myUploader(event) {
      this.image = event.files[0];
      this.fileUploaded = true;
      console.log(this.image);
    },

    register() {
      if (!this.invalidEmail && !this.invalidPassword) {
        let payload = {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password
        };
        let image = this.image;
        api.users.registerUser(payload)
        .then(res => {
          if (res.status === 201) {
            this.closeSignUp();
            this.showRegisterSuccess();
            this.login(payload.email, payload.password, image);
          }
        }).catch(err => {
          if (err.response.status === 400) {
            this.emailInvalidString = 'being used!'
            this.invalidEmail = true;
          }
        })
      }
    },

    route(route) {
      console.log(route);
      switch (route) {
        case 'Home':
          localStorage.setItem('id', null);
          localStorage.setItem('token', null);
          this.isLogged = false;
          this.$router.push({name: 'Home'});
          break;

        case 'Profile':
          this.$router.push({name: 'Profile'})

      }
    },

    login(email, password, image) {
      let payload = {
        email: email,
        password: password
      }
      api.users.loginUser(payload)
        .then(res => {
          let body = res.data
          localStorage.setItem('id', body.userId);
          localStorage.setItem('token', body.token);


          if (image) {
            api.users.putUserImage(localStorage.getItem('id'), image)
              .then( () => {
                this.getLoggedInfo();
              })
            .catch(err => {
              console.log(err);
            })
          } else {
            this.getLoggedInfo();
          }

          this.isLogged = true;
          this.closeLogin();

        }).catch(err => {
          this.loginSuccess = false;
          console.log(err);
          this.showLoginError();
      })
    },

    getLoggedInfo() {
      let id = localStorage.getItem('id');
      let navbarInfo = this.navbarInfo;
      api.users.getUser(id)
      .then(res => {
        navbarInfo.loggedUserFirstName = res.data.firstName;
        navbarInfo.loggedUserLastName = res.data.lastName;
        navbarInfo.image = null;
        api.users.getUserImage(id)
          .then(res => {
            let reader = new window.FileReader();
            reader.readAsDataURL(res.data);
            reader.onload = function () {
              navbarInfo.image = reader.result;
            }
            this.isLogged = true;
          }).catch(err => {
          console.log(err);
          navbarInfo.image = 'https://www.wallpaperup.com/template/dist/images/default/avatar.png?v=3.5.1';
          this.isLogged = true;
          })
      }).catch(err => {
        console.log(err);})
    },

    showLoginError() {
      this.showLoginErrorMsg = true;
      setTimeout(() => {
        this.showLoginErrorMsg = false;
      }, 5000);
    },

    showRegisterSuccess() {
      this.$toast.add({severity:'success', summary: 'Success Message', detail:'Registration Successful', group: 'br', life: 3000});
    },

  }
}
</script>

<style scoped>
.dialog-header {
  background: whitesmoke;
}
.password >>> .p-inputtext {
  margin: 0;
  width: 100%;
  border-radius: 20px;
}

</style>