<script>
export default {
  name: 'FadeTransitionGroup',

  computed: {
    slots_() {
      return this.$slots.default.map(
        i => ({ ...i, data: {...i.data, class: {...i.data.class, 'fade-list-item': true }} })
      )
    }
  },

  render(h) {
    return h(
      'transition-group',
      {
        props: {
          name: 'fade-list'
        },
        class: {
          'fade-list': true
        },
        attrs: {
          ...this.$attrs
        }
      },
      this.slots_
    )
  }
};
</script>

<style scoped>
.fade-list {
  position: relative;
}

.fade-list >>> .fade-list-item {
  opacity: 1;
  transition: opacity 0.3s ease-out;
}

.fade-list >>> .fade-list-leave-active {
  position: absolute !important;
  left: 0;
  right: 0;
}

.fade-list >>> .fade-list-enter,
.fade-list >>> .fade-list-leave-to {
  opacity: 0;
}

.fade-list >>> .fade-list-move {
  transition: transform 0.3s;
}
</style>
