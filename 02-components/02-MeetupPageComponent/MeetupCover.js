export const MeetupCover = {
  template: `
    <div class="meetup-cover" :style="coverStyle">
      <h1 class="meetup-cover__title">{{ title }}</h1>
    </div>
  `,

  props: {
    title: {
      type: String
    },
    link: {
      type: String
    }
  },

  computed: {
    coverStyle() {
      return this.link
      ? { '--bg-url': `url('${this.link}')` }
      : {}
    }
  }
}
