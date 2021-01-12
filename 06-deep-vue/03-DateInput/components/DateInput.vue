<template>
  <AppInput
    :type="type"
    :[inputType]="inputValue"
    v-on="listeners"
    v-bind="{...$attrs, ...$props}"
  >
    <!-- Так можно передать все слоты в дочерний компонент -->
    <template v-for="slot of Object.keys($slots)" v-slot:[slot]>
      <slot :name="slot" />
    </template>
  </AppInput>
</template>

<script>
import AppInput from './AppInput';

export default {
  name: 'DateInput',

  components: { AppInput },

  inheritAttrs: false,

  props: {
    type: {
      type: String,
      default: 'date',
      validator(v) {
        ['date', 'time', 'datetime-local'].indexOf(v) !== -1
      }
    },
    valueAsNumber: {
      type: Number
    },
    valueAsDate: {
      type: Date
    },
    value: {},
  },

  computed: {
    inputType() {
      return this.type !== 'datetime-local' && this.$props.valueAsNumber && 'valueAsNumber' ||
        this.$props.valueAsDate && 'valueAsDate' || 'value'
    },
    inputValue() {
      return this.$props[this.inputType] || ''
    },
    listeners() {
      return {
        ...this.$listeners,
        input: (e) => {
          console.log(e)
          this.$emit('update:valueAsNumber', e)
        },
      }
    }
  }
};
</script>

<style scoped></style>
