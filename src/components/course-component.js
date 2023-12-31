import React, {useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
// 好像不用取一樣名字耶
import CourseService from '../services/course.service';
export default function CourseComponent({currentUser, setCurrentUser}){
  const navigate = useNavigate();
  const handleTakeLogin = () => {
    navigate('/login')
  }
  const [ courseData, setCourseData ] = useState([])
  const [ loading, setLoading] = useState(false)
  useEffect(()=>{
    let _id;
    if(currentUser){
      setLoading(true);
      _id = currentUser.user._id;
      if(currentUser.user.role === 'instructor'){
        CourseService.get(_id)
        .then((data)=>{
          setCourseData(data.data)
          setLoading(false)
        })
        .catch((e)=>{
          console.log(e)
          setLoading(false)
        })
      }else if(currentUser.user.role === 'student'){
        CourseService.getEnrolledCourses(_id).then((data)=>{
          setCourseData(data.data)
          console.log(data.data)
          setLoading(false)
        }).catch((e)=>{
          console.log(e)
          setLoading(false)
        })
      }
    }
  },[currentUser]);

  return (
    <div style={{padding:'3rem'}}>
      <h2>歡迎來到課程頁面</h2>
      { !currentUser && (
        <div>
          <p>您必須先登入才能看到課程</p>
          <button onClick={handleTakeLogin} className='btn btn-primary btn-lg'>回到登入頁面</button>

        </div>
      )}
      {
        loading && (
          <div style={{display: 'fixed',width: '100vw', height: '100vh',backgroundColor: 'rgba(0,0,0,.5)',color: '#fff',top: '0',left: '0'}}>Load...</div>
        )
      }
      {
        currentUser.user.role === 'instructor' && (
          <>
            <h3>您的身分是<b>講師</b></h3>
            <div style={{display: 'flex',flexWrap: 'wrap'}}>
              {
                courseData.map(course =>(
                  <div className='card' style={{width: '18rem',margin: '1rem'}}>
                    <div className='card-body'>
                      <h5 className='card-title'>課程名稱:{course.title}</h5>
                      <p style={{margin: '0.5rem 0rem'}} className='card-text'>{course.description}</p>
                      <p style={{margin: '0.5rem 0rem'}} >學生人數: {course.students.length}</p>
                      <p style={{margin: '0.5rem 0rem'}} >課程價格: {course.price}</p>
                    </div>
                  </div>
                ))
              }
            </div>
          </>
        )
      }
      {
        currentUser.user.role === 'student' && (
          <>
            <h3>您的身分是<b>學生</b></h3>
            {courseData.length ? (
                <div style={{display: 'flex',flexWrap: 'wrap'}}>
                  {
                    courseData.map((course,index) =>(
                      <div key={index} className='card' style={{width: '18rem',margin: '1rem'}}>
                        <div className='card-body'>
                          <h5 className='card-title'>課程名稱:{course.title}</h5>
                          <p style={{margin: '0.5rem 0rem'}} className='card-text'>{course.description}</p>
                          <p style={{margin: '0.5rem 0rem'}} >學生人數: {course.students.length}</p>
                          <p style={{margin: '0.5rem 0rem'}} >課程價格: {course.price}</p>
                        </div>
                      </div>
                    ))
                  }
              </div>
              ):''
            }
          </>
        )
      }
    </div>
  )

}