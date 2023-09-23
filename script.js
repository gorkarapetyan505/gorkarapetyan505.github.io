// Import Firebase modules using ES modules syntax
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.0.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBfdciT6kEgZiL1asYqxZ-QPwTG30xte8U",
    authDomain: "js-app-d727f.firebaseapp.com",
    projectId: "js-app-d727f",
    storageBucket: "js-app-d727f.appspot.com",
    messagingSenderId: "1071620885629",
    appId: "1:1071620885629:web:ae0de9886e87a059ed3514",
    measurementId: "G-XHNMBMYZVV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a Firestore reference
const db = getFirestore(app);

const savebutton = document.getElementById("save")
savebutton.addEventListener("click", add_todo)

function toggleTheme() {
    const htmlElement = document.querySelector('html');
    const checkbox = document.getElementById('mySwitch');
    
    if (checkbox.checked) {
        htmlElement.setAttribute('data-bs-theme', 'dark');
    } else {
        htmlElement.setAttribute('data-bs-theme', 'white');
    }
}

// Add an event listener to the checkbox to toggle the theme
const checkbox = document.getElementById('mySwitch');
checkbox.addEventListener('change', toggleTheme);

const todos = [];
async function getFirestoreUsers() {
    try {
        const querySnapshot = await getDocs(collection(db, "todo"));
        
        querySnapshot.forEach((doc) => {
            todos.push({ id: doc.id, ...doc.data() })
        });
    } catch (error) {
        console.error("Error retrieving documents: ", error);
    }
    console.log(todos)
    show();
}

getFirestoreUsers();





function show() {
    const todoDiv = document.getElementById("todos")
    todoDiv.innerHTML = ""
    
    for (let i = 0; i < todos.length; i++) {
        let div1 = document.createElement("div")
        div1.className = "d-flex justify-content-between"
        
        let div2 = document.createElement("div")
        div2.className = "d-flex"
        div2.style.gap = "10px"
        
        
        let input1 = document.createElement("input")
        input1.type = "checkbox"
        input1.className = "form-check-input"
        input1.checked = todos[i].bool
        
        let p1 = document.createElement("p")
        console.log(todos[i].name)
        p1.innerHTML = todos[i].name
        
        div2.append(input1, p1);
        
        let btn1 = document.createElement("button")
        btn1.className = "btn btn-danger"
        btn1.innerHTML = "delete"
        btn1.addEventListener('click',deleteTodo(todos[i].id))

        div1.append(div2, btn1)
        todoDiv.append(div1)
    }
}

function deleteTodo(id) {
    console.log(id)
}
function add_todo() {
    console.log(1)
    // // Use the new Firestore syntax to add a document
    const name = document.getElementById("todo").value
    console.log(name)
    addDoc(collection(db, "todo"), {
        name,
        bool: false,
    })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
            todos.push({
                id:docRef.id,
                name,
                bool: false,
            })
            show()
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
    
    console.log(2)
}