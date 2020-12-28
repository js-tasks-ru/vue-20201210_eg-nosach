<template>
  <form class="form" @submit.prevent="handleSubmit">
    <div class="form-group">
      <label class="form-label">Email</label>
      <div class="input-group">
        <input v-model="email" type="email" placeholder="demo@email" class="form-control" />
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Пароль</label>
      <div class="input-group">
        <input v-model="password" type="password" placeholder="password" class="form-control" />
      </div>
    </div>
    <div class="form__buttons">
      <button type="submit" class="button button_primary button_block">Войти</button>
    </div>
    <div class="form__append">Нет аккаунта?
      <router-link to="/register" class="link">Зарегистрируйтесь</router-link>
    </div>
  </form>
</template>

<script>
import { login } from '../data';

export default {
  name: 'LoginPage',

  data() {
    return {
      email: '',
      password: ''
    }
  },

  methods: {
    hasEmptyInputs() {
      return this.email === '' || this.password === ''
    },
    showAlertMessage() {
      if(this.email === '') {
        alert('Требуется ввести Email')
      } else if (this.password === '') {
        alert('Требуется ввести пароль')
      }
    },
    handleSubmit() {
      if (this.hasEmptyInputs()) {
        this.showAlertMessage()
      } else {
        login(this.email, this.password)
          .then(res => {
            if(res.error) {
              alert(res.message)
            } else {
              alert(res.fullname)
            }
          })
      }
    }
  }

};
</script>

<style scoped></style>
