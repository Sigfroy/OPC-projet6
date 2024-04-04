// Sélectionne les éléments HTML et les stocke dans des variables.
const inputEmail = document.querySelector("#email");
const inputPassword = document.querySelector("#password");
const button = document.querySelector("#button");
const error = document.querySelector("#error");

// Ajoute un écouteur d'événement au bouton de connexion pour vérifier si les champs sont vides et afficher un message d'erreur si l'e-mail est vide.
button.addEventListener("click", function () {
    if (inputEmail.value.length < 1 || inputPassword.value.length < 1) {
        error.innerText = "*Veuillez remplir tous les champs svp";
        error.style.display = "block";
        inputEmail.style.backgroundColor = "#ffe6e6"; // Change le fond de l'e-mail en rouge très clair en cas d'erreur
        inputPassword.style.backgroundColor = "#ffe6e6"; // Change le fond du mot de passe en rouge très clair en cas d'erreur
        return;
    } else {
        error.innerText = ""; // Efface le message d'erreur
        inputEmail.style.backgroundColor = ""; // Réinitialise la couleur de la bordure de l'e-mail
        inputPassword.style.backgroundColor = ""; // Réinitialise la couleur de la bordure du mot de passe
    }
});

// Ajoute un écouteur d'événement au champ d'e-mail pour masquer le message d'erreur et réinitialiser la couleur de la bordure.
inputEmail.addEventListener("input", function () {
    error.innerText = ""; // Efface le message d'erreur
    inputEmail.style.backgroundColor = ""; // Réinitialise la couleur de la bordure de l'e-mail
});

// Ajoute un écouteur d'événement au champ du mot de passe pour masquer le message d'erreur et réinitialiser la couleur de la bordure.
inputPassword.addEventListener("input", function () {
    error.innerText = ""; // Efface le message d'erreur
    inputPassword.style.backgroundColor = ""; // Réinitialise la couleur de la bordure du mot de passe
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
                error.innerText = "L'identifiant ou le mot de passe ne sont pas corrects";
                error.style.display = "block";
                inputEmail.style.backgroundColor = "#ffe6e6"; // Change le fond de l'e-mail en rouge très clair en cas d'erreur
                inputPassword.style.backgroundColor = "#ffe6e6"; // Change le fond du mot de passe en rouge très clair en cas d'erreur
            } else {
                // Enregistre dans la session que l'utilisateur est connecté et stocke le token.
                sessionStorage.setItem("connected", JSON.stringify(true));
                sessionStorage.setItem("Token", data.token);
                window.location.replace("index.html");
            }
        });
});
