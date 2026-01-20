let panier = [];

        let panierLoader = localStorage.getItem('panier');
        if (panierLoader) {
                panier = JSON.parse(panierLoader);
                mettreAJourCompteur();
            }

            function shoppingCart () {
                let ajouterBoutons = document.querySelectorAll('.button-panier')
                for (let i = 0; i < ajouterBoutons.length; i++) {
                    let bouton = ajouterBoutons[i];
                    /*
                    Un évènement est une action du navigateur du moins l'utilisateur 
                    .addEvenListener('',function () {...})
                    le premier paramètre, quel type d'élément tu veux écouter , ça peut être un click, un input etc.
                    La fonction qui est le deuxième paramètre va s'exécuter lorsque l'évènement arrive 
                    */
                   bouton.addEventListener('click',function(){
                    // console.log(event.target) even.target représente le bouton qui a été cliqué.

                    // Je récupère mes data depuis mon html avec dataset 
                    let id = bouton.dataset.id;
                    let nom = bouton.dataset.nom;
                    let prix = bouton.dataset.prix;
                    let image = bouton.dataset.image;

                    //Je crée mon produit d'abord 
                    let produit = {
                        id : id,
                        nom : nom,
                        prix : prix,
                        image : image,
                        quantite : 1
                    };

                    //Vérifier si le produit existe déjà
                    let produitsExistants = panier.find(function(item){
                        return item.id === id;
                    });

                    //Si existe j'augmente la qté, sinon j'ajoute 
                    if (produitsExistants) {
                        produitsExistants.quantite++;
                    }else {
                        panier.push(produit);
                    }
                    
                    //J'affiche le panier 
                    console.table(panier)

                    localStorage.setItem('panier', JSON.stringify(panier))

                    // Mettre a jour l'affichage du panier 
                    mettreAJourCompteur();
                   })
                }
            }
            shoppingCart();

            // Sélectionner l'icone panier (le div du parent)
            let iconePanier = document.querySelector('#compteur-panier').parentElement;
            iconePanier.addEventListener('click', function() {
                afficherPanier();
            })

            /*
            Cette fonction calcule le total des quantités dans le panier et 
            met à jour l'affichage du compteur 
            */
           function mettreAJourCompteur () {
            let total = 0;
            //Calcul du total des qtes 
            for (let i = 0; i < panier.length; i++) {
                total += panier[i].quantite;
            }
            
            //Mise à jour de l'affichage du compteur 
            let compteur = document.querySelector('#compteur-panier'); // sélectionne l'élément avec l'id compteur-panier et la stocke dans compteur 
            compteur.textContent = total; // Au début on a 0 dans le panier si le total = 5 grâce à cette ligne on verra 5 au lieu de 0.

            if (total > 0 ) {
                compteur.classList.add('visible');
            } else {
                compteur.classList.remove('visible');
            }
           }

           function afficherPanier () {
            //Sélectionner le modal et la liste de produits 
            let modal = document.querySelector('#affichage-panier');
            let listeProduits = document.querySelector('#liste-produits-panier')

            listeProduits.innerHTML = ''

            //Check if user shopping cart is empty 
            if (panier.length === 0) {
                listeProduits.innerHTML = '<p style="text-align : center; padding: 10px;">Votre panier est vide</p>'
            } else {
                for (let i = 0; i < panier.length; i++) {
                    let produit = panier[i];

                    let produitDiv = document.createElement('div') 
                    produitDiv.classList.add('produit-panier');

                    //Fill with html
                     produitDiv.innerHTML = `
                        <img src="${produit.image}" alt="${produit.nom}">
                        <div class="produit-info">
                            <h4>${produit.nom}</h4>
                            <p>Prix : ${produit.prix}$</p>
                            <p>Quantité : ${produit.quantite}</p>
                        </div>
                        <button class="btn-supprimer" data-id="${produit.id}">Supprimer</button>
                    `;
                    listeProduits.appendChild(produitDiv);
                } 

                //Ajouter les évènements sur les boutons supprimer 
                let boutonsSupprimer = document.querySelectorAll('.btn-supprimer');
                for (let i=0; i < boutonsSupprimer.length; i++) {
                    boutonsSupprimer[i].addEventListener('click', function(){
                        let id = this.dataset.id;
                        supprimerDuPanier(id)
                    })
                    
                }
            }

            calculerTotal();

            //I print the modal now 
            modal.classList.add('visible');
           }

          function supprimerDuPanier (id) {
            let indice = -1;
            for (let i = 0; i < panier.length; i++) {
                if (panier[i].id === id) {
                    indice = i;
                    break;
                }
            }

            // La ou je vais supprimer mais à la condition suivante 
            if (indice !== -1) {
                panier.splice(indice,1)
            }

            localStorage.setItem('panier', JSON.stringify(panier))

            afficherPanier();
            mettreAJourCompteur();
          }

          function calculerTotal () {
            let total =0;
            for (let i =0; i < panier.length; i++) {
                let prixProduit = parseFloat(panier[i].prix);
                let quantite = panier[i].quantite;
                total += prixProduit * quantite;
            }

           
            let totalElement = document.querySelector('#total-panier')
            totalElement.textContent = total;
            // Abdoulaye you mad man 
          }

          let btnFermer = document.querySelector('#fermer-panier');
          btnFermer.addEventListener('click', function() {
            let modal = document.querySelector('#affichage-panier');
            modal.classList.remove('visible');
          });
    

         let modal = document.querySelector('#affichage-panier');
         modal.addEventListener('click', function(event) {
                if (event.target === modal) {
                    modal.classList.remove('visible');
                }
            });