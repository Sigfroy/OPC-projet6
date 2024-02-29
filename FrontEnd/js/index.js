/*
 * Effectue une requête pour récupérer la liste des projets et les catégories depuis l'API.
 */
const apiWorks = fetch('http://localhost:5678/api/works');
const categories = fetch('http://localhost:5678/api/categories');

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