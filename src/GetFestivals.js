// import React, { useState} from 'react';
// import axios from 'axios';

// const [text, setText] = useState([]);

// function getNotice() {
//   axios.get("http://127.0.0.1:8000/festivalapp/festivals/")
//     .then((response) => {
//       setText([...response.data]);
//       console.log(response.data);
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
// };

// async function getData() {
//   try {
//     //응답 성공
//     const response = await axios.get('http://localhost:8000/festivalapp/festivals/');
//     console.log(response);
//   } catch (error) {
//     //응답 실패
//     console.error(error);
//   }
// }
// export default getData;

//getData();



// function Festivals() {
//   const [festivals, setUsers] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchFestivals = async () => {
//       try {
//         // 요청이 시작 할 때에는 error 와 users 를 초기화하고
//         setError(null);
//         setUsers(null);
//         // loading 상태를 true 로 바꿉니다.
//         setLoading(true);
//         const response = await axios.get(
//             '127.0.0.1:8000/festivalapp/festivals'
//         );
//         setUsers(response.data); // 데이터는 response.data 안에 들어있습니다.
//       } catch (e) {
//         setError(e);
//       }
//       setLoading(false);
//     };

//     fetchFestivals();
//   }, []);

//   if (loading) return <div>로딩중..</div>;
//   if (error) return <div>에러가 발생했습니다</div>;
//   if (!festivals) return null;



//   return festivals;
// //   return (
// //     <ul>
// //       {festivals.map(festival => (
// //         <li key={festival.id}>
// //           {user.username} ({user.name})
// //         </li>
// //       ))}
// //     </ul>
// //   );
// }

// export default Festivals;