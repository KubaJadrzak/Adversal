/**
 *
 *
 * @param  {Object}
 * @return {Boolean}
 */

const CanCan = function (policy) {
  return (user) => {
    return (action) => {
      const policyAction = policy[action];
      // Si il n'y a pas de politique pour cette action on arrête
      if (!policyAction) return () => true;

      // Gestion de la fonction before
      if (typeof policy.before === 'function') {
        return (data) => {
          // Le before autorise l'action, next! (on ne vérifie pas l'action)
          if (policy.before(user, data) === true) return true;
          // Sinon on vérifie les permissions de la fonction qui correspond à action
          return policy[action](user, data);
        }
      }

      // Pas de before, pas d'effort *clap clap!*
      // On appellera la fonction qui correspond à action avec les données, le user sera "bindé"
      return policy[action].bind(null, user);
    }
  }
}

module.exports = CanCan;
