import { auth, collection, db, doc, getDoc, getDocs, onAuthStateChanged, onSnapshot, signOut, updateDoc } from "../config/Firebase.js";


window.addEventListener("load", (event) => {
    // onSnapshot(
    //     collection(db, "users"),
    //     (snapshot) => {
    //         getUsers()

    //     },
    //     (error) => {
    //         alert(error)
    //     });
    getUsers()

    onAuthStateChanged(auth, async (user) => {
        if (user) {
            const uid = user.uid;
            // console.log('user is signed in ===========>', uid);
            const docRef = doc(db, "users", uid);
            const docSnap = await getDoc(docRef);
            console.log("Document data:", docSnap.data());
            const userDate = docSnap.data();
            if (userDate.userType != 'admin') {
                console.log('admin hai ');
                           window.location.replace('/screens/acounts.html');
            }
        }
    });

});

const tBody = document.getElementById('tbody')




const getUsers = async () => {
    const querySnapshot = await getDocs(collection(db, "users"))
    querySnapshot.forEach((doc) => {
        // console.log(doc.id, " => ", doc.data());
        const userData = doc.data()
        if (userData.userType != 'admin') {
            const tBodyContant = `<tr>
            <td>
            <img src=${userData.userImage} class='image-usre'/>
            </td>
 
    <td>${userData.userName}</td>
            <td>${userData.userEmail}</td>
            <td>${userData.userNumber}</td>
            <td>${userData.userType}</td>
            <td>${userData.AcountActivate ? `<div class="form-check form-switch">
                <input class="form-check-input" id=${userData.uid}  onchange={handleAccountActivation(this)} type="checkbox"  checked>
                </div>` : `<div class="form-check form-switch">
                <input class="form-check-input" id=${userData.uid}  onchange={handleAccountActivation(this)} type="checkbox" id="flexSwitchCheckChecked" >
                </div>`

                }</td >
            
                </tr>`
            tBody.innerHTML += tBodyContant;
        }

    });

}
window.handleAccountActivation = async function handleAccountActivation(e) {
    // console.log("handleAccountActivation", e.checked)
    // console.log("handleAccountActivation", e.id)

    try {
        const userRef = doc(db, "users", e.id);
        await updateDoc(userRef, {
            AcountActivate: e.checked
        })

    } catch (error) {
        alert(error.message)
        // console.log(error.message)
    }


}


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


