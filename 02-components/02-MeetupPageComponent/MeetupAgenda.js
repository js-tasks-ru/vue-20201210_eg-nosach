import { MeetupAgendaItem } from './MeetupAgendaItem.js'

export const MeetupAgenda = {
  name: 'MeetupAgenda',

  template: `
    <div class="meetup-agenda">
      <div v-for="agendaItem in agenda" class="meetup-agenda__item">
        <meetup-agenda-item :agendaItem="agendaItem" />
      </div>
    </div>
  `,

  components: {
    MeetupAgendaItem
  },

  props: {
    agenda: {
      type: Array
    }
  }
}
