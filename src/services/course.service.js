import axios from 'axios';
const API_URL = 'http://localhost:8080/api/courses';

class CourseService {
  tokenUpdate(){
    this.token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : '';
  }
  post(title, description,price){
    this.tokenUpdate()
    return axios.post(API_URL, {title, description,price},{
      headers: {
        Authorization: this.token,
      }
    })
  }
  //  使用學生 id 找到課程
  getEnrolledCourses(_id){
    this.tokenUpdate();
    return axios.get(API_URL + '/student/'+ _id,{
      headers: {
        Authorization: this.token,
      }
    })
  }
  //  使用instructor id 找到課程
  get(_id){
    this.tokenUpdate()
    return axios.get(API_URL + '/instructor/' + _id, {
      headers: {
        Authorization: this.token,
      }
    })
  }
  // 用課程名稱尋找課程
  search(name){
    this.tokenUpdate();
    if(name){
      return axios.get(API_URL + '/findByName/' + name,{
        headers: {
          Authorization: this.token,
        }
      })
    }else{
      return axios.get(API_URL ,{
        headers: {
          Authorization: this.token,
        }
      })
    }
  }
  enroll(id){
    this.tokenUpdate();
    return axios.post(API_URL + '/enroll/' + id,{},{
      headers: {
        Authorization: this.token,
      }
    })
  }
}

const service = new CourseService()
export default service