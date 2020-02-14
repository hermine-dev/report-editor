<template>
  <v-app>
    <main>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-btn
          text
          to="/reports"
        >
          <span class="mr-2">Reports</span>
        </v-btn>
      </div>
      <div class="d-flex align-center">
        <v-btn
          text
          to="/report-editor"
        >
          <span class="mr-2">Report Editor</span>
        </v-btn>
      </div>

      <v-spacer></v-spacer>
      <v-btn
        v-if="loggedIn"
        text
        @click="logout"
      >
        <span class="mr-2">Logout</span>
      </v-btn>
    </v-app-bar>

    <v-content>
      <!-- route outlet -->
      <!-- component matched by the route will render here -->
      <router-view></router-view>
    </v-content>
    </main>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'App',

  data: () => ({
    //
  }),
  computed: {
    ...mapState({
      loggedIn: state => !!state.auth.token
    })
  },
  methods: {
    logout () {
      return this.$store.dispatch('auth/signOut').then((res) => {
        if (res) {
          this.$router.push('/login')
        }
      }).catch((err) => {
        console.log('err', err)
        return err.response
      })
    }
  }
}
</script>
