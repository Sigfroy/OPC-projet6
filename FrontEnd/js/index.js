/*
 * Effectue une requête pour récupérer la liste des projets et les catégories depuis l'API.
 */
const apiWorks = fetch('http://localhost:5678/api/works');
const categories = fetch('http://localhost:5678/api/categories');
const gallery = document.querySelector('.gallery');
const portfolio = document.getElementById('portfolio');
const buttonFiltre = document.querySelector('.button');

let allWorks = []; // Stocke la liste complète des projets récupérée depuis l'API.

/*
 * Traite la réponse de la requête vers l'API des projets.
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
 * Traite la réponse de la requête vers l'API des catégories.
 * Crée les boutons de filtres et la classe active.
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