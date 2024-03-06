import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form')

form.addEventListener('submit', onSubmit)

function onSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.target);

    const delayMs = parseInt(formData.get("delay"));
    
    const state = formData.get("state"); 

    const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        if (state === 'fulfilled') {
            resolve(`Fulfilled promise in ${delayMs}ms`);
        } else {
            reject(`Rejected promise in ${delayMs}ms`);
        }
    }, delayMs);
    });

    promise.then(success => iziToast.success({ message: success, position: 'topCenter' })).catch(error => iziToast.error({ message: error, position: 'topCenter' }))
    
    form.reset()
}


