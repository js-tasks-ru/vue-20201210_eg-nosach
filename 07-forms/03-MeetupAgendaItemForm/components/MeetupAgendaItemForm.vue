<template>
  <div class="form-section form-section_inner">
    <button type="button" class="remove-button" @click="removeHandler">
      <img src="../assets/icons/icon-trash.svg" alt="trash" />
    </button>

    <div class="form-group">
      <select class="form-control" title="Тип" v-model="agendaItem_.type">
        <option
          v-for="itemType in $options.agendaItemTypes"
          :value="itemType.value"
          :key="itemType.value"
        >
          {{ itemType.text }}
        </option>
      </select>
    </div>

    <div class="form__row">
      <div class="form__col">
        <div class="form-group">
          <label class="form-label">Начало</label>
          <input class="form-control" type="time" placeholder="00:00" v-model="agendaItem_.startsAt" />
        </div>
      </div>
      <div class="form__col">
        <div class="form-group">
          <label class="form-label">Окончание</label>
          <input class="form-control" type="time" placeholder="00:00" v-model="agendaItem_.endsAt" />
        </div>
      </div>
    </div>

    <template v-if="agendaItem_.type === 'talk'">
      <div class="form-group">
        <label class="form-label">Тема</label>
        <input class="form-control" v-model="agendaItem_.title" />
      </div>
      <div class="form-group">
        <label class="form-label">Докладчик</label>
        <input class="form-control" v-model="agendaItem_.speaker" />
      </div>
      <div class="form-group">
        <label class="form-label">Описание</label>
        <textarea class="form-control" v-model="agendaItem_.description"></textarea>
      </div>
      <div class="form-group">
        <label class="form-label">Язык</label>
        <select class="form-control" v-model="agendaItem_.language">
          <option
            v-for="langItem in $options.talkLanguages"
            :value="langItem.value"
            :key="langItem.value"
          >
            {{ langItem.text }}
          </option>
        </select>
      </div>
    </template>
    <template v-else-if="agendaItem_.type === 'other'">
      <div class="form-group">
        <label class="form-label">Заголовок</label>
        <input class="form-control" v-model="agendaItem_.title" />
      </div>
      <div class="form-group">
        <label class="form-label">Описание</label>
        <textarea class="form-control" v-model="agendaItem_.description"></textarea>
      </div>
    </template>
    <template v-else>
      <div class="form-group">
        <label class="form-label">Нестандартный текст (необязательно)</label>
        <input class="form-control" v-model="agendaItem_.title" />
      </div>
    </template>
  </div>
</template>

<script>
import moment from 'moment'

const getAgendaItemTypes = () => [
  { value: 'registration', text: 'Регистрация' },
  { value: 'opening', text: 'Открытие' },
  { value: 'break', text: 'Перерыв' },
  { value: 'coffee', text: 'Coffee Break' },
  { value: 'closing', text: 'Закрытие' },
  { value: 'afterparty', text: 'Afterparty' },
  { value: 'talk', text: 'Доклад' },
  { value: 'other', text: 'Другое' },
];

const getTalkLanguages = () => [
  { value: null, text: 'Не указано' },
  { value: 'RU', text: 'RU' },
  { value: 'EN', text: 'EN' },
];

const deepClone = data => {
  return JSON.parse(JSON.stringify(data))
}

export default {
  name: 'MeetupAgendaItemForm',

  agendaItemTypes: getAgendaItemTypes(),
  talkLanguages: getTalkLanguages(),

  props: {
    agendaItem: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      agendaItem_: deepClone(this.agendaItem)
    }
  },

  watch: {
    'agendaItem_.startsAt': {
      handler(newStartsAt, prevStartsAt) {
        if (this.agendaItem_.endsAt !== '00:00') {
          let startsAtMinutesDif = moment.duration(newStartsAt).asMinutes() - moment.duration(prevStartsAt).asMinutes()
          let endsAtMinutes = moment.duration(this.agendaItem_.endsAt).asMinutes()
          let endsAtMinutesDif = moment.utc(
            moment
              .duration(startsAtMinutesDif + endsAtMinutes, "minutes")
              .asMilliseconds()
          ).format("HH:mm")

          this.agendaItem_.endsAt = endsAtMinutesDif
        }

        this.agendaItem_.startsAt = newStartsAt
      }
    },
    agendaItem_: {
      deep: true,
      handler(v) {
        this.$emit('update:agendaItem', v)
      }
    }
  },

  methods: {
    removeHandler() {
      this.$emit('remove')
    }
  }
};
</script>

<style></style>
