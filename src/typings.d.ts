/*
Un fichier typings personnalisé est utilisé pour déclarer les types créés en dehors de votre application Angular
afin que le compilateur TypeScript ne génère pas d'erreurs sur les types inconnus. Ce fichier typings contient une
déclaration pour l'objet de config global créé par webpack
 */

// so the typescript compiler doesn't complain about the global config object
declare var config: any;
//declare var jQuery: any;
