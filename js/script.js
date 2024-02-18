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
let slideNumber = 1;

for(let i = 0; i < images.length; i++) {
    const img = images[i].image;
    const imgTitle = images[i].title;
    const imgText = images[i].text;



    sliderElement.innerHTML += `
    <figure class="mySlide w-100 h-100">
        <img class="img-fluid object-fit-cover w-100 h-100" src="./${img}">
        <div class="slide-text">
            <h2>${imgTitle}</h2>
            <p>${imgText}</p>
        </div>
    </figure>
    `;

    thumbnailsElement.innerHTML += `
    <div class="col-12 myThumbnail">
        <img src="./${img}" class="img-fluid object-fit-cover w-100 h-100" alt="...">
    </div>
    `;
}

// Mostra la prima slide all'avvio
showSlide(1)

// Aggiunta dell' event listener per il click sulle frecce del carosello

document.querySelector(".fa-circle-chevron-down").addEventListener("click", function() {

// Incrementa il numero della slide attiva se possibile, altrimenti torna alla prima slide
    if (slideNumber < images.length) {

        slideNumber++;
        showSlide(slideNumber);

    } else {

        slideNumber = 1;
        showSlide(slideNumber);

    }

        
});


document.querySelector(".fa-circle-chevron-up").addEventListener("click", function() {

// Decrementa il numero della slide attiva se possibile, altrimenti torna alla prima slide
    if (slideNumber > 1) {

        slideNumber--;
        showSlide(slideNumber);

    } else {

        slideNumber = images.length;
        showSlide(slideNumber);

    }

});

// Selezione delle thumbnail e aggiunto l'event listener per le stesse
const thumbnailsElements = document.querySelectorAll("#thumbnails .myThumbnail");

thumbnailsElements.forEach(((currentThumbnail, index) => {

    currentThumbnail.addEventListener("click", () => {

        slideNumber = index + 1;    

        showSlide(slideNumber);
    })

}));

// Funzione che permette la visualizzazione corretta delle slide e dei thumbnail
function showSlide(number) {

    const slides = document.querySelectorAll(".mySlide");
    slides.forEach(currentSlide => {
        currentSlide.classList.remove("active")
    }) 

    document.querySelector(`#slider .mySlide:nth-of-type(${number})`).classList.add("active");

    const thumbs = document.querySelectorAll(".myThumbnail");
    thumbs.forEach(thumb => {
        thumb.classList.remove("active");
    })

    document.querySelector(`.myThumbnail:nth-of-type(${number + 1})`).classList.add("active");
};

// Inizio della parte dove creo le funzioni per il funzionamento del carosello in base al click dei bottoni

// Bersaglio gli elementi HTML 
const playButton = document.querySelector("#play-button");
const pauseButton = document.querySelector("#pause-button");
const reverseButton = document.querySelector("#reverse-button");

// Inizializzo le variabili per i diversi autoplay
let autoplayInterval;
let autoplayEnabled = false;
let autoplayReverse = false;

// Inserito l'event listener al click dei bottoni per le corrispettive funzioni
playButton.addEventListener("click", startAutoplay);
pauseButton.addEventListener("click", stopAutoplay);
reverseButton.addEventListener("click", reverseAutoplay);

// Creo la funzione di autoplay del carosello che cambia slide ogni 3 secondi
function startAutoplay() {
    if (!autoplayEnabled) {
        autoplayInterval = setInterval(changeSlideAutomatically, 3000);
        autoplayEnabled = true;
    }
}


// Creo la funzione che permette di stoppare l'autoplay
function stopAutoplay() {
    clearInterval(autoplayInterval);
    autoplayEnabled = false;
}

// Funzione che permette di invertire l'ordine di visualizzazione delle slide
function reverseAutoplay() {
    autoplayReverse = !autoplayReverse;
}

// Funzione che permette di passare alla slide successiva corretta sia nel funzionamento regolare sia in quello inverso
function changeSlideAutomatically() {
    if (autoplayReverse) {
        if (slideNumber === 1) {
            slideNumber = images.length;
        } else {
            slideNumber--;
        }
    } else {
        if (slideNumber === images.length) {
            slideNumber = 1;
        } else {
            slideNumber++;
        }
    }
    showSlide(slideNumber);
}

// Richiamo la funzione per far partire l'autoplay al caricamento della pagina
startAutoplay();

 