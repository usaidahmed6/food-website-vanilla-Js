import { auth, db, doc, getDoc, onAuthStateChanged, signOut } from "../config/Firebase.js";



const user_profile_img_name = document.getElementById('user-profile-img-name');
const user_profile_email = document.getElementById('user-profile-email');
const user_profile_number = document.getElementById('user-profile-number');
const user_profile_type = document.getElementById('user-profile-type');
const user_profile_acount = document.getElementById('user-profile-acount');


window.addEventListener("load", (event) => {

    onAuthStateChanged(auth, async (user) => {
        if (!user) {
            window.location.replace('/screens/acounts.html');
            return false;
        }
        const uid = user.uid
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);
        console.log("Document data:", docSnap.data());
        const userDate = docSnap.data();
        const userProfileDetail = `
        <img src=${userDate.userImage}
        alt="Avatar" class="img-fluid my-5" style="width: 80px;" />
        <h5 style="color: #fff;">${userDate.userName}</h5>
        <i class="far fa-edit mb-5"></i>
        `
        const userProfileEmail = `
        <p class="text-muted">${userDate.userEmail}</p>
        `

        const userProfileNumber = `
        <p class="text-muted">${userDate.userNumber}</p>
        `
        const userProfileType = `
        <p class="text-muted">${userDate.userType}</p>
        `

        const userProfileAcount = `
        <p class="text-muted">${userDate.AcountActivate}</p>
        `

        user_profile_img_name.innerHTML += userProfileDetail;
        user_profile_email.innerHTML += userProfileEmail;
        user_profile_number.innerHTML += userProfileNumber;
        user_profile_type.innerHTML += userProfileType;
        user_profile_acount.innerHTML += userProfileAcount

        if (userDate.userType != 'Customer') {
            console.log('Customer nai ye ');
            // window.location.replace('/screens/acounts.html');
            history.back()
        }
    });
});



// logOut Acount

const logOutAcount = () => {
    signOut(auth).then(() => {
        swal("signOut", 'seccessfully signOut', "success");
        setTimeout(() => {
            window.location.replace('/screens/acounts.html')
        }, 2000);

    }).catch((error) => {
        const errorMessage = error.message
        swal("Oops", errorMessage, "error")

    });
}
window.logOutAcount = logOutAcount