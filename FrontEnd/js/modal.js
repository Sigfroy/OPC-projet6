// //// VARIABLES

// // Définir le contenu HTML de la modal dans une chaîne de caractères
// const modalContainerHTML = `
// <aside id="modal-container">
//     <div class="overlay"></div>
//     <div id="modal">
//         <h2>Galerie photo</h2>
//         <div class="gallery-modal"></div>
//         <button id="modal-close"><i class="fa-solid fa-xmark"></i></button>
//         <button type="button" id="add-photo">Ajouter une photo</button>
//     </div>
//     <div id="modal-photo" style="display:none;">
//         <h2>Ajout photo</h2> 
//         <form enctype="multipart/form-data" method="POST" id="form-project">
//             <div id="photo-container">
//                 <i class="fa-regular fa-image" id="photo-image"></i>
//                 <label for="input-image" id="label-image">+ Ajouter une photo</label>
//                 <input type="file" name="input-image" accept="image/png, image/jpeg, image/jpg" id="input-image"
//                     style="display: none;">
//                 <p class="p-image">jpg,png : 4mo max</p>
//             </div>
//             <div class="modal-photo-input">
//                 <label for="modal-photo-title">Titre</label>
//                 <input type="text" name="title" id="modal-photo-title">
//             </div>
//             <div class="modal-photo-input" id="input-category">
//                 <label for="modal-photo-category">Catégorie</label>
//                 <select name="category" id="modal-photo-category">
//                     <option value="" selected>&nbsp;</option>
//                 </select>
//             </div>
//             <input type="submit" value="Valider" id="valide-photo">
//         </form>
//         <button id="modal-photo-close"><i class="fa-solid fa-xmark"></i></button>
//         <button id="modal-return"><i class="fa-solid fa-arrow-left"></i></button>
//     </div>
// </aside>
// `;

// // Insérer la modal directement dans le corps du document
// document.body.insertAdjacentHTML('beforeend', modalContainerHTML);

// // Sélection de l'élément bouton "Modifier"
// const modifyButton = document.getElementById('modify');

// // Ajoutez un écouteur au bouton de fermeture de la modale principale
// const modalClose = document.getElementById('modal-close');
// modalClose.addEventListener('click', () => {
//     const modalContainer = document.getElementById('modal-container');
//     modalContainer.style.display = 'none';
// });

// // Sélection des éléments nécessaires
// const modal = document.getElementById('modal');
// const modalPhoto = document.getElementById('modal-photo');
// const addPhotoButton = document.getElementById('add-photo');
// const modalReturnButton = document.getElementById('modal-return');

// // Sélection de l'élément bouton pour fermer toutes les modales
// const modalPhotoCloseButton = document.getElementById('modal-photo-close');

// const galleryModal = document.querySelector('.gallery-modal');

// // Sélection de l'élément de la liste déroulante des catégories
// const categorySelect = document.getElementById('modal-photo-category');

// // Sélection des éléments du formulaire
// const inputImage = document.getElementById('input-image');
// const photoTitleInput = document.getElementById('modal-photo-title');
// const photoCategorySelect = document.getElementById('modal-photo-category');
// const validateButton = document.getElementById('valide-photo');
// const form = document.getElementById('form-project');

// //// ECOUTEURS D'EVENEMENTS

// // Associer l'événement de clic à la fonction pour ouvrir la modal
// modifyButton.addEventListener('click', openModal);

// // Associer l'événement de clic au bouton "Ajouter une photo"
// addPhotoButton.addEventListener('click', () => {
//     // Masquer la première modale
//     modal.style.display = 'none';
//     // Afficher la deuxième modale
//     modalPhoto.style.display = 'block';
//     // Réinitialiser le champ de fichier
//     inputImage.value = '';
//     addPicture();
// });

// // Associer un événement de clic au bouton pour retourner à la première modale
// modalReturnButton.addEventListener('click', () => {
//     // Afficher la première modale
//     modal.style.display = 'block';
//     // Masquer la deuxième modale
//     modalPhoto.style.display = 'none';
// });

// // Associer un événement de clic au bouton pour fermer toutes les modales
// modalPhotoCloseButton.addEventListener('click', () => {
//     // Sélection de l'élément du conteneur modal
//     const modalContainer = document.getElementById('modal-container');
//     // Masquer le conteneur modal
//     modalContainer.style.display = 'none';
// });


// //// FONCTIONS

// // Fonction pour ouvrir la première modal
// function openModal() {
//     const modal = document.getElementById('modal');
//     modal.style.display = 'block';
//     allApiWorks();
// }

// // Fonction pour créer une figure pour chaque projet récupéré de l'API
// function createFigureModal(work) {
//     const figureModal = document.createElement('figure');
//     figureModal.setAttribute('data-id', work.id);

//     const imageModal = document.createElement('img');
//     imageModal.src = work.imageUrl;

//     const iDelete = document.createElement('i');
//     iDelete.className = 'fa-solid fa-trash-can delete-icone';

//     // Ajout d'un écouteur d'événement pour la suppression du projet
//     iDelete.addEventListener('click', () => {
//         console.log("Suppression du projet confirmée");
//         deleteProjectConfirm(work.id);
//     });

//     figureModal.appendChild(imageModal);
//     figureModal.appendChild(iDelete);

//     return figureModal;
// }


// // Fonction pour confirmer la suppression du projet sans fermer la modale
// function deleteProjectConfirm(projectId) {
//     // Supprimer le projet directement sans fermer la modale
//     console.log("Confirmation de suppression du projet avec l'ID : ", projectId);
//     deleteProject(projectId);
// }

// // Fonction pour supprimer le projet côté serveur
// async function deleteProject(projectId) {
//     const token = sessionStorage.getItem('Token'); // Récupération du jeton d'authentification depuis la session

//     try {
//         const response = await fetch(`http://localhost:5678/api/works/${projectId}`, {
//             // Envoi de la demande de suppression au backend via une requête fetch
//             method: 'DELETE',
//             headers: {
//                 Authorization: `Bearer ${token}`, // Ajout du jeton d'authentification dans les en-têtes de la requête
//             },
//         });

//         if (response.ok) {
//             // Si la suppression est réussie, supprimer l'élément correspondant de la galerie modal
//             const figureModalToDelete = document.querySelector(`.gallery-modal figure[data-id="${projectId}"]`);
//             if (figureModalToDelete) {
//                 figureModalToDelete.remove();
//             }
//             displayApiWorks();
//         } else {
//             console.error('La suppression du projet a échoué.');
//         }

//         // Appeler la fonction pour revenir à la première modal après la suppression du projet
//         returnToFirstModal();
//     } catch (error) {
//         console.error('Une erreur s\'est produite lors de la suppression du projet :', error);
//     }
    
// }

// // Attendre que la requête pour les projets soit résolue
// function allApiWorks() {
//     document.querySelector('.gallery-modal').innerHTML= "";
//     fetch('http://localhost:5678/api/works')
//         .then(response => response.json())
//         .then(data => {
//             // Boucler à travers chaque projet et créer une figure pour l'ajouter à la galerie modal
//             data.forEach(work => {
//                 const figureModal = createFigureModal(work);
//                 galleryModal.appendChild(figureModal);
//             });
//         })
//         .catch(error => console.error('Une erreur s\'est produite lors de la récupération des projets :', error));
//         console.log("allApiWorks");
// }


// // Fonction pour mettre à jour les options de la liste déroulante avec les catégories récupérées depuis l'API
// function updateCategories(categories) {
//     // Effacer les options existantes
//     categorySelect.innerHTML = '';

//     // Ajouter une option vide par défaut
//     const defaultOption = document.createElement('option');
//     defaultOption.value = '';
//     defaultOption.textContent = '';
//     categorySelect.appendChild(defaultOption);

//     // Ajouter les options des catégories
//     categories.forEach(category => {
//         const option = document.createElement('option');
//         option.value = category
//         option.value = category.id;
//         option.textContent = category.name;
//         categorySelect.appendChild(option);
//     });
// }

// // Effectuer une requête vers l'API pour récupérer les catégories
// fetch('http://localhost:5678/api/categories')
//     .then(response => response.json())
//     .then(data => {
//         // Mettre à jour les options de la liste déroulante avec les catégories récupérées
//         updateCategories(data);
//     })
//     .catch(error => console.error('Une erreur s\'est produite lors de la récupération des catégories :', error));


// // FORMULAIRE AJOUT DE PHOTO

// // Fonction pour gérer le changement d'image
// function handleImageChange() {
//     const selectedImage = inputImage.files[0]; // Récupérer l'image sélectionnée
//     const photoContainer = document.getElementById('photo-container'); // Sélection du conteneur de l'image

//     // Réinitialiser le contenu du conteneur de l'image
//     photoContainer.innerHTML = '';

//     if (selectedImage) {
//         // Créer un élément img pour prévisualiser l'image sélectionnée
//         const imgPreview = document.createElement('img');
//         imgPreview.src = URL.createObjectURL(selectedImage);
//         imgPreview.style.maxHeight = '100%';
//         imgPreview.style.width = 'auto';

//         // Ajouter l'image prévisualisée au conteneur de l'image
//         photoContainer.appendChild(imgPreview);
//     }

//     validateForm(); // Valider le formulaire après le changement de l'image
//     addPicture();
// }

// // Fonction pour valider le formulaire
// function validateForm() {
//     // Vérification si les champs requis sont remplis
//     if (
//         photoTitleInput.value.trim() !== '' && // Vérification du titre de la photo
//         photoCategorySelect.value !== '' && // Vérification de la catégorie sélectionnée
//         inputImage.value !== '' // Vérification si une image est sélectionnée
//     ) {
//         validateButton.style.backgroundColor = '#1d6154'; // Changement de couleur du bouton de validation si le formulaire est valide
//     } else {
//         validateButton.style.backgroundColor = ''; // Réinitialisation de la couleur du bouton de validation si le formulaire est invalide
//     }
// }

// // Ajouter les écouteurs d'événement pour chaque champ du formulaire
// photoTitleInput.addEventListener('input', validateForm);
// photoCategorySelect.addEventListener('input', validateForm);
// inputImage.addEventListener('change', handleImageChange);

// // Fonction pour réinitialiser le formulaire de la deuxième modal
// function resetModalPhoto() {
//     const photoContainer = document.getElementById('photo-container'); // Sélection du conteneur de l'image

//     // // Réinitialiser l'état du bouton pour ajouter une nouvelle photo
//     // photoContainer.innerHTML = `
//     //     <i class="fa-regular fa-image" id="photo-image"></i>
//     //     <label for="input-image" id="label-image">+ Ajouter une photo</label>
//     //     <input type="file" name="input-image" accept="image/png, image/jpeg, image/jpg" id="input-image" style="display: none;">
//     //     <p class="p-image">jpg,png : 4mo max</p>
//     // `;
//     // addPicture();

//     // Réinitialiser l'écouteur d'événement pour le champ de fichier
//     const newInputImage = document.getElementById('input-image');
//     newInputImage.addEventListener('change', handleImageChange);

//     // Réinitialiser les autres champs du formulaire
//     photoTitleInput.value = '';
//     photoCategorySelect.value = '';
//     validateForm(); // Valider le formulaire après la réinitialisation
//     photoContainer.innerHTML= '';
// }

// function addPicture() {
//     photoContainer.innerHTML = `
// <i class="fa-regular fa-image" id="photo-image"></i>
// <label for="input-image" id="label-image">+ Ajouter une photo</label>
// <input type="file" name="input-image" accept="image/png, image/jpeg, image/jpg" id="input-image" style="display: none;">
// <p class="p-image">jpg,png : 4mo max</p>
// `;

// }

// // Fonction pour créer un élément figure pour la galerie
// function createFigureElement(work) {
//     const figure = document.createElement('figure');
//     figure.setAttribute('data-id', work.id);

//     const img = document.createElement('img');
//     img.src = work.imageUrl;
//     figure.appendChild(img);

//     const figcaption = document.createElement('figcaption');
//     figcaption.innerText = work.title;
//     figure.appendChild(figcaption);

//     return figure;
// }

// // Fonction pour ajouter un projet côté serveur
// async function addProjectToBackend(event) {
//     const category = photoCategorySelect.value; // Récupération de la catégorie sélectionnée
//     const title = photoTitleInput.value; // Récupération du titre de la photo
//     const image = inputImage.files[0]; // Récupération du fichier d'image sélectionné
//     const token = sessionStorage.getItem('Token'); // Récupération du jeton d'authentification depuis la session

//     if (!title.trim() || !category || !image) {
//         // Vérification si tous les champs requis sont remplis
//         alert('Veuillez remplir tous les champs'); // Affichage d'une alerte si des champs sont manquants
//         return; // Arrêt de la fonction si des champs sont manquants
//     }

//     const formData = new FormData(); // Création d'un objet FormData pour envoyer les données

//     formData.append('title', title); // Ajout du titre au formulaire
//     formData.append('category', category); // Ajout de la catégorie au formulaire
//     formData.append('image', image); // Ajout de l'image au formulaire

//     try {
//         const response = await fetch('http://localhost:5678/api/works/', {
//             // Envoi des données au backend via une requête fetch
//             method: 'POST',
//             headers: {
//                 Authorization: `Bearer ${token}`, // Ajout du jeton d'authentification dans les en-têtes de la requête
//             },
//             body: formData, // Utilisation de l'objet FormData comme corps de la requête
//         });

//         if (response.ok) {
//             // Vérification si la réponse est OK
//             const responseData = await response.json(); // Conversion de la réponse en JSON

//             const figure = createFigureElement(responseData); // Création d'un élément figure pour afficher le projet ajouté
//             const gallery = document.querySelector('.gallery'); // Sélection de la galerie d'images
//             gallery.appendChild(figure); // Ajout de l'élément figure à la galerie d'images

//             const figureModal = createFigureModal(responseData); // Création d'un élément figure pour la modal
//             galleryModal.appendChild(figureModal); // Ajout de l'élément figure à la modal

//             const deleteIcon = figureModal.querySelector('.delete-icone'); // Sélection de l'icône de suppression
//             deleteIcon.addEventListener('click', () => {
//                 // Ajout d'un écouteur d'événement pour la suppression du projet
//                 deleteProjectConfirm(responseData.id); // Appel de la fonction pour confirmer la suppression du projet
//             });

//             returnToFirstModal(); // Afficher la première modal après avoir ajouté le projet
//             // resetForm();
//         }
//     } catch (error) {
//         console.error(error); // Affichage d'une erreur dans la console en cas de problème lors de l'ajout du projet
//     }
// }

// // Ajout de projet côté serveur
// form.addEventListener('submit', (event) => {
//     event.preventDefault(); // Empêcher le comportement par défaut du formulaire
//     addProjectToBackend(event); // Appel de la fonction pour ajouter le projet côté serveur
// });

// // Fonction pour retourner à la première modale
// function returnToFirstModal() {
//     const modalContainer = document.getElementById('modal-container');
//     const modal = document.getElementById('modal');
//     const modalPhoto = document.getElementById('modal-photo');
//     modalContainer.style.display = 'block'; // Afficher le conteneur de la modal
//     modal.style.display = 'block'; // Afficher la première modal
//     modalPhoto.style.display = 'none'; // Masquer la deuxième modal

//     resetModalPhoto(); // Réinitialiser le formulaire de la deuxième modal
// }









//// VARIABLES

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
                <img id="image-preview" style="max-width: 100%; max-height: 200px; display: none;" />
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

// Ajoutez un écouteur au bouton de fermeture de la modale principale
const modalClose = document.getElementById('modal-close');
modalClose.addEventListener('click', () => {
    const modalContainer = document.getElementById('modal-container');
    modalContainer.style.display = 'none';
});

// Sélection des éléments nécessaires
const modal = document.getElementById('modal');
const modalPhoto = document.getElementById('modal-photo');
const addPhotoButton = document.getElementById('add-photo');
const modalReturnButton = document.getElementById('modal-return');
const modalPhotoCloseButton = document.getElementById('modal-photo-close');
const galleryModal = document.querySelector('.gallery-modal');
const categorySelect = document.getElementById('modal-photo-category');
const inputImage = document.getElementById('input-image');
const photoTitleInput = document.getElementById('modal-photo-title');
const photoCategorySelect = document.getElementById('modal-photo-category');
const validateButton = document.getElementById('valide-photo');
const form = document.getElementById('form-project');
const imagePreview = document.getElementById('image-preview');

//// ECOUTEURS D'EVENEMENTS

// Associer l'événement de clic à la fonction pour ouvrir la modal
modifyButton.addEventListener('click', openModal);

// Associer l'événement de clic au bouton "Ajouter une photo"
addPhotoButton.addEventListener('click', () => {
    // Masquer la première modale
    modal.style.display = 'none';
    // Afficher la deuxième modale
    modalPhoto.style.display = 'block';
    // Réinitialiser le champ de fichier

    inputImage.value = '';
    resetModalPhoto(); // Réinitialiser la deuxième modal   
});

// Associer un événement de clic au bouton pour retourner à la première modale
modalReturnButton.addEventListener('click', () => {
    // Afficher la première modale
    modal.style.display = 'block';
    // Masquer la deuxième modale
    modalPhoto.style.display = 'none';
    resetModalPhoto(); // Réinitialiser la deuxième modal
});

// Associer un événement de clic au bouton pour fermer toutes les modales
modalPhotoCloseButton.addEventListener('click', () => {
    // Sélection de l'élément du conteneur modal
    const modalContainer = document.getElementById('modal-container');
    // Masquer le conteneur modal
    modalContainer.style.display = 'none';
    resetModalPhoto(); // Réinitialiser la deuxième modal
});

validateButton.addEventListener('click', () => {
    addProjectToBackend(); // Appel de la fonction pour ajouter le projet côté serveur
    handleSubmit();
});

// Ajouter un écouteur d'événement pour l'input file
inputImage.addEventListener('change', () => {
    const file = inputImage.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            imagePreview.src = e.target.result;
            imagePreview.style.display = 'block';
            document.getElementById('photo-image').style.display = 'none';
            document.getElementById('label-image').style.display = 'none';
        };
        reader.readAsDataURL(file);
    }
});

// Ajouter les écouteurs d'événement pour chaque champ du formulaire
photoTitleInput.addEventListener('input', validateForm);
photoCategorySelect.addEventListener('input', validateForm);
inputImage.addEventListener('change', validateForm);

//// FONCTIONS

// Fonction pour ouvrir la première modal
function openModal() {
    const modalContainer = document.getElementById('modal-container');
    const modal = document.getElementById('modal');
    modalContainer.style.display = 'block';
    modal.style.display = 'block';
    allApiWorks();
}

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
        console.log("Suppression du projet confirmée");
        deleteProjectConfirm(work.id);
    });

    figureModal.appendChild(imageModal);
    figureModal.appendChild(iDelete);

    return figureModal;
}

// Fonction pour confirmer la suppression du projet sans fermer la modale
function deleteProjectConfirm(projectId) {
    // Supprimer le projet directement sans fermer la modale
    console.log("Confirmation de suppression du projet avec l'ID : ", projectId);
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
            displayApiWorks();
        } else {
            console.error('La suppression du projet a échoué.');
        }

        // Appeler la fonction pour revenir à la première modal après la suppression du projet
        returnToFirstModal();
    } catch (error) {
        console.error('Une erreur s\'est produite lors de la suppression du projet :', error);
    }
}

// Attendre que la requête pour les projets soit résolue
function allApiWorks() {
    document.querySelector('.gallery-modal').innerHTML= "";
    fetch('http://localhost:5678/api/works')
        .then(response => response.json())
        .then(data => {
            // Boucler à travers chaque projet et créer une figure pour l'ajouter à la galerie modal
            data.forEach(work => {
                const figureModal = createFigureModal(work);
                galleryModal.appendChild(figureModal);
            });
        })
        .catch(error => console.error('Une erreur s\'est produite lors de la récupération des projets :', error));
        console.log("allApiWorks");
}

// Fonction pour mettre à jour les options de la liste déroulante avec les catégories récupérées depuis l'API
function updateCategories(categories) {
    // Effacer les options existantes
    categorySelect.innerHTML = '';

    // Ajouter une option vide par défaut
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    categorySelect.appendChild(defaultOption);

    // Ajouter les catégories récupérées
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.id;
        option.textContent = category.name;
        categorySelect.appendChild(option);
    });
}

// Récupérer les catégories depuis l'API et mettre à jour la liste déroulante
fetch('http://localhost:5678/api/categories')
    .then(response => response.json())
    .then(data => {
        updateCategories(data);
    })
    .catch(error => console.error('Une erreur s\'est produite lors de la récupération des catégories :', error));

// Fonction pour gérer la validation et la soumission du formulaire
function handleSubmit(event) {
    event.preventDefault();

    const selectedImage = inputImage.files[0];

    if (!selectedImage) {
// Créer un élément img pour prévisualiser l'image sélectionnée
        const imgPreview = document.createElement('img');
        imgPreview.src = URL.createObjectURL(selectedImage);
        imgPreview.style.maxHeight = '175px';
        imgPreview.style.width = 'auto';

        // Ajouter l'image prévisualisée au conteneur de l'image
        photoContainer.appendChild(imgPreview);
    }

    const title = photoTitleInput.value.trim();
    const category = photoCategorySelect.value.trim();

    // if (!title || !category) {
    //     alert("Veuillez remplir tous les champs.");
    //     return;
    // }

    const formData = new FormData();
    formData.append('image', selectedImage);
    formData.append('title', title);
    formData.append('category', category);

    const token = sessionStorage.getItem('Token');

    fetch('http://localhost:5678/api/works', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: formData,
    })
        .then(response => response.json())
        .then(data => {
            console.log('Projet ajouté avec succès :', data);
            // Réinitialiser le formulaire
            resetForm();
            returnToFirstModal();
            displayApiWorks();
        })
        .catch(error => console.error('Une erreur s\'est produite lors de l\'ajout du projet :', error));
}


// Fonction pour valider le formulaire et colorer le bouton valide-photo
function validateForm() {
    const selectedImage = inputImage.files[0]; // Récupérer l'image sélectionnée
    const title = photoTitleInput.value.trim(); // Récupérer le titre de la photo
    const category = photoCategorySelect.value.trim(); // Récupérer la catégorie sélectionnée

    // Vérifier si tous les champs sont remplis
    if (selectedImage && title && category) {
        // Changer la couleur du bouton valide-photo
        validateButton.style.backgroundColor = '#1d6154';
    } else {
        // Réinitialiser la couleur du bouton valide-photo
        validateButton.style.backgroundColor = '';
    }
}




// Fonction pour réinitialiser le formulaire
function resetForm() {
    inputImage.value = '';
    photoTitleInput.value = '';
    photoCategorySelect.value = '';
    imagePreview.src = '';
    imagePreview.style.display = 'none';
    document.getElementById('photo-image').style.display = 'block';
    document.getElementById('label-image').style.display = 'block';
}

// Fonction pour réinitialiser la deuxième modal
function resetModalPhoto() {
    resetForm();
}

// // Ajouter un écouteur d'événement pour la soumission du formulaire
// form.addEventListener('submit', handleSubmit);

function returnToFirstModal() {
    modal.style.display = 'block';
    modalPhoto.style.display = 'none';
}


// Fonction pour créer un élément figure pour la galerie
function createFigureElement(work) {
    const figure = document.createElement('figure');
    figure.setAttribute('data-id', work.id);

    const img = document.createElement('img');
    img.src = work.imageUrl;
    figure.appendChild(img);

    const figcaption = document.createElement('figcaption');
    figcaption.innerText = work.title;
    figure.appendChild(figcaption);

    return figure;
}

// Fonction pour ajouter un projet côté serveur
async function addProjectToBackend(event) {
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

            returnToFirstModal(); // Afficher la première modal après avoir ajouté le projet
            // resetForm();
        }
    } catch (error) {
        console.error(error); // Affichage d'une erreur dans la console en cas de problème lors de l'ajout du projet
    }
}

// Ajout de projet côté serveur
form.addEventListener('submit', (event) => {
    event.preventDefault(); // Empêcher le comportement par défaut du formulaire
});

// Fonction pour retourner à la première modale
function returnToFirstModal() {
    const modalContainer = document.getElementById('modal-container');
    const modal = document.getElementById('modal');
    const modalPhoto = document.getElementById('modal-photo');
    modalContainer.style.display = 'block'; // Afficher le conteneur de la modal
    modal.style.display = 'block'; // Afficher la première modal
    modalPhoto.style.display = 'none'; // Masquer la deuxième modal

    resetModalPhoto(); // Réinitialiser le formulaire de la deuxième modal
}