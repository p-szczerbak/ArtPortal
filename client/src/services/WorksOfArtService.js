import Api from '@/services/Api'

export default {
  fetchWorksOfArt () {
    return Api().get('worksOfArt',
      {
        headers: {
          'Content-Type': 'application/json'
        }
      })
  },
  addWorkOfArt (dataObj) {
    return Api().post('worksOfArt', dataObj)
  }
}
