// Add your query for the sign now button here
const signNowButton = document.getElementById("sign-now-button")

const addSignature = (person) => {
    // Write your code to manipulate the DOM here

    let item = document.createElement("p")
    item.textContent = "🖊️ " + person.name + " from " + person.town + " supports this."

    const signature = document.querySelector(".signatures")
    signature.appendChild(item)
    
    document.getElementById("name-input").value = "";
    document.getElementById("town-input").value = "";
    document.getElementById("email-input").value = "";

    let counter = document.getElementById("counter")
    counter.remove()
    count += 1

    newCounter = document.createElement("p")
    newCounter.id = "counter"
    newCounter.textContent = `🖊️ ${count} people have signed this petition and support this cause.`

    signature.appendChild(newCounter)
    
}

const toggleModal = (person) => {
    const modal = document.getElementById("thanks-modal")
    const modalContent = document.getElementById("thanks-modal-content")
    const modalImage = document.getElementById("modal-img")

    modal.style.display = "flex";
    modalContent.textContent = "Thank you so much " + person.name + ". The pigs will be sure to visit " + person.town + "! 🐽🛸"

    let scaleFactor = 1;
    
    const scaleImage = () => {
        if (scaleFactor === 1){
            scaleFactor = 0.8
        }
        else{
            scaleFactor = 1
        }
        modalImage.style.transform = `scale(${scaleFactor})`
    }
    
    let intervalId = setInterval(scaleImage, 500)

    let hue = 0;

    const animateImageFilter = () => {
        hue += 2
        if (hue >= 360) {
            hue = 0
        }
        modalImage.style.filter = `hue-rotate(${hue}deg)`
        requestAnimationFrame(animateImageFilter)
    }
    animateImageFilter();
    
    setTimeout(()=>{
        modal.style.display="none"
        clearInterval(intervalId)
    }, 5000)

   
}

const validateForm = (event) => {
    event.preventDefault()
    let containErrors = false;

    let petitionInputs = document.getElementById("sign-petition").elements;

    let person = {
        name: petitionInputs[0].value,
        town: petitionInputs[1].value,
        email: petitionInputs[2].value,
    }

    if(person.town.length < 1 || person.name.length < 1) {
        containErrors = true;
    }

    if(containErrors === false){
        signNowButton.classList.remove('disabled')
        toggleModal(person);
        addSignature(person);
    }
    else{
        signNowButton.classList.add('disabled')
    }
}

signNowButton.addEventListener("click", validateForm)

let count = 3;

let button = document.getElementById("modal-button")

let closeModal = () => {
    const modal = document.getElementById("thanks-modal")
    modal.style.display = "none"
}
button.addEventListener('click', closeModal)
