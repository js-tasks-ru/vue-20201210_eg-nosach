<template>
  <div class="toasts">
    <div
      v-for="item in list"
      :key="item.id"
      class="toast"
      :class="item.type === 'success' ? 'toast_success' : 'toast_error'"
    >
      <app-icon :icon="item.type === 'success' ? 'check-circle' : 'alert-circle'" />
      <span>{{ item.message }}</span>
    </div>
  </div>
</template>

<script>
import AppIcon from './AppIcon';

const DELAY = 5000;

export default {
  name: 'AppToast',

  components: { AppIcon },

  data() {
    return {
      list: []
    }
  },

  methods: {
    add(params) {
      params.id = Math.random()
      params.expire = setTimeout(() => { this.remove(params.id) }, DELAY)

      this.list.push(params)
    },
    remove(id) {
      let index = this.list.findIndex(i => i.id === id)

      this.list.splice(index, 1)
    },
    error(message) {
      this.add({ type: 'error', message })
    },
    success(message) {
      this.add({ type: 'success', message })
    }
  },
};
</script>

<style scoped>
.toasts {
  position: fixed;
  bottom: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  white-space: pre-wrap;
  z-index: 999;
}

.toast {
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  font-size: 18px;
  line-height: 28px;
  width: auto;
}

.toast + .toast {
  margin-top: 20px;
}

.toast > .icon {
  margin-right: 12px;
}

.toast.toast_success {
  color: var(--green);
}

.toast.toast_error {
  color: var(--red);
}

@media all and (min-width: 992px) {
  .toasts {
    bottom: 72px;
    right: 112px;
  }
}
</style>
