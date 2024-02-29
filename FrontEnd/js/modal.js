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