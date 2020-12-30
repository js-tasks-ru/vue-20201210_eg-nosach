<template>
  <div class="container">
    <meetups-view
      :view.sync="view"
      :date.sync="date"
      :participation.sync="participation"
      :search.sync="search"
    />
  </div>
</template>

<script>
import MeetupsView from '../components/MeetupsView';

export default {
  name: 'PageWithQuery',
  components: { MeetupsView },

  defaultData: {
    view: 'list',
    date: 'all',
    participation: 'all',
    search: ''
  },

  data() {
    return {
      view: this.$options.defaultData.view,
      date: this.$options.defaultData.date,
      participation: this.$options.defaultData.participation,
      search: this.$options.defaultData.search
    }
  },

  created() {
    this.getRouteValues()
    this.setRouteValues()
  },

  watch: {
    $route() {
      this.getRouteValues()
    },
    view(v) {
      this.setRouteValues({ view: v })
    },
    date(v) {
      this.setRouteValues({ date: v })
    },
    participation(v) {
      this.setRouteValues({ participation: v })
    },
    search(v) {
      this.setRouteValues({ search: v })
    },
  },

  methods: {
    clearDefaultParams(q) {
      return Object.keys(q).reduce((acc, i) => (
        q[i] !== this.$options.defaultData[i]
          ? { ...acc, [i]: q[i] }
          : acc
      ), {})
    },
    getRouteValues() {
      this.view = this.$route.query.view || this.view
      this.date = this.$route.query.date || this.date
      this.participation = this.$route.query.participation || this.participation
      this.search = this.$route.query.search || this.search
    },
    setRouteValues(v = {}) {
      let query = this.clearDefaultParams({ ...this.$route.query, ...v })
      this.$router.push({ query }).catch(err => {
        if (err.name !== 'NavigationDuplicated') {
          throw err
        }
      })
    }
  }
};
</script>

<style scoped></style>
