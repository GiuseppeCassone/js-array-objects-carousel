// Dato un array di oggetti letterali con:
//  - url dell’immagine
//  - titolo
//  - descrizione
// Creare un carosello come nella foto allegata.
// Milestone 0:
// Come nel primo carosello realizzato, focalizziamoci prima sulla creazione del markup statico: costruiamo il container e inseriamo l'immagine grande in modo da poter stilare lo slider.
// Milestone 1:
// Ora rimuoviamo i contenuti statici e usiamo l’array di oggetti letterali per popolare dinamicamente il carosello.
// Al click dell'utente sulle frecce verso sinistra o destra, la nuova immagine attiva diventerà visibile e dovremo aggiungervi titolo e testo.
// Milestone 2:
// Aggiungere il ciclo infinito del carosello. Ovvero se la miniatura attiva è la prima e l'utente clicca la freccia verso destra, la miniatura che deve attivarsi sarà l'ultima e viceversa per l'ultima miniatura se l'utente clicca la freccia verso sinistra.
// BONUS 1:
// Aggiungere le thumbnails (sottoforma di miniatura) ed al click attivare l’immagine corrispondente.
// BONUS 2:
// Aggiungere funzionalità di autoplay: dopo un certo periodo di tempo (3 secondi) l’immagine attiva dovrà cambiare alla successiva in automatico.
// BONUS 3:
// Aggiungere bottoni di start / stop e di inversione del meccanismo di autoplay.

const images = [
    {
        image: 'img/01.webp',
        title: 'Marvel\'s Spiderman Miles Morales',
        text: 'Experience the rise of Miles Morales as the new hero masters incredible, explosive new powers to become his own Spider-Man.',
    }, 
    {
        image: 'img/02.webp',
        title: 'Ratchet & Clank: Rift Apart',
        text: 'Go dimension-hopping with Ratchet and Clank as they take on an evil emperor from another reality.',
    }, 
    {
        image: 'img/03.webp',
        title: 'Fortnite',
        text: "Grab all of your friends and drop into Epic Games Fortnite, a massive 100 - player face - off that combines looting, crafting, shootouts and chaos.",
    }, 
    {
        image: 'img/04.webp',
        title: 'Stray',
        text: 'Lost, injured and alone, a stray cat must untangle an ancient mystery to escape a long-forgotten city',
    }, 
    {
        image: 'img/05.webp',
        title: "Marvel's Avengers",
        text: 'Marvel\'s Avengers is an epic, third-person, action-adventure game that combines an original, cinematic story with single-player and co-operative gameplay.',
    }
];

const sliderElement = document.getElementById(`slider`);
const thumbnailsElement = document.getElementById(`thumbnails`);

for(let i = 0; i < images.length; i++) {
    const img = images[i].image;
    const imgTitle = images[i].title;
    const imgText = images[i].text;



    sliderElement.innerHTML += `
    <figure class="mySlide w-100 h-100">
        <img class="img-fluid object-fit-cover w-100 h-100" src="./${img}">
        <h2>${imgTitle}</h2>
        <p>${imgText}</p>
    </figure>
    `;

    thumbnailsElement.innerHTML += `
    <div class="col-12">
        <img src="./${img}" class="img-fluid object-fit-cover w-100 h-100" alt="...">
    </div>
    `;
}


document.querySelector(".mySlide:nth-of-type(1)").classList.add("active");

let slideNumber = 1;

document.querySelector(".fa-circle-chevron-down").addEventListener("click", function() {


    if (slideNumber < images.length) {

        document.querySelector(`#slider .mySlide:nth-of-type(${slideNumber})`).classList.remove("active");
        slideNumber++;
        document.querySelector(`#slider .mySlide:nth-of-type(${slideNumber})`).classList.add("active");

        console.log(slideNumber);

    } else {
 
        document.querySelector(`#slider .mySlide:nth-of-type(${slideNumber})`).classList.remove("active");
        slideNumber = 1;
        document.querySelector(`#slider .mySlide:nth-of-type(${slideNumber})`).classList.add("active");

    }

        
});


document.querySelector(".fa-circle-chevron-up").addEventListener("click", function() {

    if (slideNumber > 1) {

        document.querySelector(`#slider .mySlide:nth-of-type(${slideNumber})`).classList.remove("active");
        slideNumber--;
        document.querySelector(`#slider .mySlide:nth-of-type(${slideNumber})`).classList.add("active");

        console.log(slideNumber);

    } else {

        document.querySelector(`#slider .mySlide:nth-of-type(${slideNumber})`).classList.remove("active");
        slideNumber = images.length;
        document.querySelector(`#slider .mySlide:nth-of-type(${slideNumber})`).classList.add("active");

    }

});
