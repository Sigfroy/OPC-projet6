/*
Effectue une requête pour récupérer la liste des projets et les catégories depuis l'API.
 */
const apiWorks = fetch('http://localhost:5678/api/works');
const categories = fetch('http://localhost:5678/api/categories');
const gallery = document.querySelector('.gallery');
const portfolio = document.getElementById('portfolio');
const buttonFiltre = document.querySelector('.button');

let allWorks = []; // Stocke la liste complète des projets récupérée depuis l'API.

/*
Crée un élément figure HTML (figure, img et figcaption) pour un projet donné.
 */
function createFigureElement(work) {
    const figureElement = document.createElement('figure');
    figureElement.setAttribute('data-id', work.id);

    const imageElement = document.createElement('img');
    imageElement.src = work.imageUrl;

    const titleElement = document.createElement('figcaption');
    titleElement.textContent = work.title;

    figureElement.appendChild(imageElement);
    figureElement.appendChild(titleElement);

    return figureElement;
}

/*
Traite la réponse de la requête vers l'API des projets.
 */
apiWorks.then(async (responseApiWorks) => {
    if (!responseApiWorks.ok) {
        throw new Error('Erreur lors de la récupération des projets');
    }

    const data = await responseApiWorks.json();

    if (gallery) {
        allWorks = data;
        displayWorks(allWorks);
    } else {
        console.error("La galerie n'a pas été trouvée.");
    }
});

/*
Traite la réponse de la requête vers l'API des catégories.
Crée les boutons de filtres et la classe active.
 */
categories.then(async (responseCategories) => {
    if (!responseCategories.ok) {
        throw new Error('Erreur lors de la récupération des catégories');
    }

    const dataCategories = await responseCategories.json();

    if (portfolio) {
        const filtres = document.createElement('div');
        filtres.classList.add('filtres');

        const tousButton = document.createElement('button');
        tousButton.textContent = 'Tous';
        tousButton.classList.add('button', 'active');
        tousButton.addEventListener('click', () => {
            document
                .querySelectorAll('.button')
                .forEach((btn) => btn.classList.remove('active'));

            tousButton.classList.add('active');
            displayWorks(allWorks);
        });

        filtres.appendChild(tousButton);

        dataCategories.forEach((category) => {
            const buttonElement = document.createElement('button');
            buttonElement.classList.add('button');
            buttonElement.textContent = category.name;

            buttonElement.addEventListener('click', () => {
                document
                    .querySelectorAll('.button')
                    .forEach((btn) => btn.classList.remove('active'));

                buttonElement.classList.add('active');
                const filteredWorks = filterWorksByCategory(category);
                displayWorks(filteredWorks);
            });

            filtres.appendChild(buttonElement);
        });

        portfolio.appendChild(filtres);
        portfolio.insertBefore(filtres, gallery);

        if (JSON.parse(sessionStorage.getItem('connected'))) {
            filtres.style.display = 'none';
        }
    } else {
        console.error("Les catégories n'ont pas été trouvées.");
    }
});

/*
Affiche les projets dans la galerie.
 */
function displayWorks(works) {
    gallery.innerHTML = '';

    works.forEach((work) => {
        const figureElement = createFigureElement(work);
        gallery.appendChild(figureElement);
    });
}

/*
Filtrer les projets par catégorie.
 */
function filterWorksByCategory(category) {
    return allWorks.filter((work) => work.categoryId === category.id);
}

// PARTIE EDITION

// Éléments HTML liés à l'administration.
const admin = document.getElementById('admin');      // Conteneur pour la partie administration.
const login = document.getElementById('login');      // Bouton de connexion.
const logout = document.getElementById('logout');    // Bouton de déconnexion.
const modify = document.getElementById('modify');    // Bouton de modification.
const header = document.getElementById('header');    // En-tête.

// Vérifie si l'utilisateur est connecté en utilisant les informations de session.
if (JSON.parse(sessionStorage.getItem('connected'))) {
    // Si connecté, affiche les éléments liés à l'administration et au mode édition.
    login.style.display = 'none';
    logout.style.display = 'block';
    admin.style.display = 'flex';
    modify.style.display = 'inline-block';
    header.style.marginTop = '100px';
} else {
    // Si non connecté, affiche uniquement le bouton de connexion.
    login.style.display = 'block';
    logout.style.display = 'none';
    admin.style.display = 'none';
    modify.style.display = 'none';
}

// Ajoute un écouteur d'événement au bouton de déconnexion.
logout.addEventListener('click', (event) => {
    // Empêche le comportement par défaut du bouton de déconnexion.
    event.preventDefault();

    // Supprime les informations de session et redirige vers la page d'accueil.
    sessionStorage.removeItem('Token');
    sessionStorage.removeItem('connected');
    window.location.replace('index.html');
});
