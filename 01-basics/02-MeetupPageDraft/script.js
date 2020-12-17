import Vue from './vue.esm.browser.js'

const API_URL = 'https://course-vue.javascript.ru/api'
const MEETUP_ID = 6

const  getMeetupCoverLink = meetup => {
  return `${API_URL}/images/${meetup.imageId}`
}

const getDateOnlyString = date => {
  const YYYY = date.getUTCFullYear()
  const MM = (date.getUTCMonth() + 1).toString().padStart(2, '0')
  const DD = date.getUTCDate().toString().padStart(2, '0')
  return `${YYYY}-${MM}-${DD}`
}

const agendaItemTitles = {
  registration: 'Регистрация',
  opening: 'Открытие',
  break: 'Перерыв',
  coffee: 'Coffee Break',
  closing: 'Закрытие',
  afterparty: 'Afterparty',
  talk: 'Доклад',
  other: 'Другое',
}

const agendaItemIcons = {
  registration: 'key',
  opening: 'cal-sm',
  talk: 'tv',
  break: 'clock',
  coffee: 'coffee',
  closing: 'key',
  afterparty: 'cal-sm',
  other: 'cal-sm',
}


export const app = new Vue({
  el: '#app',

  data: {
    rawMeetup: null
  },

  async mounted() {
    this.rawMeetup = await this.getMeetup()
  },

  computed: {
    meetup() {
      if(!this.rawMeetup) { return null }

      return {
        ...this.rawMeetup,
        coverStyle: this.rawMeetup.imageId
          ? { '--bg-url': `url('${getMeetupCoverLink(this.rawMeetup)}')` }
          : {},
        localDate: new Date(this.rawMeetup.date).toLocaleString(navigator.language, {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        dateOnlyString: getDateOnlyString(new Date(this.rawMeetup.date)),
        agenda: this.rawMeetup.agenda ? this.rawMeetup.agenda.map(agenda => ({
          ...agenda,
          iconType: agendaItemIcons[agenda.type],
          defaultTitle: agendaItemTitles[agenda.type]
        })) : []
      }
    }
  },

  methods: {
    getMeetup() {
      return fetch(`${API_URL}/meetups/${MEETUP_ID}`)
        .then(res => res.json())
    }
  },
})
