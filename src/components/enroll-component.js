import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CourseService from "../services/course.service";

const EnrollComponent = ({ currentUser, setCurrentUser}) => {
  const navigate = useNavigate();
  let [searchInput,setSearchInput] = useState('');
  let [searchResult, setSearchResult] = useState([])
  const handleTakeLogin = () => {
    navigate('login');
  }
  const handleChangeInput = (e) => {
    setSearchInput(e.target.value)
  }
  const handleSearch = () => {
    CourseService.search(searchInput).then(data=>{
      console.log(data)
      setSearchResult(data.data)
    }).catch((e)=>{
      console.log(e)
    })
  }
  const handleEnroll = (e) => {
    console.log(e.target.id)
    CourseService.enroll(e.target.id).then((res)=>{
      const data = res.data
      window.alert(data.msg);
      if(data.result) navigate('/course')
    }).catch((e)=>{
      console.log(e)
    })

  }
  return(
    <div style={{padding: '3rem'}}>
      {!currentUser && (
        <div>
          <p>您必須先登入才能開始執註冊課程</p>
          <button className='btn btn-primary btn-lg' onClick={handleTakeLogin}>回到登入頁</button>
        </div>
      )}
      {currentUser && currentUser.user.role === 'instructor' && (
        <div>
          <h3>只有學生才能夠註冊課程</h3>
        </div>
      )}
      {currentUser && currentUser.user.role === 'student' && (
        <div>
          <h3>歡迎來到學生的課程頁面</h3>
          <div className="search input-group mb-3">
            <input type="text" name='name' className="form-control" onChange={handleChangeInput}></input>
            <button className="btn btn-primary" onClick={handleSearch}>搜尋課程</button>
          </div>
        </div>
      )}
      {
        currentUser && searchResult.length > 0 && (
          <>
            <h4 style={{marginTop: '50px'}}>搜尋結果：</h4>
            <div style={{display: 'flex',flexWrap: 'wrap',gap:'30px'}}>{searchResult.map((course)=>(
              <div key={course._id} className="card" style={{width: '28rem'}}>
                <div className='card-body'>
                  <h5 className='card-title'>課程名稱:{course.title}</h5>
                  <p style={{margin: '0.5rem 0rem'}} className='card-text'>內容:{course.description}</p>
                  <p style={{margin: '0.5rem 0rem'}} >學生人數: {course.students.length}</p>
                  <p style={{margin: '0.5rem 0rem'}} >課程價格: {course.price}</p>
                  <p style={{margin: '0.5rem 0rem'}} >講師: {course.instructor.username}</p>
                  <a href="#" id={course._id} className="card-text btn btn-primary" onClick={handleEnroll}>註冊課程</a>
                </div>
              </div>
            ))}</div>
          </>
        )
      }
    </div>
  )

}

// const EnrollComponent = (props) => {
//   let { currentUser, setCurrentUser } = props;
//   const navigate = useNavigate();
//   let [searchInput, setSearchInput] = useState("");
//   let [searchResult, setSearchResult] = useState(null);
//   const handleTakeToLogin = () => {
//     navigate("/login");
//   };
//   const handleChangeInput = (e) => {
//     setSearchInput(e.target.value);
//   };
//   const handleSearch = () => {
//     CourseService.getCourseByName(searchInput)
//       .then((data) => {
//         console.log(data);
//         setSearchResult(data.data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };
//   const handleEnroll = (e) => {
//     CourseService.enroll(e.target.id)
//       .then(() => {
//         window.alert("課程註冊成功。重新導向到課程頁面。");
//         navigate("/course");
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   return (
//     <div style={{ padding: "3rem" }}>
//       {!currentUser && (
//         <div>
//           <p>You must login first before searching for courses.</p>
//           <button
//             className="btn btn-primary btn-lg"
//             onClick={handleTakeToLogin}
//           >
//             Take me to login page.
//           </button>
//         </div>
//       )}
//       {currentUser && currentUser.user.role == "instructor" && (
//         <div>
//           <h1>Only students can enroll in courses.</h1>
//         </div>
//       )}
//       {currentUser && currentUser.user.role == "student" && (
//         <div className="search input-group mb-3">
//           <input
//             onChange={handleChangeInput}
//             type="text"
//             className="form-control"
//           />
//           <button onClick={handleSearch} className="btn btn-primary">
//             Search
//           </button>
//         </div>
//       )}
//       {currentUser && searchResult && searchResult.length != 0 && (
//         <div>
//           <p>我們從 API 返回的數據。</p>
//           {searchResult.map((course) => (
//             <div key={course._id} className="card" style={{ width: "18rem" }}>
//               <div className="card-body">
//                 <h5 className="card-title">課程名稱：{course.title}</h5>
//                 <p className="card-text">{course.description}</p>
//                 <p>價格: {course.price}</p>
//                 <p>目前的學生人數: {course.students.length}</p>
//                 <a
//                   href="#"
//                   onClick={handleEnroll}
//                   className="card-text btn btn-primary"
//                   id={course._id}
//                 >
//                   註冊課程
//                 </a>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

export default EnrollComponent;
