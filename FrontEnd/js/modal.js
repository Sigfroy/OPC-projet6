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
    <div id="modal-photo" style="display:none;">
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



const apiWorksModal = fetch('http://localhost:5678/api/works');
const galleryModal = document.querySelector('.gallery-modal');

// Fonction pour créer une figure pour chaque projet récupéré de l'API
function createFigureModal(work) {
    const figureModal = document.createElement('figure');
    figureModal.setAttribute('data-id', work.id);

    const imageModal = document.createElement('img');
    imageModal.src = work.imageUrl;

    const iDelete = document.createElement('i');
    iDelete.className = 'fa-solid fa-trash-can delete-icone';

     // Ajout d'un écouteur d'événement pour la suppression du projet
    iDelete.addEventListener('click', () => {
        deleteProjectConfirm(work.id);
    });

    figureModal.appendChild(imageModal);
    figureModal.appendChild(iDelete);

    return figureModal;
}

// Fonction pour confirmer la suppression du projet (sans afficher la boîte de dialogue)
function deleteProjectConfirm(projectId) {
    // Supprimer le projet directement sans afficher de boîte de dialogue de confirmation
    deleteProject(projectId);
}


// Fonction pour supprimer le projet côté serveur
async function deleteProject(projectId) {
    const token = sessionStorage.getItem('Token'); // Récupération du jeton d'authentification depuis la session

    try {
        const response = await fetch(`http://localhost:5678/api/works/${projectId}`, {
            // Envoi de la demande de suppression au backend via une requête fetch
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`, // Ajout du jeton d'authentification dans les en-têtes de la requête
            },
        });

        if (response.ok) {
            // Si la suppression est réussie, supprimer l'élément correspondant de la galerie modal
            const figureModalToDelete = document.querySelector(`.gallery-modal figure[data-id="${projectId}"]`);
            if (figureModalToDelete) {
                figureModalToDelete.remove();
            }
        } else {
            console.error('La suppression du projet a échoué.');
        }
    } catch (error) {
        console.error('Une erreur s\'est produite lors de la suppression du projet :', error);
    }
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
        option.value = category
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


// Validation du formulaire
const validateButton = document.getElementById('valide-photo'); // Sélection du bouton de validation
const photoTitleInput = document.getElementById('modal-photo-title'); // Sélection de l'entrée de titre de photo
const photoCategorySelect = document.getElementById('modal-photo-category'); // Sélection de la liste déroulante de catégories
const form = document.getElementById('form-project'); // Sélection du formulaire

function validateForm() {
    // Vérification si les champs requis sont remplis
    if (
        photoTitleInput.value.trim() !== '' && // Vérification du titre de la photo
        photoCategorySelect.value !== '' && // Vérification de la catégorie sélectionnée
        inputImage.value !== '' // Vérification si une image est sélectionnée
    ) {
        validateButton.style.backgroundColor = '#1D6154'; // Changement de couleur du bouton de validation si le formulaire est valide
    } else {
        validateButton.style.backgroundColor = ''; // Réinitialisation de la couleur du bouton de validation si le formulaire est invalide
    }
}

form.addEventListener('input', validateForm); // Écouteur d'événement pour vérifier le formulaire lors de la saisie

/// Ajout de projet côté serveur
form.addEventListener('submit', (event) => {
    event.preventDefault(); // Empêcher le comportement par défaut du formulaire

    addProjectToBackend(event); // Appel de la fonction pour ajouter le projet côté serveur
});

async function addProjectToBackend(event) {
    event.preventDefault(); // Empêcher le comportement par défaut du formulaire

    const category = photoCategorySelect.value; // Récupération de la catégorie sélectionnée
    const title = photoTitleInput.value; // Récupération du titre de la photo
    const image = inputImage.files[0]; // Récupération du fichier d'image sélectionné
    const token = sessionStorage.getItem('Token'); // Récupération du jeton d'authentification depuis la session

    if (!title.trim() || !category || !image) {
        // Vérification si tous les champs requis sont remplis
        alert('Veuillez remplir tous les champs'); // Affichage d'une alerte si des champs sont manquants
        return; // Arrêt de la fonction si des champs sont manquants
    }

    const formData = new FormData(); // Création d'un objet FormData pour envoyer les données

    formData.append('title', title); // Ajout du titre au formulaire
    formData.append('category', category); // Ajout de la catégorie au formulaire
    formData.append('image', image); // Ajout de l'image au formulaire

    try {
        const response = await fetch('http://localhost:5678/api/works/', {
            // Envoi des données au backend via une requête fetch
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`, // Ajout du jeton d'authentification dans les en-têtes de la requête
            },
            body: formData, // Utilisation de l'objet FormData comme corps de la requête
        });

        if (response.ok) {
            // Vérification si la réponse est OK
            const responseData = await response.json(); // Conversion de la réponse en JSON

            const figure = createFigureElement(responseData); // Création d'un élément figure pour afficher le projet ajouté
            const gallery = document.querySelector('.gallery'); // Sélection de la galerie d'images
            gallery.appendChild(figure); // Ajout de l'élément figure à la galerie d'images

            const figureModal = createFigureModal(responseData); // Création d'un élément figure pour la modal
            galleryModal.appendChild(figureModal); // Ajout de l'élément figure à la modal

            const deleteIcon = figureModal.querySelector('.delete-icone'); // Sélection de l'icône de suppression
            deleteIcon.addEventListener('click', () => {
                // Ajout d'un écouteur d'événement pour la suppression du projet
                deleteProjectConfirm(responseData.id); // Appel de la fonction pour confirmer la suppression du projet
            });

            modal.style.display = 'block'; // Affichage de la modal
            modalPhoto.style.display = 'none'; // Masquage de la modal d'ajout de photo

            returnToFirstModal(); // Afficher la première modal après avoir ajouté le projet
        }
    } catch (error) {
        console.error(error); // Affichage d'une erreur dans la console en cas de problème lors de l'ajout du projet
    }
}

// Fonction pour fermer toutes les modales
function closeModal() {
    const modalContainer = document.getElementById('modal-container');
    modalContainer.style.display = 'none'; // Masquer le conteneur de la modal
}

// Fonction pour ouvrir la première modal
function openFirstModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'block';
}







// // Sélection du formulaire
// const form = document.getElementById('form-project');

// // Écouter l'événement de soumission du formulaire
// form.addEventListener('submit', function(event) {
//     // Empêcher le comportement par défaut du formulaire
//     event.preventDefault();

//     // Récupérer les données du formulaire
//     const title = document.getElementById('modal-photo-title').value;
//     const category = document.getElementById('modal-photo-category').value;
//     const image = inputImage.files[0]; // Récupérer l'image sélectionnée

//     // Créer un objet FormData pour envoyer les données
//     const formData = new FormData();
//     formData.append('title', title);
//     formData.append('category', category);
//     formData.append('image', image);

//     // Envoyer les données au backend
//     fetch('http://localhost:5678/api/works', {
//         method: 'POST',
//         body: formData
//     })
//     .then(response => {
//         if (!response.ok) {
//             throw new Error('Erreur lors de l\'ajout de la photo');
//         }
//         // Recharger la liste des projets si l'ajout est réussi
//         return response.json();
//     })
//     .then(data => {
//         // Réussite : recharger la liste des projets pour inclure le nouveau projet ajouté
//         // Vous pouvez implémenter cette fonctionnalité ici
//         console.log('Ajout réussi:', data);
//         // Optionnel : afficher un message de succès à l'utilisateur
//     })
//     .catch(error => {
//         // Erreur : afficher un message d'erreur à l'utilisateur
//         console.error('Erreur lors de l\'ajout de la photo:', error.message);
//         // Optionnel : afficher un message d'erreur à l'utilisateur
//     });
// });





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