// Définir le contenu HTML de la modal dans une chaîne de caractères
const modalContainerHTML = `
<aside id="modal-container">
    <div class="overlay"></div>
    <div id="modal">
        <h2>Galerie photo</h2>
        <div class="gallery-modal"></div>
        <button id="modal-close"><i class="fa-solid fa-xmark"></i></button>
        <button type="button" id="add-photo">Ajouter une photo</button>
    </div>
    <div id="modal-photo">
        <h2>Ajout photo</h2> 
        <form enctype="multipart/form-data" method="POST" id="form-project">
            <div id="photo-container">
                <i class="fa-regular fa-image" id="photo-image"></i>
                <label for="input-image" id="label-image">+ Ajouter une photo</label>
                <input type="file" name="input-image" accept="image/png, image/jpeg, image/jpg" id="input-image"
                    style="display: none;">
                <p class="p-image">jpg,png : 4mo max</p>
            </div>
            <div class="modal-photo-input">
                <label for="modal-photo-title">Titre</label>
                <input type="text" name="title" id="modal-photo-title">
            </div>
            <div class="modal-photo-input" id="input-category">
                <label for="modal-photo-category">Catégorie</label>
                <select name="category" id="modal-photo-category">
                    <option value="" selected>&nbsp;</option>
                </select>
            </div>
            <input type="submit" value="Valider" id="valide-photo">
        </form>
        <button id="modal-photo-close"><i class="fa-solid fa-xmark"></i></button>
        <button id="modal-return"><i class="fa-solid fa-arrow-left"></i></button>
    </div>
</aside>
`;

// Insérer la modal directement dans le corps du document
document.body.insertAdjacentHTML('beforeend', modalContainerHTML);

// Sélection de l'élément bouton "Modifier"
const modifyButton = document.getElementById('modify');

// Associer l'événement de clic à la fonction pour ouvrir la modal
modifyButton.addEventListener('click', openModal);

// Fonction pour ouvrir la première modal
function openModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'block';
}

// Attendre que le contenu de la modal soit inséré dans le document
document.addEventListener('DOMContentLoaded', function() {
    // Sélection de l'élément bouton "Ajouter une photo"
    const addPhotoButton = document.getElementById('add-photo');

    // Sélection de la première modale et de la deuxième modale
    const modal = document.getElementById('modal');
    const modalPhoto = document.getElementById('modal-photo');

    // Associer un événement de clic au bouton "Ajouter une photo"
    addPhotoButton.addEventListener('click', () => {
        // Masquer la première modale
        modal.style.display = 'none';
        // Afficher la deuxième modale
        modalPhoto.style.display = 'block';
    });

    // Sélection de l'élément bouton pour fermer toutes les modales
    const modalPhotoCloseButton = document.getElementById('modal-photo-close');
    // Associer un événement de clic au bouton pour fermer toutes les modales
    modalPhotoCloseButton.addEventListener('click', closeAllModals);

    // Sélection de l'élément bouton pour retourner à la première modale
    const modalReturnButton = document.getElementById('modal-return');
    // Associer un événement de clic au bouton pour retourner à la première modale
    modalReturnButton.addEventListener('click', returnToFirstModal);
});

/// Fonction pour fermer toutes les modales
function closeAllModals() {
    const modalContainer = document.getElementById('modal-container');
    modalContainer.style.display = 'none'; // Masquer le conteneur de la modal
}

// Sélection de l'élément bouton pour retourner à la première modale
const modalReturnButton = document.getElementById('modal-return');
// Associer un événement de clic au bouton pour retourner à la première modale
modalReturnButton.addEventListener('click', returnToFirstModal);

/// Fonction pour retourner à la première modale
function returnToFirstModal() {
    const modalContainer = document.getElementById('modal-container');
    const modal = document.getElementById('modal');
    const modalPhoto = document.getElementById('modal-photo');
    modalContainer.style.display = 'block'; // Afficher le conteneur de la modal
    modal.style.display = 'block'; // Afficher la première modal
    modalPhoto.style.display = 'none'; // Masquer la deuxième modal
}



let apiWorksModal = fetch('http://localhost:5678/api/works');
const galleryModal = document.querySelector('.gallery-modal');

// Fonction pour créer une figure pour chaque projet récupéré de l'API
function createFigureModal(work) {
    const figureModal = document.createElement('figure');
    figureModal.setAttribute('data-id', work.id);

    const imageModal = document.createElement('img');
    imageModal.src = work.imageUrl;

    const iDelete = document.createElement('i');
    iDelete.className = 'fa-solid fa-trash-can delete-icone';

    figureModal.appendChild(imageModal);
    figureModal.appendChild(iDelete);

    return figureModal;
}

// Attendre que la requête pour les projets soit résolue
apiWorksModal.then(response => response.json())
    .then(data => {
        // Boucler à travers chaque projet et créer une figure pour l'ajouter à la galerie modal
        data.forEach(work => {
            const figureModal = createFigureModal(work);
            galleryModal.appendChild(figureModal);
        });
    })
    .catch(error => console.error('Une erreur s\'est produite lors de la récupération des projets :', error));

// Sélection de l'élément bouton "Ajouter une photo"
const addPhotoButton = document.getElementById('add-photo');

// Sélection de la première modale et de la deuxième modale
const modal = document.getElementById('modal');
const modalPhoto = document.getElementById('modal-photo');

// Sélection de l'élément de la liste déroulante des catégories
const categorySelect = document.getElementById('modal-photo-category');


// Fonction pour mettre à jour les options de la liste déroulante avec les catégories récupérées depuis l'API
function updateCategories(categories) {
    // Effacer les options existantes
    categorySelect.innerHTML = '';

    // Ajouter une option vide par défaut
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = '';
    categorySelect.appendChild(defaultOption);

    // Ajouter les options des catégories
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.id;
        option.textContent = category.name;
        categorySelect.appendChild(option);
    });
}

// Effectuer une requête vers l'API pour récupérer les catégories
fetch('http://localhost:5678/api/categories')
    .then(response => response.json())
    .then(data => {
        // Mettre à jour les options de la liste déroulante avec les catégories récupérées
        updateCategories(data);
    })
    .catch(error => console.error('Une erreur s\'est produite lors de la récupération des catégories :', error));


// FORMULAIRE AJOUT DE PHOTO

// Sélection des éléments du formulaire
const inputImage = document.getElementById('input-image');
const photoContainer = document.getElementById('photo-container');
const modalPhotoCategory = document.getElementById('modal-photo-category');

// Fonction pour réinitialiser l'image sélectionnée
function resetImage() {
    inputImage.value = ''; // Effacer la valeur de l'input file
    photoContainer.innerHTML = ''; // Effacer le contenu du conteneur de l'image
}

// Écouter les changements dans l'input file
inputImage.addEventListener('change', function () {
    const selectedImage = inputImage.files[0]; // Récupérer l'image sélectionnée

    // Effacer le contenu du conteneur de l'image
    photoContainer.innerHTML = '';

    if (selectedImage) {
        // Créer un élément img pour prévisualiser l'image sélectionnée
        const imgPreview = document.createElement('img');
        imgPreview.src = URL.createObjectURL(selectedImage);
        imgPreview.style.maxHeight = '100%';
        imgPreview.style.width = 'auto';
        
        // Ajouter l'image prévisualisée au conteneur de l'image
        photoContainer.appendChild(imgPreview);
    }
});

// Récupérer les catégories depuis l'API et les ajouter au formulaire
fetch('http://localhost:5678/api/categories')
    .then((response) => response.json())
    .then((categories) => {
        // Parcourir les catégories et les ajouter au menu déroulant
        categories.forEach((category) => {
            const option = document.createElement('option');
            option.value = category.id;
            option.textContent = category.name;
            modalPhotoCategory.appendChild(option);
        });
    })
    .catch((error) => {
        console.error('Une erreur s\'est produite lors de la récupération des catégories :', error);
    });















// // Sélection de l'élément bouton "Modifier"
// const modifyButton = document.getElementById('modify');

// // Fonction pour ouvrir la modal lorsque le bouton "Modifier" est cliqué
// function openModal() {
//     modalContainer.classList.add('active');
//     // Afficher le contenu de la modal appropriée ici, par exemple : galleryModal.style.display = 'block';
//     // Assurez-vous que le contenu de la modal appropriée est affiché lorsque la modal est ouverte
// }

// // Associer l'événement de clic à la fonction pour ouvrir la modal
// modifyButton.addEventListener('click', openModal);

// // Sélection des éléments HTML pertinents
// const modalContainer = document.getElementById('modal-container');
// const overlay = document.querySelector('.overlay');
// const galleryModal = document.querySelector('.gallery-modal');
// const addPhotoButton = document.getElementById('add-photo');
// const modalCloseButton = document.getElementById('modal-close');
// const modalPhoto = document.getElementById('modal-photo');
// const modalPhotoCloseButton = document.getElementById('modal-photo-close');
// const modalReturnButton = document.getElementById('modal-return');

// // Fonction pour ouvrir la galerie photo
// function openGalleryModal() {
//     modalContainer.classList.add('active');
//     galleryModal.style.display = 'block';
// }

// // Fonction pour fermer la galerie photo
// function closeGalleryModal() {
//     modalContainer.classList.remove('active');
//     galleryModal.style.display = 'none';
// }

// // Fonction pour ouvrir la modale d'ajout de photo
// function openAddPhotoModal() {
//     galleryModal.style.display = 'none';
//     modalPhoto.style.display = 'block';
// }

// // Fonction pour fermer la modale d'ajout de photo
// function closeAddPhotoModal() {
//     modalPhoto.style.display = 'none';
//     galleryModal.style.display = 'block';
// }

// // Événement pour ouvrir la galerie photo lors du clic sur le bouton "Ajouter une photo"
// addPhotoButton.addEventListener('click', openGalleryModal);

// // Événement pour fermer la galerie photo lors du clic sur le bouton de fermeture de la modale
// modalCloseButton.addEventListener('click', closeGalleryModal);

// // Événement pour ouvrir la modale d'ajout de photo lors du clic sur le bouton "Ajouter une photo"
// addPhotoButton.addEventListener('click', openAddPhotoModal);

// // Événement pour fermer la modale d'ajout de photo lors du clic sur le bouton de fermeture de la modale
// modalPhotoCloseButton.addEventListener('click', closeAddPhotoModal);

// // Événement pour retourner à la galerie depuis la modale d'ajout de photo
// modalReturnButton.addEventListener('click', () => {
//     closeAddPhotoModal();
//     openGalleryModal();
// });

// // Événement pour fermer la modale en cliquant sur l'overlay
// overlay.addEventListener('click', () => {
//     closeGalleryModal();
//     closeAddPhotoModal();
// });


// // Insérer la balise <aside> directement après le body
// document.body.insertAdjacentHTML('afterbegin', modalContainerHTML);





// // GESTION D'AFFICHAGE DES MODALES

// const modalContainer = document.getElementById('modal-container');
// const buttonModify = document.getElementById('modify');
// const modalPhoto = document.getElementById('modal-photo');


// buttonModify.addEventListener('click', () => {
//     modalContainer.style.display = 'block';
//     modalPhoto.style.display = 'none';
//     modal.style.display = 'flex';
// });

// // FERMETURE ET OUVERTURE MODALES

// const closeModal = document.getElementById('modal-close');
// const overlay = document.querySelector('.overlay');
// const addPhoto = document.getElementById('add-photo');
// const modal = document.getElementById('modal');
// const closeModalPhoto = document.getElementById('modal-photo-close');
// const modalReturn = document.getElementById('modal-return');


// closeModal.addEventListener('click', () => {
//     modalContainer.style.display = 'none';
// });


// overlay.addEventListener('click', () => {
//     modalContainer.style.display = 'none';
//     resetImage();
//     title.value = '';
//     category.value = '';
// });


// addPhoto.addEventListener('click', () => {
//     modal.style.display = 'none';
//     modalPhoto.style.display = 'flex';
// });


// closeModalPhoto.addEventListener('click', () => {
//     modalContainer.style.display = 'none';
//     resetImage();
//     title.value = '';
//     category.value = '';
// });


// modalReturn.addEventListener('click', () => {
//     modalPhoto.style.display = 'none';
//     modal.style.display = 'flex';
//     resetImage();
//     title.value = '';
//     category.value = '';
// });



// // VALIDATION FORMULAIRE

// const buttonValidePhoto = document.getElementById('valide-photo');
// const modalPhotoTitle = document.getElementById('modal-photo-title');
// const modalPhotoCategory = document.getElementById('modal-photo-category');
// const formulaire = document.getElementById('form-project');


// function formValide() {
//     if (
//         modalPhotoTitle.value.trim() !== '' &&
//         modalPhotoCategory.value !== '' &&
//         inputImage.value !== ''
//     ) {
//         buttonValidePhoto.style.backgroundColor = '#1D6154';
//     } else {
//         buttonValidePhoto.style.backgroundColor = '';
//     }
// }


// formulaire.addEventListener('input', formValide);

// // AJOUT DE PROJET AU BACKEND

// const category = document.getElementById('modal-photo-category');
// const title = document.getElementById('modal-photo-title');
// const image = document.querySelector('input[type=file]');
// const token = sessionStorage.getItem('Token');


// formulaire.addEventListener('submit', (event) => {
//     event.preventDefault();

//     addproject(event, token);
// });


// async function addproject(event, token) {
//     event.preventDefault();

//     if (!title.value.trim() || !category.value || !image.files[0]) {
//         alert('Veuillez remplir tous les champs');
//         return;
//     }

//     const formData = new FormData();
//     formData.append('title', title.value);
//     formData.append('category', category.value);
//     formData.append('image', image.files[0]);

//     try {
//         const response = await fetch('http://localhost:5678/api/works/', {
//             method: 'POST',
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//             body: formData,
//         });

//         if (response.ok) {
//             const responseData = await response.json();

//             const figure = createFigureElement(responseData);
//             const gallery = document.querySelector('.gallery');
//             gallery.appendChild(figure);

//             const figureModal = createFigureModal(responseData);
//             galleryModal.appendChild(figureModal);

//             const deleteIcon = figureModal.querySelector('.delete-icone');
//             deleteIcon.addEventListener('click', () => {
//                 deleteProjectConfirm(responseData.id);
//             });

//             modal.style.display = 'flex';
//             modalPhoto.style.display = 'none';

//             resetImage();
//             title.value = '';
//             category.value = '';
//             buttonValidePhoto.style.backgroundColor = '';

//             window.alert('Projet ajouté avec succès');
//         }
//     } catch (error) {
//         console.error(error);
//     }
// }

// // SUPPRESSION DE PROJET

// async function deleteProject(id, token) {
//     try {
//         const response = await fetch(`http://localhost:5678/api/works/${id}`, {
//             method: 'DELETE',
//             headers: {
//                 accept: '*/*',
//                 Authorization: `Bearer ${token}`,
//             },
//         });

//         if (response.ok) {
//             window.alert('Projet supprimé avec succès');
//         }
//     } catch (error) {
//         console.error('Erreur lors de la suppression du projet :', error);
//     }
// }


// async function deleteProjectConfirm(id) {
//     const confirmation = confirm(
//         'Êtes-vous sûr de vouloir supprimer ce projet ?'
//     );
//     if (confirmation) {
//         await deleteProject(id, token);

//         const figureToDelete = document.querySelector(`[data-id="${id}"]`);
//         if (figureToDelete) {
//             figureToDelete.remove();
//         }

//         const figureModalToDelete = document.querySelector(
//             `.gallery-modal [data-id="${id}"]`
//         );
//         if (figureModalToDelete) {
//             figureModalToDelete.remove();
//         }
//     }
// }