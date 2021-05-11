const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photos = [];

// Unsplash API
const count = 12
const apiKey = ''
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Helper function to set attributes on DOM elementes
function setAttributes(element, attributes) {
    for (key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}

// Create elements for Links & photos, add to DOM
function displayPhotos() {
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

    }
}

// On load

getPhotos();