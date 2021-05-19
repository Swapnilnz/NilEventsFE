<template>
  <div>
    <p-toast group="br" position="bottom-right"/>

    <p-navbar :model="navbarItems" class="navbar" style="background: whitesmoke">

      <template #start>
        <div class="menu-start" style="display: inline-flex">
          <a href="/">
            <img alt="logo" height="50" src="../assets/nil_events_logo_horizontal.png">
          </a>
          <div v-if="isLogged" class="create-event-btn" style="margin-left: 4vh">
            <p-button class="p-button-raised p-button-rounded p-button-lg" style="color: white; background-image: linear-gradient(to right, #3700ff, #c800ff); width: max-content "
                      @click="openCreateEvent">
              Create Event
            </p-button>
          </div>
          <!--          CREATE EVENT-->
          <p-dialog v-model:visible="displayCreateEvent" :closable="false" :modal="true" :showHeader="false"
                    :style="{width: '30vw'}"
                    contentStyle="padding:0; border-radius: 15px" style="border-radius: 15px">
            <CreateEvent :close-create-event="closeCreateEvent"></CreateEvent>
          </p-dialog>

<!--          MY EVENTS-->
          <div v-if="isLogged" class="myevents" style="margin-left: 4vh">
            <p-button class="p-button-raised p-button-rounded p-button-lg" style="background: white; color: black; width: max-content "
                      @click="route('My Events')">
              My Events
            </p-button>
          </div>
        </div>
      </template>

      <!--      END BUTTONS-->
      <template #end style="padding-right: 2%">
        <!--        IS NOT LOGGED IN-->
        <div v-if="!isLogged" class="navbar-login">
          <div style="margin-right: 5%">
            <p-button class="p-button-raised p-button-rounded p-button-lg" style="color: white; background-image: linear-gradient(to right, #3700ff, #c800ff); width: max-content "
                      @click="openSignUp">
              Sign Up
            </p-button>
          </div>

          <!--          SIGN UP DIALOG-->
          <p-dialog v-model:visible="displaySignUpModal" :closable="false"
                    :modal="true" :showHeader="false" :style="{width: '20vw'}"
                    contentStyle="padding:0; border-radius: 15px" style="border-radius: 15px">

            <div class="signup-dialogue">
              <div class="dialog-header"
                   style="background: whitesmoke; padding: 2vh; font-size: xx-large; text-align: center">
                Register an account
              </div>
              <div class="dialog-body" style="padding: 2vh">
                <div class="name" style="display: inline-flex; width: 100%; justify-content: space-evenly">

                  <div class="first-name" style="text-align: center;width: 45%">
                    <span class="p-input" style="border-radius: 10px; ">
                      <p-input v-model="firstName" placeholder="First Name*" style="border-radius: 20px; width: 100%"
                               type="text"/>
                    </span>
                    <small v-if="invalidFirstName" class="p-error" @change="validateFirstName">Please provide a first name</small>

                  </div>

                  <div class="last-name" style="text-align: center; width: 45%">
                     <span class="p-input" style="border-radius: 10px; ">
                      <p-input v-model="lastName" placeholder="Last Name*" style="border-radius: 20px; width: 100%"
                               type="text"/>
                    </span>
                    <small v-if="invalidLastName" class="p-error" @change="validateLastName">Please provide a last name</small>
                  </div>

                </div>
                <br>
                <br>

                <div style="text-align: center">
                  <label style="text-align: center">Email*</label>
                </div>
                <div class="email" style="text-align: center;">
                <span class="p-input-icon-left" style="border-radius: 10px; width: 75%">
                  <i class="pi pi-envelope"/>
                  <p-input id="email" v-model="email" aria-describedby="email-help" placeholder="user@mail.com"
                           style="border-radius: 20px; width: 100%" type="email"/>
                </span>

                </div>
                <div style="text-align: center">
                  <small v-if="invalidEmail" id="email-help" class="p-error">Email is {{ emailInvalidString }}</small>
                </div>

                <br>


                <div style="text-align: center">
                  <label style="text-align: center">Password*</label>
                </div>
                <div class="password" style="text-align: center;">
                <span class="p-input-icon-left" style="border-radius: 10px; width: 75%">
                  <i class="pi pi-unlock"/>
                  <!--                  <p-input id="password" type="password" aria-describedby="password-help" v-model="password" placeholder="********" style="border-radius: 20px; width: 100%"/>-->
                  <p-password v-model="password" class="password" placeholder="********" style="border-radius: 20px; width: 100%"
                              toggleMask>
                    <template #header>
                        <h6>Pick a password</h6>
                    </template>
                    <template #footer="sp">
                        {{ sp.level }}
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
                  <small v-if="invalidPassword" id="password-help" class="p-error">Password must be at least 8
                    characters</small>
                </div>
                <br>

                <div style="text-align: center">
                  <label style="text-align: center">Profile Image (optional)</label>
                </div>
                <br>
                <div v-if="!fileUploaded" class="img-upload" style="text-align: center">
                  <!--                <input type="file">-->
                  <p-file-upload :auto="true" :customUpload="true" :fileLimit="1" accept="image/png, image/jpeg, image/jpg, .gif" chooseLabel="Browse"
                                 mode="basic" name="demo[]" @uploader="myUploader">
                    <template #empty>
                      <p>Drag and drop files to here to upload.</p>
                    </template>
                  </p-file-upload>
                </div>
                <div style="text-align: center; color: green">
                  <label v-if="fileUploaded">File: {{ image.name }}</label>
                </div>
                <div v-if="fileUploaded" class="img" style="text-align: center">
                  <img id="new_img" :src="`${image.objectURL}`" alt="img"
                       style="max-width:-webkit-fill-available; max-height: 15vh"/>
                </div>

                <br>
                <br>
                <div style="display: flex; justify-content: space-between;">
                  <p-button class="p-button-text" icon="pi pi-times" label="Cancel" @click="closeSignUp"/>
                  <p-button autofocus icon="pi pi-check" label="Register" @click="register"/>
                </div>
              </div>


            </div>
          </p-dialog>

          <div>
            <p-button class="p-button-raised p-button-rounded p-button-lg" style="color: black; background-color: white"
                      @click="openLogin">
              Login
            </p-button>
          </div>

          <!--          LOG IN DIALOG-->
          <p-dialog v-model:visible="displayLoginModal" :closable="false" :modal="true" :showHeader="false"
                    :style="{width: '20vw'}"
                    contentStyle="padding:0; border-radius: 15px" style="border-radius: 15px">

            <div class="signup-dialogue">
              <div class="dialog-header"
                   style="background: whitesmoke; padding: 2vh; font-size: xx-large; text-align: center">
                Log in
              </div>
              <div class="dialog-body" style="padding: 2vh">

                <div style="text-align: center">
                  <label style="text-align: center">Email*</label>
                </div>
                <div class="email" style="text-align: center;">
                <span class="p-input-icon-left" style="border-radius: 10px; width: 75%">
                  <i class="pi pi-envelope"/>
                  <p-input id="email" v-model="loginEmail" aria-describedby="email-help" placeholder="user@mail.com"
                           style="border-radius: 20px; width: 100%" type="email"/>
                </span>
                </div>
                <br>

                <div style="text-align: center">
                  <label style="text-align: center">Password*</label>
                </div>
                <div class="password" style="text-align: center;">
                <span class="p-input-icon-left" style="border-radius: 10px; width: 75%">
                  <i class="pi pi-unlock"/>
                  <p-password v-model="loginPass" :feedback="false" class="password" placeholder="********" strongRegex
                              style="border-radius: 20px; width: 100%" toggleMask v-on:keyup.enter="login(loginEmail, loginPass, null)"/>
                </span>
                </div>
                <br>
                <div v-if="showLoginErrorMsg">
                  <p-message severity="error">Email Or Password Is Incorrect</p-message>
                </div>

                <br>
                <br>
                <div style="display: flex; justify-content: space-between;">
                  <p-button class="p-button-text" icon="pi pi-times" label="Cancel" @click="closeLogin"/>
                  <p-button autofocus icon="pi pi-check" label="Login" @click="login(loginEmail, loginPass, null)"/>
                </div>
              </div>


            </div>
          </p-dialog>
        </div>

        <!--        IS LOGGED IN-->
        <div v-if="isLogged" class="navbar-welcome" style="width: fit-content; justify-content: space-evenly">

          <div class="profile-btn" style="padding: 1vh;">
            <p-button class="p-button-raised p-button-rounded p-button-lg"
                      style="color: white; background-image: linear-gradient(to right, #3700ff, #c800ff); width: max-content " @click="openUserProfile">
              <i class="pi pi-user icon"></i>
              Profile
            </p-button>

          </div>

          <p-dialog v-model:visible="displayUserProfile" :closable="false" :modal="true" :showHeader="false"
                    :style="{width: '30vw'}"
                    contentStyle="padding:0; border-radius: 15px" style="border-radius: 15px">
            <UserProfile :close-user-profile="closeUserProfile" :navbar-image="updateImage"></UserProfile>
          </p-dialog>

          <div class="logout-btn" style="padding: 1vh;">
            <p-button class="p-button-raised p-button-rounded p-button-lg" style="color: gray; background: white; width: max-content "
                      @click="route('Home')">
              <i class="pi pi-sign-out icon"></i>
              Logout
            </p-button>

          </div>

          <div class="user-name-string" style="padding: 2vh 1vh 1vh;">
            {{ navbarInfo.loggedUserFirstName }} {{ navbarInfo.loggedUserLastName }}
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
import CreateEvent from "@/components/CreateEvent";
import UserProfile from "@/components/UserProfile";

const emailRegEx = /.+@.+\..+/;

export default {
  name: "NavbarComponent",
  components: {UserProfile, CreateEvent},
  data() {
    return {
      navbarItems: [],
      dropdownOptions: [{name: 'Profile', icon: 'pi pi-user', route: 'Profile'}, {
        name: 'Logout',
        icon: 'pi pi-sign-out',
        route: 'Home'
      }],

      isLogged: false,
      // SIGN UP
      displaySignUpModal: false,
      firstName: '',
      invalidFirstName: false,
      lastName: '',
      invalidLastName: false,
      email: null,
      invalidEmail: false,
      emailInvalidString: 'invalid',
      password: null,
      invalidPassword: false,
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

      displayCreateEvent: false,
      displayUserProfile: false

    }
  },
  created() {

    if (localStorage.getItem('token') !== 'null') {
      this.getLoggedInfo();

    }

  },

  watch: {
    email: function (newEmail) {
      this.invalidEmail = !emailRegEx.test(newEmail);
    },

    password: function (newPass) {
      this.invalidPassword = newPass.length < 8;
    },

    firstName: function (newFirstName) {
      this.invalidFirstName = newFirstName < 1;
    } ,

    lastName: function (newLastName) {
      this.invalidLastName = newLastName < 1;
    }

  },

  methods: {
    getLoggedInfo() {
      let id = localStorage.getItem('id');
      let navbarInfo = this.navbarInfo;
      return api.users.getUser(id)
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
        console.log(err);
      })
    },

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

    openUserProfile() {
      this.displayUserProfile = true;
    },

    closeUserProfile() {
      this.displayUserProfile = false;
    },


    myUploader(event) {
      this.image = event.files[0];
      this.fileUploaded = true;
    },


    register() {
      if (!emailRegEx.test(this.email)) {
        this.invalidEmail = true;
      }
      if (this.password === null || this.password.length < 8) {
        this.invalidPassword = true;
      }
      if (this.firstName === null || this.firstName.length < 1) {
        this.invalidFirstName = true;
      }
      if (this.lastName === null || this.lastName.length < 1) {
        this.invalidLastName = true;
      }
      if (!this.invalidEmail && !this.invalidPassword && !this.invalidFirstName && !this.invalidLastName) {
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
      switch (route) {
        case 'Home':
          api.users.logoutUser()
            .then(() => {
              localStorage.setItem('id', null);
              localStorage.setItem('token', null);
              this.loginEmail = null;
              this.loginPass = null;
              this.isLogged = false;
              this.$router.push({name: 'Home'});
            }).catch(err => {
            localStorage.setItem('id', null);
            localStorage.setItem('token', null);
            this.loginEmail = null;
            this.loginPass = null;
            this.isLogged = false;
            console.log(err);

            this.$router.push({name: 'Home'});
          })
          break;
        case 'Profile':
          this.$router.push({name: 'Profile'});
          break;

        case 'My Events':
          this.$router.push({name: 'My Events'});


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
              .then(() => {
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
          window.location.reload()

        }).catch(err => {
        this.loginSuccess = false;
        console.log(err);
        this.showLoginError();
      })
    },


    showLoginError() {
      this.showLoginErrorMsg = true;
    },

    showRegisterSuccess() {
      this.$toast.add({
        severity: 'success',
        summary: 'Success Message',
        detail: 'Registration Successful',
        group: 'br',
        life: 3000
      });
    },

    updateImage(newImage) {
      this.navbarInfo.image = newImage;
    }

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
/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>