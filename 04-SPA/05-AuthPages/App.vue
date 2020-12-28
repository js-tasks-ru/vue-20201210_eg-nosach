<template>
  <div id="app">
    <header>
      <nav>
        <ul>
          <li><router-link to="/">/</router-link></li>
          <li><router-link to="/login">/login</router-link></li>
          <li><router-link to="/register">/register</router-link></li>
        </ul>
      </nav>
    </header>
    <main class="page page_onboarding"><router-view /></main>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style scoped>
.page.page_onboarding {
  max-width: 374px;
  width: 100%;
  margin: 0 auto;
}

.form {
  margin: 0;
}

.form__buttons {
  display: flex;
  flex-direction: column;
  padding: 0 40px;
  margin-top: 40px;
}

.form__append {
  margin-top: 40px;
  text-align: center;
  font-weight: 400;
  font-size: 20px;
  line-height: 28px;
}

.form-group {
  position: relative;
  margin-bottom: 24px;
}

.form-group.form-group_inline {
  display: inline-block;
  margin-bottom: 0;
}

.form-group.form-group_inline + .form-group.form-group_inline {
  margin-left: 16px;
}

.form-label {
  font-weight: 400;
  font-size: 20px;
  line-height: 28px;
  color: var(--body-color);
  margin-bottom: 10px;
  display: block;
}

.input-group {
  position: relative;
}

.input-group .form-control {
  width: 100%;
}

.input-group.input-group_icon .form-control {
  padding-left: 50px;
}

.input-group.input-group_icon .icon {
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
}

.input-group.input-group_icon.input-group_icon-left .icon {
  left: 16px;
}

.input-group.input-group_icon.input-group_icon-right .icon {
  right: 16px;
}

.button {
    display: inline-block;
    padding: 10px 24px;
    font-weight: 700;
    font-size: 20px;
    line-height: 28px;
    color: initial;
    text-align: center;
    border: 4px solid transparent;
    transition: .2s all;
    outline: none;
    box-shadow: none;
    background-color: transparent;
    cursor: pointer;
    text-decoration: none;
}

.button.button_block {
   display: block;
    width: 100%;
}

.button.button_primary {
    background-color: var(--blue);
    border-color: var(--blue);
    color: var(--white);
}

.button.button_primary:hover {
    background-color: var(--blue-light);
    border-color: var(--blue-light);
    color: var(--blue);
}

.button.button_secondary {
    background-color: var(--white);
    border-color: var(--blue);
    color: var(--blue);
}

.button.button_secondary:hover {
    border-color: var(--blue-light);
}

.button.button_danger {
    background-color: var(--white);
    border-color: var(--red);
    color: var(--red);
}

.button.button_danger:hover {
    border-color: var(--red-light);
}
</style>
