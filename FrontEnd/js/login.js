// Sélectionne les éléments HTML et les stocke dans des variables.
const inputEmail = document.querySelector("#email");
const inputPassword = document.querySelector("#password");
const button = document.querySelector("#button");
const error = document.querySelector("#error");

// Ajoute un écouteur d'événement au bouton de connexion pour vérifier si les champs sont vides et afficher un message d'erreur si l'e-mail est vide.
button.addEventListener("click", function () {
    if (inputEmail.value.length < 1) {
        error.innerText = "*Veuillez remplir tous les champs svp";
        error.style.display = "block";
        return;
    }
});

// Ajoute un écouteur d'événement au champ d'e-mail pour masquer le message d'erreur.
inputEmail.addEventListener("input", function () {
    error.style.display = "none";
});

// Ajoute un écouteur d'événement au bouton de connexion pour effectuer une requête API de connexion.
// Empêche le comportement par défaut du formulaire.
button.addEventListener("click", (event) => {
    event.preventDefault();

    fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: inputEmail.value,
            password: inputPassword.value,
        }),
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.message || data.error) {
                alert("Erreur: l'identifiant ou le mot de passe ne sont pas corrects");
            } else {
                // Enregistre dans la session que l'utilisateur est connecté et stocke le token.
                sessionStorage.setItem("connected", JSON.stringify(true));
                sessionStorage.setItem("Token", data.token);

                window.location.replace("index.html");
            }
        });
});