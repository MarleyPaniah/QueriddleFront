/* Modèle d'utilisateur ; petite classe qui définit les proporiétés d'un utilisateur.
Le proporiété token est utilisée pour contenir le jeton JWT renvoyé par l'API en cas d'authentification réussie.
 */

export class User {
  id: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  token: string;
}
