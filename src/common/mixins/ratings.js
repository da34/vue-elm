const ALL = 2
import moment from 'moment'
export default {
  data () {
    return {
      selectType: ALL,
      haveContent: true,
    }
  },
  computed: {
    selectRatings () {
      let res = []

      this.ratings.forEach(item => {
        if (this.haveContent && !item.text) {
          return
        }
        if (this.selectType === ALL || this.selectType === item.rateType) {
          res.push(item)
        }

      })
      return res
    }
  },
  methods: {
    format (time) {
      return moment(time).format('YYYY-MM-DD h:mm')
    },
    select (num) {
      this.selectType = num
    },
    text () {
      this.haveContent = !this.haveContent
    }
  }
}
