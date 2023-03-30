# Workshop Users and Pets

## But de l'exercice

Appliquer les premières connaissances étudiées sur les premières séances du cours:
- standardisation de code
- tests unitaires
- tests fonctionnels
- tests d'intégration
- automatisation via des workflows Github Actions / Gitlab CI

## Spécifications

Développement d'une API de gestion de Users et de Pets.

### Modèles

#### Pet

L'objet Pet décrit un animal de compagnie.

| Champ | type | Description | Exemple |
| --- | ---- | ------- | ------- |
| vetId | number | Identification officielle | 12346 |
| name | string | Nom de l'animmal | Pastèque |
| kind | string | Espèce | Chien |
| birthDate | Date | Date de naissance de l'animale | 2021-07-08 |

#### User

L'objet User décrit un·e utilisateur·rice.

| Champ | type | Description | Exemple |
| --- | ---- | ------- | ------- |
| firstname | string | Prénom | Nicolas |
| lastname | string | Nom de famille | Espiau |
| pets | tableau de vetId | Animaux de compagnie | [123456] |

### Routes

#### Pets

##### Créer

Route : `/pets`  
Méthode : POST  
Payload :
```json
{
  vetId : Number,
  name : String,
  kind : String,
  birthDate : Date
}
```

Codes réponse :
- 201 : création OK
- 400 : payload invalide
- 209 : existe déjà
- 500 : erreur interne

Body 200 :

```json
{
  id: string | number, # en fonction de la BDD
  vetId : Number,
  name : String,
  kind : String,
  age : Number
}
```

##### Mettre à jour

Route : `/pets`  
Méthode : PUT  
Payload :
```json
{
  vetId : Number,
  name : String,
  kind : String,
  birthDate : Date
}
```

Codes réponse :
- 200 : mise à jour OK
- 400 : payload invalide
- 404 : Pet non trouvé
- 500 : erreur interne

Body 200 :

```json
{
  id: string | number, # en fonction de la BDD
  vetId : Number,
  name : String,
  kind : String,
  age : Number
}
```

##### Lister

Route : `/pets`  
Méthode : GET  
Query (optionnelle) : `?kind=string&age=number&name=string`

Codes réponse :
- 200 : OK
- 500 : erreur interne

Body 200 :

```json
[
  {
    id: string | number, # en fonction de la BDD
    vetId : Number,
    name : String,
    kind : String,
    age : Number
  },
  {
    ...
  }
]
```

##### Trouver

Routes : 
- `/pets/vetId/:vetId`
- `/pets/id/:id`  
Méthode : GET

Codes réponse :
- 200 : OK
- 404 : animal non trouvé
- 500 : erreur interne

Body 200 :

```json
{
  id: string | number, # en fonction de la BDD
  vetId : Number,
  name : String,
  kind : String,
  age : Number
}
```

##### Supprimer

Routes : 
- `/pets/vetId/:vetId`
- `/pets/id/:id`  
Méthode : DELETE

Codes réponse :
- 200 : OK
- 404 : animal non trouvé
- 500 : erreur interne

#### Users

##### Créer

Route : `/users`  
Méthode : POST  
Payload :
```json
{
  firstname : String,
  lastname : String
}
```

Codes réponse :
- 201 : création OK
- 400 : payload invalide
- 209 : existe déjà
- 500 : erreur interne

Body 200 :

```json
{
  firstname : String,
  lastname : String
}
```

> :warning: **Note** : pour les besoins de l'exercice on mettra une contrainte d'unicité sur `(firstname,lastname)`

##### Mettre à jour

Route : `/users`  
Méthode : PUT  
Payload :
```json
{
  firstname : String,
  lastname : String
}
```

Codes réponse :
- 200 : mise à jour OK
- 400 : payload invalide
- 404 : User non trouvé
- 500 : erreur interne

Body 200 :

```json
{
  id: string | number, # en fonction de la BDD
  firstname : String,
  lastname : String,
  pets: [
    {
      vetId: Number,
      name: String,
      kind: String,
      age: Number
    }
  ]
}
```

##### Lister

Route : `/users`  
Méthode : GET  
Query (optionnelle) : `?lastname=string&firstname=string`

Codes réponse :
- 200 : OK
- 500 : erreur interne

Body 200 :

```json
[
  {
    id: string | number, # en fonction de la BDD
    firstname : String,
    lastname : String,
    pets: [
      {
        vetId: Number,
        name: String,
        kind: String,
        age: Number
      }
    ]
  },
  {
    ...
  }
]
```

##### Trouver

Route : `/users/:id`  
Méthode : GET

Codes réponse :
- 200 : OK
- 404 : User non trouvé
- 500 : erreur interne

Body 200 :

```json
{
  id: string | number, # en fonction de la BDD
  firstname : String,
  lastname : String,
  pets: [
    {
      vetId: Number,
      name: String,
      kind: String,
      age: Number
    }
  ]
}
```

##### Supprimer

Route : `/users/:id`  
Méthode : DELETE

Codes réponse :
- 200 : OK
- 404 : User non trouvé
- 500 : erreur interne

##### Ajouter un Pet

Route : `/users/:id/pets`  
Méthode : POST  
Payload :
```json
{
  vetId: String,
  name: String,
  kind: String,
  birthDate: Date
}
```

Codes réponse :
- 201 : OK
- 400 : payload invalide
- 404 : User non trouvé
- 209 : Pet déjà présent dans la liste
- 500 : erreur interne

> :warning: **Notes**:
> Si l'animal est déjà dans la base, on l'ajoute au User
> Si l'animal n'existe pas, on le créé

Body 200 :

```json
{
  id: string | number, # en fonction de la BDD
  firstname : String,
  lastname : String,
  pets: [
    {
      vetId: Number,
      name: String,
      kind: String,
      age: Number
    }
  ]
}
```

##### Retirer un Pet

Route : `/users/:id/pets/:id`  
Méthode : DELETE

Codes réponse :
- 200 : OK
- 404 : User non trouvé
- 404 : Pet non trouvé dans la liste
- 500 : erreur interne

Body 200 :

```json
{
  id: string | number, # en fonction de la BDD
  firstname : String,
  lastname : String,
  pets: [
    {
      vetId: Number,
      name: String,
      kind: String,
      age: Number
    }
  ]
}
```

### Tests unitaires

Implémenter les tests unitaires validant toutes les méthodes des classes Pet et User.

### Tests d'intégration

On veut tester uniquement les classes qui accèdent au stockage des données, en lecture comme en écriture.

Pour cela, on lance un serveur mongo:  
```bash
docker-compose -f tests/integ/docker-compose.yaml up -d
```

Puis on peut exécuter la commande `npm run test:integ`.

Si on veut éviter d'utiliser Docker, il faut s'assurer d'avoir un serveur mongo qui tourne en local et qui est accessible via l'url `localhost:27017`, ou modifier la
 configuration dans les fichiers `tests/integ/*` et y mettre les bonnes valeurs.  
 Déconseillé quand on travaille en team.