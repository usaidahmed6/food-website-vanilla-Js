import { FoodDisheRef, addDoc, auth, collection, db, doc, deleteDoc, getDoc, getDocs, getDownloadURL, onAuthStateChanged, onSnapshot, query, ref, signOut, storage, uploadBytes, where } from "../config/Firebase.js";


const image_user = document.getElementById('image-user');

const vendor_card_containetr = document.getElementById('vendor-card-containetr');
const tableRow = document.getElementById('tableRow')



window.addEventListener("load", (event) => {
    getOrders()
    getDishe();

    onAuthStateChanged(auth, async (user) => {
        if (!user) {
            window.location.replace('/screens/acounts.html');
            return false;
        }
        const uid = user.uid
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);
        // console.log("Document data:", docSnap.data());
        const userDate = docSnap.data();

        const userProfileHeader = `
        <img src=${userDate.userImage} onclick="myDropdown()" class="dropProfile " />
        `

        image_user.innerHTML += userProfileHeader;

        if (userDate.userType != 'Vendor ') {
            // console.log('Vendor nai ye ');
            history.back()
        }
    });

});



const getOrders = async () => {
    const querySnapshot = await getDocs(collection(db, "order"));
    querySnapshot.forEach((doc) => {
        // console.log("orders =============> ", doc.data());
        const oderData = doc.data()
        const id = doc.id

        console.log('order data uid===>', oderData.uid, 'current user uid===>', auth.currentUser.uid);
        if (oderData.uid == auth.currentUser.uid) {
            console.log('sai ye');

            const trData = `
            <td><img src=${oderData.orderImage} style="width: 85px; height: 45px;" /></td>
            <td>${oderData.orderName}</td>
            <td>${oderData.orderPrice} </td>
            <td>${oderData.userName} </td>
            <td>${oderData.userNumber} </td>
            <td>
                <button class="btn btn-success btn-sm" onclick="deleteorder('${id}')"> Accept Order</button>
            </td>
            `
            tableRow.innerHTML += trData
        }
        else {
            console.log('nai ye');
        }
    });
}

window.getOrders = getOrders;




const deleteorder = async (id) => {
    await deleteDoc(doc(db, "order", id));
}
window.deleteorder = deleteorder


const addItems = async () => {
    const DisheName = document.getElementById('DisheName').value;
    const DishePrice = document.getElementById('DishePrice').value;
    const DisheDescription = document.getElementById('DisheDescription').value;
    const ImageDishe = document.getElementById('ImageDishe').files

    // console.log(ImageDishe);
    if (!DisheName || !DishePrice || !DisheDescription || !ImageDishe) {
        swal("Oops", "please fill out this fields !", "error");
        return
    }

    try {
        // console.log('uid for vendor==============>',)
        const ImageDisheItem = await uploadItemsImageToFirebase(
            ImageDishe[0]
        );
        const objDisheItems = {
            DisheName,
            DishePrice,
            DisheDescription,
            ImageDisheItem,
            userId: auth.currentUser.uid
        }
        const addDocumentInFirebase = await addDoc(FoodDisheRef, objDisheItems);
        // console.log('object is working=====>', addDocumentInFirebase);
        if (addDocumentInFirebase) {
            swal("success", "Your successfully dishe add", "success")

            return
        }
        else {
            swal("Oops", 'your dishe not upload please try again', "error");
        }


    } catch (error) {
        swal("Oops", error, "error");
    }
}
window.addItems = addItems



const uploadItemsImageToFirebase = async (file) => {
    let foodItemImage;
    try {
        const storeageRef = ref(storage, 'ItemsImages/' + file.name);
        const upload = await uploadBytes(storeageRef, file);
        // console.log("file uploaded");
        const imageUrl = await getDownloadURL(storeageRef);
        foodItemImage = imageUrl;
    } catch (err) {
        // console.log(err.message);
    }
    return foodItemImage;
};



const getDishe = async () => {
    const querySnapshot = await getDocs(collection(db, "dishes"));
    querySnapshot.forEach((doc) => {
        const uid = auth.currentUser.uid;
        // console.log('current user uid ===>', uid);
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        const disheDoc = doc.data()
        const id = doc.id
        // console.log('dishe image get ===>', disheDoc.DisheName);
        // console.log('dishe match uid ===>', disheDoc.userId);

        if (disheDoc.userId === uid) {
            // console.log('current user uid match');
            const cardBody = `
             <div class="card-vendor-dishe"> 
                 <img src=${disheDoc.ImageDisheItem} class="img-vendor-dishe" />
                <div class="pt-3 card-content">
                 <h4>${disheDoc.DisheName}</h4>
                 <p>${disheDoc.DisheDescription}</p>
                 <p>Rs: ${disheDoc.DishePrice}</p>
                 <button class="mt-4 main-btn" onclick="deleteDish('${id}')">Delete</button>
                </div>
            </div>
             `
            vendor_card_containetr.innerHTML += cardBody
            return
        }
    });

};

window.getDishe = getDishe

// logout 

const deleteDish = async (id) => {
    await deleteDoc(doc(db, "dishes", id));
    swal("Delete Dishe", "Your Successfully Dishe Delete", "success")
}
window.deleteDish = deleteDish

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

