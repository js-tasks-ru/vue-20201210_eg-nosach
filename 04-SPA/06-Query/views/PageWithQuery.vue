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

  data() {
    return {
      view: 'list',
      date: 'all',
      participation: 'all',
      search: ''
    }
  },

  created() {
    this.setDefaultData()
    this.getFromRoute()
    this.setToRoute()
  },

  watch: {
    $route() {
      this.getFromRoute()
    },
    view(v) {
      this.setToRoute({ view: v })
    },
    date(v) {
      this.setToRoute({ date: v })
    },
    participation(v) {
      this.setToRoute({ participation: v })
    },
    search(v) {
      this.setToRoute({ search: v })
    },
  },

  methods: {
    removeDefaultParams(q) {
      return Object.keys(q).reduce((acc, i) => (
        q[i] !== this.$options.defaultData[i]
          ? { ...acc, [i]: q[i] }
          : acc
      ), {})
    },
    setDefaultData() {
      this.$options.defaultData = {
        view: this.view,
        date: this.date,
        participation: this.participation,
        search: this.search
      }
    },
    getFromRoute() {
      this.view = this.$route.query.view || this.view
      this.date = this.$route.query.date || this.date
      this.participation = this.$route.query.participation || this.participation
      this.search = this.$route.query.search || this.search
    },
    setToRoute(v = {}) {
      let query = this.removeDefaultParams({ ...this.$route.query, ...v })

      this.$router.push({ query })
    }
  }
};
</script>

<style scoped></style>
