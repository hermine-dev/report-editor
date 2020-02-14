<template>
  <v-container fluid fill-height>
    <v-layout flex align-center justify-center>
      <div>
        <v-btn
          v-if="draftReports.length > 0"
          color="primary"
          @click="saveDraftReports"
        >
          <span class="mr-2">Save</span>
        </v-btn>
      </div>
      <div>
        <v-card
          v-for="(draftReport, index) in draftReports"
          :key="`r-${index}`"
          class="mx-auto"
          outlined
        >
          <v-list-item>
            <v-list-item-content>
              <h3>Type: {{draftReport.report.type}}</h3>
              <v-text-field label="Name"  v-model="draftReport.report.name"></v-text-field>
              <v-text-field label="Status" v-model="draftReport.report.status"></v-text-field>
              <div>
                <h4>Section Info:</h4>
                <div v-for="(section, i) in draftReport.sections" :key="`s-${i}`" >
                  <div v-if="section.type === 'info'">
                    <v-text-field label="Name" v-model="section.data.name"></v-text-field>
                    <v-text-field label="Area" v-model="section.data.area"></v-text-field>
                    <v-text-field v-if="section.data.phone !== undefined" label="Phone" v-model="section.data.phone"></v-text-field>
                  </div>
                </div>
              </div>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </div>
      <div v-if="draftReports.length === 0">
        <h3>No any draft reports</h3>
        <v-btn
          color="primary"
          to="/report-create">
          Create Report
        </v-btn>
      </div>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'ReportEditor',
  data: () => ({
    draftReports: []
  }),
  methods: {
    saveDraftReports () {
      localStorage.setItem('savedReports', JSON.stringify(this.draftReports))
      this.draftReports = []
      localStorage.removeItem('draftReports')
      this.$router.push('/reports')
    }
  },
  created () {
    const _draftReports = localStorage.getItem('draftReports')
    this.draftReports = _draftReports ? JSON.parse(_draftReports) : []
  }
}
</script>
