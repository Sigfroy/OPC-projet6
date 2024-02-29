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
