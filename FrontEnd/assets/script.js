// Sélectionne le conteneur de la galerie dans le HTML
const galleryContainer = document.querySelector(".gallery")

// Initialise une variable pour stocker toutes les données des projets
let allData = []

// Initialise la catégorie actuelle à "0" (afficher toutes les catégories par défaut)
let currentCategoryId = "0"

// URL de l'API pour récupérer les projets
const WORKS_API_URL = "http://localhost:5678/api/works"

// Fonction utilitaire pour envoyer une requête à l'API
async function fetchData(url, method = "GET", headers = {}, body = null) {
    try {
        const options = {
            method: method,
            headers: headers ? headers : {},
            body: body ? body : null,
        }

        // Envoie la requête à l'URL spécifiée avec les options définies
        const response = await fetch(url, options)

        // Vérifie si la réponse est OK, sinon lance une erreur
        if (!response.ok) {
            throw new Error("Erreur lors de l'envoie de la requête")
        }

        // Récupère les données de la réponse et les parse en JSON
        const responseData = await response.text()
        if (responseData) {
            return JSON.parse(responseData)
        } else {
            return {} // Retourne un objet vide si la réponse est vide
        }
    } catch (error) {
        console.error("Error:", error)
        return null
    }
}

// Initialise une liste pour stocker les catégories uniques
let categoryList = new Set()

// Fonction pour récupérer les projets depuis l'API
async function getProjects() {
    // Récupère les données des projets depuis l'API
    const data = await fetchData(WORKS_API_URL)

    // Si des données sont récupérées avec succès
    if (data) {
        // Stocke toutes les données des projets dans la variable globale
        allData = data

        // Ajoute les projets dans la galerie en utilisant la catégorie par défaut
        addProjectsInGallery("0")
    }

    // Parcourt toutes les données pour extraire les catégories uniques
    allData.forEach((project) => {
        if (project.category.id && project.category.name) {
            let categoryInfo = {
                name: project.category.name,
                id: project.category.id,
            }

            // Vérifie si la catégorie est déjà présente dans la liste
            let isDuplicate = false
            for (let item of categoryList) {
                if (item.name === categoryInfo.name && item.id === categoryInfo.id) {
                    isDuplicate = true
                    break
                }
            }

            // Si la catégorie n'est pas déjà présente, l'ajoute à la liste
            if (!isDuplicate) {
                categoryList.add(categoryInfo)
            }
        }
    })

    // Crée les boutons pour toutes les catégories et le bouton "Tous"
    createButtons("Tous", "0")
    if (categoryList && categoryList.size > 0) {
        for (let item of categoryList.values()) {
            createButtons(item.name, item.id)
        }
    } else {
        console.log("L'objet set est vide ou non défini")
    }

    // Crée la sélection des catégories dans le formulaire
    createCategorySelection(categoryList)
}

// Appelle la fonction pour récupérer les projets au chargement de la page
getProjects()

// Ajoute dynamiquement les projets en fonction de la catégorie sélectionnée
function addProjectsInGallery(categoryId) {
    // Met à jour la catégorie actuelle
    currentCategoryId = categoryId

    // Si aucune donnée n'est disponible, quitte la fonction
    if (allData.length === 0) {
        return
    }

    // Filtrage des données en fonction de la catégorie sélectionnée
    const filteredData = allData.filter((item) => {
        return categoryId == "0" || item.categoryId == categoryId
    })

    // Construction du HTML pour les projets filtrés
    let galleryHTML = ""

    filteredData.forEach((item) => {
        galleryHTML += `
            <figure class="project-container" data-id="${item.id}">
                <img src="${item.imageUrl}" alt="${item.title}">
                <figcaption>${item.title}</figcaption>
            </figure>
        `
    })

    // Remplace le contenu de la galerie avec le HTML construit
    galleryContainer.innerHTML = galleryHTML
}

// Sélectionne le conteneur des boutons de filtre dans le HTML
const filterBtnContainer = document.querySelector(".filters-btn-container")

// Initialise un tableau pour stocker tous les boutons de filtre
let allBtnFilter = []

// Fonction utilitaire pour créer des boutons de filtre
function createButtons(type, id) {
    let btn = document.createElement("button")
    btn.setAttribute("data-category", id)
    btn.classList.add("filter-btn")
    btn.textContent = type

    // Ajoute le bouton au conteneur des boutons de filtre
    filterBtnContainer.appendChild(btn)

    // Sélectionne le premier bouton de filtre et l'active
    let activeBtnFilter = filterBtnContainer.firstElementChild
    activeBtnFilter.classList.add("filter-active")

    // Ajoute le bouton actuel au tableau des boutons de filtre
    allBtnFilter.push(btn)

    // Ajoute un écouteur d'événements pour détecter les clics sur le bouton
    btn.addEventListener("click", () => {
        // Désactive le bouton actif précédent
        document.querySelector(".filter-active").classList.remove("filter-active")

        // Active le bouton actuel
        btn.classList.add("filter-active")

        // Appelle la fonction pour afficher les projets filtrés
        const categoryId = btn.getAttribute("data-category")
        addProjectsInGallery(categoryId)
    })
}

