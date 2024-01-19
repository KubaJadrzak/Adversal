# CanCan

Documentation et description arrivent (très prochainement théoriquement).

# TODO
- Écrire la description et la documentation (sans blague? :-o)
- Continuer les tests (ils sont écrit à 99.999999%)

# Utilisation
```javascript
const user = req.jwt; // Récupérez votre utilisateur de la session
const data = findOne(); // Récupérer vos données
const can = CanCan(policy);
can(user)('show')(data);
```