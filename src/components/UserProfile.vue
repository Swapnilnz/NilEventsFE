<template>
  <div class="user-profile-dialog">
    <div class="dialog-header"
         style="background: whitesmoke; padding: 2vh; font-size: xx-large; text-align: center">
      User Profile
    </div>

    <div class="dialog-body" style="padding: 2vh">

      <div class="current-image" style="text-align: center;">
        <img :src="`${userImage.data}`"
             style="border-radius: 50%;-webkit-box-shadow: 3px 3px 3px rgba(0,0,0,0.4); max-height: 15vh">
      </div>
      <br>
      <div class="delete-img" style="text-align: center">
        <p-button class="p-button-raised p-button-rounded p-button-lg" style="color: white;"
                  @click="deleteImage">
          <i class="pi pi-times" style="padding-right: 1vh"></i>
          Delete Image
        </p-button>
      </div>

      <br>
      <div style="text-align: center; display: inline-flex; width: 100%; justify-content: space-around">
        <div style="text-align: center">
          <label style="text-align: center">First Name</label>
        </div>
        <div style="text-align: center">
          <label style="text-align: center">Last Name</label>
        </div>
      </div>
      <div class="name" style="display: inline-flex; width: 100%; justify-content: space-evenly">

        <div class="first-name" style="text-align: center;width: 45%">
                    <span class="p-input" style="border-radius: 10px; ">
                      <p-input v-model="firstName" placeholder="First Name*" style="border-radius: 20px; width: 100%"
                               type="text"/>
                    </span>
          <small v-if="firstName.length < 1" class="p-error">Please provide a first name</small>

        </div>

        <div class="last-name" style="text-align: center; width: 45%">
                     <span class="p-input" style="border-radius: 10px; ">
                      <p-input v-model="lastName" placeholder="Last Name*" style="border-radius: 20px; width: 100%"
                               type="text"/>
                    </span>
          <small v-if="lastName.length < 1" class="p-error">Please provide a last name</small>
        </div>

      </div>
      <br>
      <br>

      <div style="text-align: center">
        <label style="text-align: center">Email</label>
      </div>
      <div class="email" style="text-align: center;">
                <span class="p-input-icon-left" style="border-radius: 10px; width: 75%">
                  <i class="pi pi-envelope"/>
                  <p-input id="email" v-model="email" aria-describedby="email-help" placeholder="user@mail.com"
                           style="border-radius: 20px; width: 100%" type="email"/>
                </span>

      </div>
      <div style="text-align: center">
        <small v-if="invalidEmail" id="email-help" class="p-error">Email is invalid</small>
      </div>

      <br>


      <div style="text-align: center">
        <label style="text-align: center">Current Password*</label>
      </div>
      <div class="password1" style="text-align: center;">
        <span class="p-input-icon-left" style="border-radius: 10px; width: 75%">
          <p-password v-model="currentPass" :feedback="false" class="password"
                      placeholder="********" style="border-radius: 20px; width: 100%"
                      toggleMask>
          </p-password>

        </span>
      </div>

      <br>
      <div style="text-align: center">
        <label style="text-align: center">New Password</label>
      </div>
      <div class="password2" style="text-align: center;">
                <span class="p-input-icon-left" style="border-radius: 10px; width: 75%">
          <p-password v-model="newPass"  class="password"
                      placeholder="********" style="border-radius: 20px; width: 100%"
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
        <small v-if="invalidPass2" id="password2-help" class="p-error">{{invalidPassMessage}}</small>
      </div>
      <br>

      <div style="text-align: center">
        <label style="text-align: center">New Profile Image</label>
      </div>
      <br>
      <div v-if="!fileUploaded" class="img-upload" style="text-align: center">
        <p-file-upload :auto="true" :customUpload="true" :fileLimit="1" accept="image/*, .gif" chooseLabel="Browse"
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
      <div v-if="showEditErrorMsg">
        <p-message severity="error">{{ editErrorMsg }}</p-message>
      </div>

      <br>
      <br>
      <div style="display: flex; justify-content: space-between;">
        <p-button class="p-button-text" icon="pi pi-times" label="Cancel" @click="myCloseUserProfile"/>
        <p-button autofocus icon="pi pi-check" label="Save Changes" @click="saveChanges"/>
      </div>
    </div>


  </div>
</template>

<script>
import api from "@/api/api";

const emailRegEx = /.+@.+\..+/;

export default {

  name: "UserProfile",
  props: ['closeUserProfile', 'navbarImage'],

  data() {
    return {
      userId: null,
      userImage: {data: null},
      firstName: '',
      lastName: '',
      email: null,
      currentPass: '',
      newPass: null,
      fileUploaded: false,
      image: null,

      displayPass: false,
      invalidPass2: false,
      invalidPassMessage: 'Invalid Password',
      invalidEmail: false,

      showEditErrorMsg: false,
      editErrorMsg: 'Unable to save changes',
    }
  },

  watch: {

    email: function (newEmail) {
      this.invalidEmail = !emailRegEx.test(newEmail);
    },

    newPass: function (newPass) {
      if (newPass.length < 8) {
        this.invalidPass2 = true;
        this.invalidPassMessage = 'Password must be at least 8 characters'
      } else {
        this.invalidPass2 = false;
      }
    },

  },


  created() {
    this.userId = localStorage.getItem('id')
    this.getUserDetails();
    this.getUserImage();
  },

  methods: {
    myCloseUserProfile() {
      this.closeUserProfile();
    },

    myUploader(event) {
      this.image = event.files[0];
      this.fileUploaded = true;
    },

    getUserDetails() {
      api.users.getUser(this.userId)
        .then(res => {
          let userData = res.data;
          this.firstName = userData.firstName;
          this.lastName = userData.lastName;
          this.email = userData.email;
        }).catch(err => {
        console.error(err);
        this.closeUserProfile();
      })
    },

    getUserImage() {
      let image = this.userImage;
      api.users.getUserImage(this.userId)
        .then(res => {
          let reader = new window.FileReader();
          reader.readAsDataURL(res.data);

          reader.onload = function () {
            image.data = reader.result;
          }

        })
        .catch(err => {
          console.error(err);
          image.data = "https://www.wallpaperup.com/template/dist/images/default/avatar.png?v=3.5.1";
        })
    },

    deleteImage() {
      api.users.deleteUserImage(this.userId)
        .then(() => {
          this.getUserImage();
          this.navbarImage('https://www.wallpaperup.com/template/dist/images/default/avatar.png?v=3.5.1')
        }).catch(err => {
        console.log(err);
      })
    },

    saveChanges() {
      if (!this.invalidEmail && !this.invalidPassword && this.firstName.length > 0 && this.lastName.length > 0) {
        let payload = {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
        };

        if (this.currentPass.length > 0) {
          if (this.newPass !== null && this.newPass.length > 0) {
              payload.currentPassword = this.currentPass;
              payload.password = this.newPass;
          }

          let image = this.image;
          api.users.updateUser(this.userId, payload)
            .then(res => {
              if (res.status === 200 && image) {
                api.users.putUserImage(this.userId, image)
                  .then(() => {
                    this.closeUserProfile();
                    this.navbarImage(image.objectURL);
                  })
                  .catch(err => {
                    console.log(err);})
              } else {
                this.closeUserProfile();
              }
            }).catch(err => {
            console.log(err);
            if (err.response.status === 400) {
              this.showEditError(err.response.statusText)
            }
          })
        } else {
          this.showEditError("You must provide the current password")
        }

      }
    },

    showEditError(err) {
      this.editErrorMsg = err;
      this.showEditErrorMsg = true;
      setTimeout(() => {
        this.editErrorMsg = '';
        this.showEditErrorMsg = false;
      }, 5000);
    },
  }
}
</script>

<style scoped>
.password >>> .p-inputtext {
  margin: 0;
  width: 100%;
  border-radius: 20px;
}
</style>