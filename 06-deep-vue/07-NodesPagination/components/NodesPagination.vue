<script>
export default {
  name: 'NodesPagination',

  props: {
    page: Number,
    perPage: Number
  },

  computed: {
    slotsPerPage() {
      let from = this.$props.perPage * (this.$props.page - 1)
      let to = this.$props.perPage * this.$props.page
      let slots = this.$slots.default || []

      return slots.slice(from, to)
    }
  },

  render(h) {
    return h(
      'div',
      this.slotsPerPage
    )
  }
};
</script>

<style scoped></style>
