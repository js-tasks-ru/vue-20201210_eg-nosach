import { MeetupView } from './MeetupView.js'
import { MEETUP_ID, fetchMeetup } from './data.js'

export const MeetupPage = {
  name: 'MeetupPage',

  template: `
    <div v-if="meetup">
      <meetup-view :meetup="meetup" />
    </div>
  `,

  components: {
    MeetupView
  },

  data() {
    return {
      meetup: null
    }
  },

  async mounted() {
    this.meetup = await fetchMeetup(MEETUP_ID)
  }
}
