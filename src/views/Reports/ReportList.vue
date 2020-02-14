<template>
  <v-container fluid fill-height class="reports">
    <v-layout flex align-center justify-center>
      <v-row class="text-center">
        <v-col>
          <v-data-table
            loading="loading"
            :headers="headers"
            :items="list"
            :items-per-page="5"
            class="elevation-1"
          >
            <v-progress-linear v-show="loading" slot="progress" color="blue" indeterminate></v-progress-linear>
          </v-data-table>
        </v-col>
        <v-col>
          <v-btn
            to="/report-create"
            color="primary"
          >
            <span class="mr-2">Create Report</span>
          </v-btn>
        </v-col>
      </v-row>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Reports',
  data: () => ({
    disableItemsPerPage: true,
    loading: true,
    headers: [
      {
        text: 'Name',
        align: 'left',
        value: 'reportName'
      },
      { text: 'Status', value: 'reportStatus' },
      { text: 'Type', value: 'reportType' },
      { text: 'Section Name', value: 'sectionName' },
      { text: 'Section Area', value: 'sectionArea' },
      { text: 'Section Phone', value: 'sectionPhone' }
    ]
  }),
  computed: {
    ...mapState({
      list: state => state.reports.list
    })
  },
  created () {
    this.$store.dispatch('reports/list').then(() => {
      this.loading = false
    }).catch(console.error)
  }
}
</script>
