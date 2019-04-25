import Api from '@/services/Api'

export default {
  fetchWorksOfArt () {
    return Api().get('worksOfArt')
  }
}
