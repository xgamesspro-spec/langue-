# Leri Sranantongo

Une application web pour apprendre et réviser le **sranan tongo** depuis le français.

**Version en ligne :** https://claude.ai/artifact/LEDTnTSRQGkrajqxBHj954
(il faut être connecté à son compte claude.ai)

## Ce qu'elle contient

- **Séance du jour** (environ 10 minutes) : un seul bouton enchaîne la révision des mots qui en ont besoin, la découverte de quelques mots nouveaux (avec un exemple en contexte) et un court exercice.
- **17 leçons de grammaire**, chacune avec un petit test : prononciation, pronoms, « être » (de / na), les marques de temps (e, ben, o, kaba), la négation, les questions, le pluriel, la possession, les prépositions, les verbes en série, les nombres, les conjonctions, l'impératif et la politesse, la comparaison, « srefi ».
- **468 mots et expressions** en 19 thèmes (salutations, famille, corps, cuisine surinamaise, maison, nature, animaux, verbes, adjectifs, couleurs, nombres, jours, questions, phrases utiles, santé et émotions, se déplacer, faire ses courses, expressions du cœur). Chaque mot est suivi d'une prononciation approchée écrite pour un francophone.
- **Le son** : un bouton haut-parleur sur chaque mot et chaque phrase, et « Écouter tout » sur les dialogues (une voix par personnage). Il n'existe pas de voix de synthèse pour le sranan : c'est la prononciation approchée qui est lue par une voix française (voix Claude sur claude.ai, sinon celle du navigateur). Vitesse lente et lecture automatique des cartes dans les Réglages.
- **Révision espacée** (méthode Leitner) : chaque mot revient le lendemain, puis après 3 jours, 7 jours, 16 jours, 35 jours. Un mot oublié repart au début.
- **Exercices** : choisir la traduction, écrire en sranan, remettre une phrase dans l'ordre, choisir la bonne marque de temps.
- **8 dialogues** (marché, famille, chemin, téléphone, médecin, bus, Keti Koti…) et un texte à lire, avec un mode test qui cache le sranan.
- **Dictionnaire** sranan ⇄ français.
- **Parler** : conversation avec Claude, qui répond en sranan simple, traduit et corrige vos phrases (6 situations). Ne fonctionne que dans la version claude.ai.
- **Culture** : histoire de la langue, Keti Koti, Srefidensi, l'hymne de Trefossa, des proverbes (odo).
- Série de jours, objectif quotidien, mot du jour. Sur téléphone, une barre de navigation en bas de l'écran.

## Sur mon téléphone, gratuitement

Pas besoin de l'App Store ni du Play Store. Deux façons, toutes les deux gratuites :

### 1. Le lien claude.ai (tout de suite)

Ouvrez https://claude.ai/artifact/LEDTnTSRQGkrajqxBHj954 dans le navigateur du téléphone, connectez-vous à claude.ai, puis :

- **iPhone** : Safari → bouton Partager → « Sur l'écran d'accueil ».
- **Android** : Chrome → ⋮ → « Ajouter à l'écran d'accueil ».

Tout fonctionne : progression synchronisée entre vos appareils, conversation avec Claude, son. Il faut une connexion internet.

### 2. La version hors ligne : https://xgamesspro-spec.github.io/langue-/

Le dossier `site/` est publié gratuitement par GitHub Pages à cette adresse. Ouvrez-la sur le téléphone et ajoutez-la à l'écran d'accueil (voir ci-dessus) : une fois ouverte, l'application marche **sans internet**, sans compte claude.ai.

À l'ouverture, l'accueil propose de l'installer : sur Android, un bouton « Installer » ouvre directement l'installation ; sur iPhone, où Apple ne permet pas à un site de s'installer tout seul, un bandeau explique quoi toucher dans Safari. « Plus tard » le masque pendant 7 jours.

Sur iPhone, l'application installée ne partage pas la mémoire de Safari : avant d'installer, touchez « Copier ma progression » dans le bandeau. À la première ouverture, l'application installée propose de la récupérer.

Dans cette version, la progression reste sur le téléphone (pas de synchronisation), et la page « Parler » n'est pas disponible.

Pour republier après une modification :

```bash
node scripts/build.mjs
git add -A && git commit -m "Mise à jour" && git push
git push origin "$(git subtree split --prefix site):refs/heads/gh-pages"
```

## Où est enregistrée la progression ?

- Dans la **version claude.ai**, la progression est synchronisée avec votre compte, dans un espace privé que personne d'autre ne voit. Vous la retrouvez sur tous vos appareils.
- Dans la version `site/`, elle est enregistrée dans le navigateur du téléphone, sur cet appareil seulement.

## Organisation des fichiers

| Fichier | Rôle |
| --- | --- |
| `app/leri-sranantongo.html` | Le code source de l'application (contenu, styles, logique). C'est ce fichier qui est publié sur claude.ai. |
| `pwa/` | L'icône, le manifeste et le service worker qui rendent l'application installable et utilisable hors ligne. |
| `site/` | L'application prête à mettre en ligne. Générée à partir des deux éléments ci-dessus. |
| `scripts/build.mjs` | Régénère `site/` : `node scripts/build.mjs` |

Pour ajouter des mots, modifiez le tableau `THEMES` en haut du script dans `app/leri-sranantongo.html` (format `["sranan", "français", "note facultative"]`), puis lancez `node scripts/build.mjs`.

## Sécurité

Ce qui est en place :

- **Aucune donnée personnelle dans le dépôt** : pas d'adresse e-mail, pas de mot de passe, pas de clé. Les modifications sont signées « Claude ».
- **Version en ligne (GitHub Pages)** : servie uniquement en HTTPS, sans aucune requête vers un autre site (les polices sont hébergées avec le site, Google ne voit pas vos visites). Une politique de sécurité stricte (CSP) n'autorise que les deux scripts de l'application, identifiés par leur empreinte : un script ajouté par quelqu'un d'autre ne s'exécuterait pas. Aucune information de provenance n'est envoyée quand on suit un lien.
- **Progression** : elle reste sur le téléphone (version en ligne) ou dans un espace privé de votre compte claude.ai. Toute progression chargée, y compris un code de sauvegarde collé, est vérifiée champ par champ : un code abîmé ou piégé est ignoré.
- **Sauvegarde** : Réglages → « Copier mon code de sauvegarde ». Gardez ce code dans vos notes ; « Restaurer » le recharge, sur n'importe quel appareil et dans les deux versions.

Ce que vous seul pouvez faire, dans les réglages de GitHub :

1. **Activer la double authentification** : github.com → photo de profil → Settings → Password and authentication → Two-factor authentication. C'est la protection la plus importante : personne d'autre ne pourra modifier le site, même avec votre mot de passe.
2. **Protéger les branches** : dans le dépôt, Settings → Rules → Rulesets (ou Branches) → créez une règle pour `gh-pages` et `claude/vibrant-knuth-s8vuga` qui bloque la suppression et les « force push ».
3. **Garder le lien claude.ai pour vous** : l'application claude.ai est privée, vous seul pouvez l'ouvrir.

Le dépôt est public : tout le monde peut lire le code. Ce n'est pas un risque, puisqu'il ne contient aucun secret ; c'est aussi ce qui rend GitHub Pages gratuit.

## À propos du contenu

L'orthographe suit la norme officielle de 1986 (`u`, `y`, `sy`, `ty`, `dy`, `ny`). Le sranan varie selon les familles et les quartiers, et une partie du contenu (les proverbes surtout) circule sous plusieurs formes. Si vos proches disent un mot autrement, c'est leur version qui compte.
