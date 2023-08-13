import { addDoc, auth, collection, db, doc, getDoc, getDocs, onAuthStateChanged, orderRef, query, where } from "../config/Firebase.js";

const dropdown_container = document.getElementById('dropdown');
const foodItems_card_container = document.getElementById('foodItems-card')

window.onload = function () {

    onAuthStateChanged(auth, async (user) => {
        if (user) {
            const uid = user.uid;
            // console.log('user is signed in ===========>', uid);
            const docRef = doc(db, "users", uid);
            const docSnap = await getDoc(docRef);
            // console.log("Document data:", docSnap.data());
            const userDate = docSnap.data();

            if (userDate.userType == "Customer") {
                // console.log('Customer hai===============');
                const userProfile = ` 
                <img src=${userDate.userImage} onclick="myDropdown()" class="dropProfile " />
                <div id="myDropdown" class="dropdown-content">
                 <a href="./screens/customer.html">Profile</a>
                </div>  
                  `
                dropdown_container.innerHTML += userProfile
            }
            else if (userDate.userType == "Vendor ") {
                // console.log('Vendor hai===============');

                const userProfile = ` 
                <img src=${userDate.userImage} onclick="myDropdown()" class="dropProfile " />
                
                <div id="myDropdown" class="dropdown-content">
                 <a href="./screens/vendor.html">Profile</a>
                 <a href="./screens/dashboard.html">Dashboard</a>
                </div>  
                  `
                dropdown_container.innerHTML += userProfile
            }
            else {
                // console.log('admin hai===============');

                const userProfile = ` 
                <img src=${userDate.userImage} onclick="myDropdown()" class="dropProfile " />
                <div id="myDropdown" class="dropdown-content">
                 <a href="./screens/admin.html">Dashboard</a>
                </div>  
                `
                dropdown_container.innerHTML += userProfile

            }
        } else {
            window.location.replace('/screens/acounts.html');
        }
    });

    getDishe()
};


const getDishe = async () => {
    const querySnapshot = await getDocs(collection(db, "dishes"));
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        const dishesData = doc.data();
        const vendorUid = dishesData.userId;
        const foodName = dishesData.DisheName
        const foodPrice = dishesData.DishePrice
        const foodImage = dishesData.ImageDisheItem
        const foodDescription = dishesData.DisheDescription
        // console.log('dishesData=====>', dishesData);
        const id = doc.id;
        const foodCard = `
                          <div class="col-lg-4 col-md-6 mb-lg-0 mb-5">
                            <div class="card">
                             <img src=${foodImage} class="img-fluid" alt="">
                            <div class="pt-3">
                            <h4>${foodName}</h4>
                            <p class="cardPara">${foodDescription}</p>
                            <span>Rs: ${foodPrice}</span>
                            <button class="mt-4 main-btn" onclick="hendleOrder('${id}')">Order Now</button>
                            </div>
                            </div>
                           </div>
                   `
        foodItems_card_container.innerHTML += foodCard
    });
}
window.getDishe

// order 

const hendleOrder = async (id) => {
    const uid = auth.currentUser.uid;
    console.log('uid current user ======>', uid);
    const disheRef = doc(db, "dishes", id);
    const disheSnap = await getDoc(disheRef);

    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);

    if (disheSnap.exists() || userSnap.exists()) {
        console.log("dishe data  ==================>", disheSnap.data());
        console.log("user data==================>", userSnap.data());
        const disheData = disheSnap.data();
        const userData = userSnap.data();


        const obj = {
            orderImage: disheData.ImageDisheItem,
            orderName: disheData.DisheName,
            orderPrice: disheData.DishePrice,
            userName: userData.userName,
            userNumber: userData.userNumber,
            uid: disheData.userId,
            id,

        }
        console.log('obj ==========>', obj);
        await addDoc(orderRef, obj)
        swal("your order placed successfully ", "Your order has been successfully submitted", "success")


    } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
    }


}

window.hendleOrder = hendleOrder;




// active navbar
let nav = document.querySelector(".navigation-wrap");
window.onscroll = function () {
    if (document.documentElement.scrollTop > 20) {
        nav.classList.add("scroll-on");
    } else {
        nav.classList.remove("scroll-on");
    }
}


// nav hide
let navBar = document.querySelectorAll('.nav-link');
let navCollapse = document.querySelector('.navbar-collapse.collapse');
navBar.forEach(function (a) {
    a.addEventListener("click", function () {
        navCollapse.classList.remove("show");
    })
})


// counter design
document.addEventListener("DOMContentLoaded", () => {
    function counter(id, start, end, duration) {
        let obj = document.getElementById(id),
            current = start,
            range = end + start,
            increment = end > start ? 1 : -1,
            step = Math.abs(Math.floor(duration / range)),
            timer = setInterval(() => {
                current += increment;
                obj.textContent = current;
                if (current == end) {
                    clearInterval(timer);
                }
            }, step);

    }
    counter("count1", 0, 1287, 3000);
    counter("count2", 100, 4678, 2500);
    counter("count3", 0, 1846, 3000);
    counter("count4", 0, 1968, 3000);
});

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
window.myDropdown = function myDropdown() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function (event) {
    if (!event.target.matches('.dropProfile')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}
