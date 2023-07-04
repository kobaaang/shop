import { initializeApp } from "firebase/app";
import { getDatabase, set, get, ref, remove } from "firebase/database";
//import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth"; (필수)
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";
import uuid from 'react-uuid';


const firebaseConfig = {
   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
   databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
};


const app = initializeApp(firebaseConfig);
// firebase객체를 만드는 것 provider auth(필수)
const provider = new GoogleAuthProvider();
const auth = getAuth();//초기화


/*Google 제공업체 객체를 사용해 Firebase에 인증합니다. 
팝업 창을 띄우거나 로그인 페이지로 리디렉션하여 사용자가 Google 계정에 로그인하도록 유도할 수 있습니다 휴대기기의 경우 리디렉션을 사용할 것을 권장합니다.(필수)auth = 인증 provider= 공급자*/
export async function login() {  //구글로그인함수
   return signInWithPopup(auth, provider)
      .then((result) => {
         const user = result.user;
         //console.log('user??',user)  //로그인을 했을 때 찍힘
         return user
      }).catch(console.error);
}

//로그아웃 함수가 작동하면 null값이 return 아무 것도 없는 값을 setuser값에 넣어서 작동하면 user은 비어있는 값이 된다
//user 값이 비어있는게 확인이 되면 로그인이라는 글씨가 출력되게
export async function logout() {//구글로그아웃
   return signOut(auth).then(() => null)
}

//화면이 mount(reload)될 때 로그인여부 확인하는 함수   auth는 로그인 상태 확인
export async function onUserStateChanged(callback) {
   onAuthStateChanged(auth, async (user) => {
      //1. 사용자가 로그인을 한 경우
      const updatedUser = user ? await adminUser(user) : null
      callback(updatedUser)
   });
}


//admin만 접속하게 할 수 있는 database구축
const database = getDatabase(app);

function adminUser(user) {//database가져오는
   //2. 사용자가 admon 권한이 있는지 확인 -> isAdmin을 user안에 넣음
   //get(ref(database, 'admins')) 가져올때는 이것만
   return get(ref(database, 'admins'))
      .then((snapshot) => {
         if (snapshot.exists()) {
            const admins = snapshot.val()
            const isAdmin = admins.includes(user.uid)
            return { ...user, isAdmin }
            //admin이 아니면 isdamin이 false로 나타난다
         }
         return user
      })//3. 사용자에게 알려줌
}


//NewProduct.jsx에서 파일을 가져와서 firebase에 넣어줄 수 있는 함수  
//데이터 가져오는 거 get    firebase에 데이터 집어넣는 거 set
//제품 등록
export async function addNewProduct(product, image) {
   //ref:레퍼런스(안에 있는 내용)
   //addNewProduct이 실행되면  product/(랜덤아이디)를 만들 것임 ex)초단위,
   //return set(ref(database, `products/${id}`),{집어넣을 때는 이 안에 뭐 어따 집어넣을 건지 다 해야함})
   const id = uuid();
   return set(ref(database, `products/${id}`), {
      ...product,
      id,
      price: parseInt(product.price),
      options: product.options ? product.options.split(',') : null,
      // options:product.options.split(','),
      image
   })
}

//DataSnapshot은 Firebase에서 제공하는 클래스입니다. DataSnapshot은 Firebase Database에서 데이터를 읽을 때 사용됩니다. DataSnapshot은 데이터의 키, 값, 자식 데이터에 대한 정보를 제공합니다.

//제품 가져오기
export async function getProduct() {
   return get(ref(database, 'products'))
      .then((snapshot) => {
         if (snapshot.exists) {
            return Object.values(snapshot.val())//Object의 value값을 가져오는데
         }
      })
}


//사용자의 카트에 추가하거나 업데이트 + 카트 삭제 + 카트에 들어가 있는 내용들 읽을 수 있게
export async function addOrUpdateToCart(userId, product) {
   return set(ref(database, `carts/${userId}/${product.id}`), product)
   //데이터 베이스 참조해서 경로 >>> 가져올 거
}

//카트에서 제품삭제
export async function removeFromCart(userId, porductId){
   return remove(ref(database, `carts/${userId}/${porductId}`))
}

//특정 사용자의 carts를 가져옴
export async function getCart(userId) {
   return get(ref(database, `carts/${userId}`))
      .then((snapshot) => {
         const items = snapshot.val() || {};
         return Object.values(items);
      })
}

