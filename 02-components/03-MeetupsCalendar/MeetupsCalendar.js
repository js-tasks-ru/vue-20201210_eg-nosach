const FIRST_MONTH = 0
const LAST_MONTH = 11
const CELL_COUNT_LENGTH = 35

const getDaysInMonth = (month, year) => {
  const date = new Date(year, month, 1)
  const days = []

  while (date.getMonth() === month) {
    days.push({
      date: + new Date(date),
      day: date.getDate(),
      events: []
    })
    date.setDate(date.getDate() + 1)
  }

  return days
}

export const MeetupsCalendar = {
  name: 'MeetupsCalendar',

  template: `<div class="rangepicker">
    <div class="rangepicker__calendar">
      <div class="rangepicker__month-indicator">
        <div class="rangepicker__selector-controls">
          <button @click="prevMonth" class="rangepicker__selector-control-left"></button>
          <div>{{ currentLocalDate }}</div>
          <button @click="nextMonth" class="rangepicker__selector-control-right"></button>
        </div>
      </div>
      <div class="rangepicker__date-grid">
        <div v-for="calendarDay in calendarDays" class="rangepicker__cell" :class="{'rangepicker__cell_inactive': calendarDay.inactive}">
          {{ calendarDay.day }}
          <a v-for="event in calendarDay.events" class="rangepicker__event">
            {{ event.title }}
            {{ event.place }}
          </a>
        </div>
      </div>
    </div>
  </div>`,

  props: {
    meetups: {
      type: Array,
      required: true
    }
  },

  data() {
    return {
      date: new Date()
    }
  },

  computed: {
    currentLocalDate() {
      return this.date.toLocaleString(navigator.language, { year: 'numeric', month: 'long' })
    },
    monthNum() {
      return this.date.getMonth()
    },
    yearNum() {
      return this.date.getFullYear()
    },
    
    calendarDays() {
      let calendarDays = this.createCalendarDays()

      this.meetups.forEach(meetup => {
        let meetupDateString = new Date(meetup.date).toDateString()

        calendarDays = calendarDays.map(i => {
          let calendarDateString = new Date(i.date).toDateString()
          return calendarDateString === meetupDateString ? { ...i, events: [...i.events, meetup] } : i
        })
      })

      return calendarDays
    }
  },

  methods: {
    nextMonth() {
      if (this.monthNum === LAST_MONTH) {
        this.date.setMonth(FIRST_MONTH)
        this.date.setYear(this.yearNum + 1)
      } else {
        this.date.setMonth(this.monthNum + 1)
      }

      this.date = new Date(this.date)
    },
    prevMonth() {
      if (this.monthNum === FIRST_MONTH) {
        this.date.setMonth(LAST_MONTH)
        this.date.setYear(this.yearNum - 1)
      } else {
        this.date.setMonth(this.monthNum - 1)
      }

      this.date = new Date(this.date)
    },
    createCalendarDays() {
      let currentMonthDays = getDaysInMonth(this.monthNum, this.yearNum)
      let prevMonthDays = this.monthNum === FIRST_MONTH
        ? getDaysInMonth(LAST_MONTH, this.yearNum - 1)
        : getDaysInMonth(this.monthNum - 1, this.yearNum)
      let restDays = prevMonthDays
        .splice(currentMonthDays.length - CELL_COUNT_LENGTH)
        .map(i => ({ ...i, inactive: true }))

      return [...restDays, ...currentMonthDays]
    },
  }
}

