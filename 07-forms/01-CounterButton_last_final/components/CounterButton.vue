<template>
  <button @click="handleClick">{{ count }}</button>
</template>

<script>
export default {
  name: 'CounterButton',

  props: {
    count: {
      type: Number,
      default: 0
    }
  },

  model: {
    prop: 'count',
    event: 'increment'
  },

  methods: {
    handleClick() {
      this.count = this.count + 1
      this.$emit('increment', this.count)
    }
  }
}
</script>

<style>

</style>
