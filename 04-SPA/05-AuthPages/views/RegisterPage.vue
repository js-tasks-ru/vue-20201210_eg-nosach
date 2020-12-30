<template>
  <form @submit.prevent="handleSubmit" class="form">
    <div class="form-group">
      <label class="form-label">Email</label>
      <div class="input-group">
        <input v-model="email" type="email" class="form-control" />
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Имя</label>
      <div class="input-group">
        <input v-model="fullname" type="text" class="form-control" />
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Пароль</label>
      <div class="input-group">
        <input v-model="password" type="password" class="form-control" />
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Повтор пароля</label>
      <div class="input-group">
        <input v-model="confirmPassword" type="password" class="form-control" />
      </div>
    </div>
    <div class="form-group">
      <label class="checkbox"><input v-model="isAgree" type="checkbox" /> Я согласен с условиями <span></span></label>
    </div>
    <div class="form__buttons">
      <button type="submit" class="button button_primary">Зарегистрироваться</button>
    </div>
    <div class="form__append">Уже есть аккаунт?
      <router-link to="/login" class="link">Войдите</router-link>
    </div>
  </form>
</template>

<script>
import { register } from '../data';

export default {
  name: 'RegisterPage',

  data() {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      fullname: '',
      isAgree: false
    }
  },

  computed: {
    isPasswordConfirm() {
      return this.password === this.confirmPassword
    }
  },

  methods: {
    validateForm() {
      return this.email === ''
      || this.fullname === ''
      || this.password === ''
      || !this.isPasswordConfirm
      || !this.isAgree
    },
    showAlertMessage() {
      if (this.email === '') {
        alert('Требуется ввести Email')
      } else if (this.fullname === '') {
        alert('Требуется ввести полное имя')
      } else if (this.password === '') {
        alert('Требуется ввести пароль')
      } else if (this.confirmPassword === '') {
        alert('Требуется ввести повтор пароля')
      } else if (!this.isPasswordConfirm) {
        alert('Пароли не совпадают')
      } else if (!this.isAgree) {
        alert('Требуется согласиться с условиями')
      }
    },
    handleSubmit() {
      if(this.validateForm()) {
        this.showAlertMessage()
      } else {
        register(this.email, this.fullname, this.password)
          .then(res => {
            if(res.error) {
              alert(res.message)
            } else {
              alert(res.id)
            }
          })
      }
    }
  }
};
</script>

<style scoped></style>
