/* Gestion de la modale d'ajout de nouveaux projets sur le site de l'architecte */

// Requête à l'API pour obtenir la liste des projets pour la modale.
let apiWorksModal = fetch('http://localhost:5678/api/works');

// Élément HTML représentant la galerie pour la modale.
const galleryModal = document.querySelector('.gallery-modal');

// Crée un élément figure HTML pour la modale (figure, img et icône de suppression).
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

// Traitement de la réponse de la requête vers l'API des projets pour la modale.
apiWorksModal.then(async (responseApiWorksModal) => {
    if (!responseApiWorksModal.ok) {
        throw new Error('Erreur lors de la récupération des projets');
    }

    const data = await responseApiWorksModal.json();

    if (galleryModal) {
        apiWorksModal = data;

        data.forEach((work) => {
            const figureModal = createFigureModal(work);
            galleryModal.appendChild(figureModal);

            const deleteIcon = figureModal.querySelector('.delete-icone');
            deleteIcon.addEventListener('click', () => {
                deleteProjectConfirm(work.id);
            });
        });
    } else {
        console.error("La galerie n'a pas été trouvée.");
    }
});

// GESTION D'AFFICHAGE DES MODALES
const modalContainer = document.getElementById('modal-container');
const buttonModify = document.getElementById('modify');
const modalPhoto = document.getElementById('modal-photo');

// Ajoute un écouteur au bouton de modification pour afficher la modale principale et masquer la modale d'ajout de projet.
buttonModify.addEventListener('click', () => {
    modalContainer.style.display = 'block';
    modalPhoto.style.display = 'none';
    modal.style.display = 'flex';
});

// FERMETURE ET OUVERTURE MODALES
const closeModal = document.getElementById('modal-close');
const overlay = document.querySelector('.overlay');
const addPhoto = document.getElementById('add-photo');
const modal = document.getElementById('modal');
const closeModalPhoto = document.getElementById('modal-photo-close');
const modalReturn = document.getElementById('modal-return');

// Ajoute un écouteur au bouton de fermeture de la modale principale pour masquer la modale.
closeModal.addEventListener('click', () => {
    modalContainer.style.display = 'none';
});

// Ajoute un écouteur à l'overlay pour masquer les modales.
overlay.addEventListener('click', () => {
    modalContainer.style.display = 'none';
    resetImage();
    title.value = '';
    category.value = '';
});

// Ajoute un écouteur au bouton d'ajout de photo pour masquer la modale principale et afficher la modale d'ajout de projet.
addPhoto.addEventListener('click', () => {
    modal.style.display = 'none';
    modalPhoto.style.display = 'flex';
});

// Ajoute un écouteur au bouton de fermeture de la modale d'ajout de projet pour masquer les modales.
closeModalPhoto.addEventListener('click', () => {
    modalContainer.style.display = 'none';
    resetImage();
    title.value = '';
    category.value = '';
});

// Ajoute un écouteur au bouton de retour à la modale principale depuis la modale d'ajout de projet pour masquer la modale d'ajout de projet et afficher la modale principale.
modalReturn.addEventListener('click', () => {
    modalPhoto.style.display = 'none';
    modal.style.display = 'flex';
    resetImage();
    title.value = '';
    category.value = '';
});

// FORMULAIRE AJOUT DE PROJET
const inputImage = document.getElementById('input-image');
const labelImage = document.getElementById('label-image');
const pImage = document.querySelector('.p-image');
const photoImage = document.getElementById('photo-image');
const photoContainer = document.getElementById('photo-container');
const originalChildren = Array.from(photoContainer.children);
const maxSize = 4 * 1024 * 1024;

// Réinitialise la gestion des images en rétablissant l'affichage des éléments originaux et en réinitialisant le conteneur d'image.
function resetImage() {
    labelImage.style.display = '';
    pImage.style.display = '';
    photoImage.style.display = '';
    photoContainer.innerHTML = '';

    for (const child of originalChildren) {
        photoContainer.appendChild(child);
    }
    inputImage.value = '';
}

// Écouteur d'événement au champ de téléchargement d'image (affiche l'aperçu de l'image sélectionnée, vérifie la taille, et ajoute un bouton de réinitialisation).
inputImage.addEventListener('change', function () {
    const selectedImage = inputImage.files[0];

    photoContainer.innerHTML = '';

    if (selectedImage) {
        if (selectedImage.size > maxSize) {
            alert("La taille de l'image dépasse 4 Mo. Veuillez choisir une image plus petite.");
            resetImage();
            return;
        }

        const imgPreview = document.createElement('img');
        imgPreview.src = URL.createObjectURL(selectedImage);

        imgPreview.style.maxHeight = '100%';
        imgPreview.style.width = 'auto';
        imgPreview.style.position = 'relative';

        photoContainer.appendChild(imgPreview);

        const resetButton = document.createElement('button');
        resetButton.textContent = 'X';

        resetButton.style.position = 'absolute';
        resetButton.style.top = '120px';
        resetButton.style.right = '110px';
        resetButton.style.backgroundColor = 'transparent';
        resetButton.style.border = 'none';
        resetButton.style.fontSize = '15px';
        resetButton.style.cursor = 'pointer';

        resetButton.addEventListener('click', resetImage);

        photoContainer.appendChild(resetButton);
    }
});

// Requête l'API pour obtenir la liste des catégories, crée les options et les labels, attribue un ID.
const reponseCategory = fetch('http://localhost:5678/api/categories')
    .then((response) => response.json())
    .then((data) => {
        data.forEach((category) => {
            const categoryOption = document.createElement('option');
            const categoryLabel = document.createElement('label');

            categoryOption.setAttribute('value', category.id);
            categoryLabel.innerHTML = category.name;

            modalPhotoCategory.appendChild(categoryOption);
            categoryOption.appendChild(categoryLabel);
        });
    });

// VALIDATION FORMULAIRE
const buttonValidePhoto = document.getElementById('valide-photo');
const modalPhotoTitle = document.getElementById('modal-photo-title');
const modalPhotoCategory = document.getElementById('modal-photo-category');
const formulaire = document.getElementById('form-project');

// Vérifie si le formulaire est valide en fonction des champs remplis et change la couleur de fond du bouton de validation en conséquence.
function formValide() {
    if (
        modalPhotoTitle.value.trim() !== '' &&
        modalPhotoCategory.value !== '' &&
        inputImage.value !== ''
    ) {
        buttonValidePhoto.style.backgroundColor = '#1D6154';
    } else {
        buttonValidePhoto.style.backgroundColor = '';
    }
}

// Ajoute un écouteur d'événement au formulaire pour vérifier la validité en temps réel.
formulaire.addEventListener('input', formValide);

// AJOUT DE PROJET AU BACKEND
const category = document.getElementById('modal-photo-category');
const title = document.getElementById('modal-photo-title');
const image = document.querySelector('input[type=file]');
const token = sessionStorage.getItem('Token');

// Ajoute un écouteur d'événement à la soumission du formulaire pour empêcher le comportement par défaut,
// puis appelle la fonction addProject avec l'événement et le jeton d'authentification.
formulaire.addEventListener('submit', (event) => {
    event.preventDefault();
    addProject(event, token);
});

// Fonction asynchrone pour ajouter un projet, appelée lors de la soumission du formulaire.
async function addProject(event, token) {
    event.preventDefault();

    if (!title.value.trim() || !category.value || !image.files[0]) {
        alert('Veuillez remplir tous les champs');
        return;
    }

    const formData = new FormData();
    formData.append('title', title.value);
    formData.append('category', category.value);
    formData.append('image', image.files[0]);

    try {
        const response = await fetch('http://localhost:5678/api/works/', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });

        if (response.ok) {
            const responseData = await response.json();

            const figure = createFigureElement(responseData);
            const gallery = document.querySelector('.gallery');
            gallery.appendChild(figure);

            const figureModal = createFigureModal(responseData);
            galleryModal.appendChild(figureModal);

            const deleteIcon = figureModal.querySelector('.delete-icone');
            deleteIcon.addEventListener('click', () => {
                deleteProjectConfirm(responseData.id);
            });

            modal.style.display = 'flex';
            modalPhoto.style.display = 'none';

            resetImage();
            title.value = '';
            category.value = '';
            buttonValidePhoto.style.backgroundColor = '';

            window.alert('Projet ajouté avec succès');
        }
    } catch (error) {
        console.error(error);
    }
}


