import axios from 'axios'

const getUserInfo = (user_id, password) => {
  const reqData = {
    'user_id': user_id,
    'password': password
  }

  //let serverUrl = '//localhost:8080'
  let serverUrl = 'http://52.78.30.246:8080'

  return axios.post(serverUrl + '/api/auth/login', reqData, {
    headers: {
      'Content-type': 'application/json'
    }
  })
}

  
  export default {
  async doLogin(user_id, password) {
    try {
      const getUserInfoPromise = getUserInfo(user_id, password)
      const [userInfoResponse] = await Promise.all([getUserInfoPromise])
      if (userInfoResponse.data.length === 0) {
        return 'notFound'
      } else {
        localStorage.setItem('user_token', userInfoResponse.data.token)
        localStorage.setItem('user_role', userInfoResponse.data.user_role)
        localStorage.setItem('member_id', userInfoResponse.data.member_id)
        return userInfoResponse
      }
    } catch (err) {
      console.error(err)
    }
  }
}