import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import MaterialIcon from '../components/MaterialIcon'

Vue.use(Vuetify)

function missingMaterialIcons (ids) {
  const icons = {}
  for (const id of ids) {
    for (const suffix of ['fill', 'outline', 'two-tone', 'round', 'sharp']) {
      const name = `${id}_${suffix}`
      icons[name] = {
        component: MaterialIcon,
        props: {
          name
        }
      }
    }
  }
  return icons
}

export default new Vuetify({
  // iconfont: 'md',
  icons: {
    ...missingMaterialIcons(['visibility', 'visibility_off'])
    // This will enable 'visibility_outline', 'visibility_off_round' and so on.
  }
})
