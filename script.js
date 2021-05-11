const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photos = [];

// Unsplash API
const count = 25
const apiKey = config.apiKeyHidden;
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true
    }
}

// Helper function to set attributes on DOM elementes
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}

// Create elements for Links & photos, add to DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photos.length;
    photos.forEach((photo) => {
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        });
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });
        img.addEventListener('load', imageLoaded);
        item.appendChild(img);
        imageContainer.appendChild(item);
    });

}

// Get photos from API
async function getPhotos() {
    try {
        const response = await fetch(apiURL);
        photos = await response.json();
        displayPhotos();
    } catch (error) {
        throw new Error('Something went wrong')
    }
}

// When scrolling to the bottom, load more photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false
        getPhotos()
    }
})


// On load
getPhotos();