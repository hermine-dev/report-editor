<template>
  <v-container fluid fill-height>
    <v-layout flex align-center justify-center>
        <v-row class="text-center">
          <v-col>
            <v-btn
              color="primary"
              @click="createReport('sales')"
            >
              <span class="mr-2">Create Sales Report</span>
            </v-btn>
          </v-col>
          <v-col>
            <v-btn
              color="primary"
              @click="createReport('rental')"
            >
              <span class="mr-2">Create Rental Report</span>
            </v-btn>
          </v-col>
        </v-row>
      <v-dialog
        v-model="dialog"
        max-width="500"
      >
        <v-card>
          <v-card-title class="headline" v-if="reportType">{{reportType.toUpperCase()}} Report Created</v-card-title>

          <v-card-text>
            <v-btn text
                   link
            to="/report-editor">
              View Report Editor
            </v-btn>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
              color="green darken-1"
              text
              @click="dialog = false"
            >
              Ok
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'CreateReport',
  data: () => ({
    dialog: false,
    reportType: null
  }),
  methods: {
    createReport (type) {
      this.reportType = type
      this.$store.dispatch('reports/create', { type: type })
        .then(res => {
          let draftReports = localStorage.getItem('draftReports')
          draftReports = draftReports ? JSON.parse(draftReports) : []

          const _draftReports = [...draftReports, res]
          localStorage.setItem('draftReports', JSON.stringify(_draftReports))
          this.dialog = true
        })
        .catch(() => {})
    }
  }
}
</script>
