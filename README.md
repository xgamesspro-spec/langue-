# Leri Sranantongo

Une application web pour apprendre et réviser le **sranan tongo** depuis le français.

**Version en ligne :** https://claude.ai/artifact/LEDTnTSRQGkrajqxBHj954
(il faut être connecté à son compte claude.ai)

## Ce qu'elle contient

- **14 leçons de grammaire**, chacune avec un petit test : prononciation, pronoms, « être » (de / na), les marques de temps (e, ben, o, kaba), la négation, les questions, le pluriel, la possession, les prépositions, les verbes en série, les nombres, les conjonctions.
- **408 mots et expressions** en 15 thèmes (salutations, famille, corps, cuisine surinamaise, maison, nature, animaux, verbes, adjectifs, couleurs, nombres, jours, questions, phrases utiles). Chaque mot est suivi d'une prononciation approchée écrite pour un francophone.
- **Révision espacée** (méthode Leitner) : chaque mot revient le lendemain, puis après 3 jours, 7 jours, 16 jours, 35 jours. Un mot oublié repart au début.
- **Exercices** : choisir la traduction, écrire en sranan, remettre une phrase dans l'ordre, choisir la bonne marque de temps.
- **Dialogues** (marché, famille, demander son chemin, téléphone…) et un texte à lire, avec un mode test qui cache le sranan.
- **Dictionnaire** sranan ⇄ français.
- **Parler** : conversation avec Claude, qui répond en sranan simple, traduit et corrige vos phrases. Ne fonctionne que dans la version claude.ai.
- **Culture** : histoire de la langue, Keti Koti, Srefidensi, l'hymne de Trefossa, des proverbes (odo).
- Série de jours, objectif quotidien, mot du jour.

## Où est enregistrée la progression ?

- Dans la **version claude.ai**, la progression est synchronisée avec votre compte, dans un espace privé que personne d'autre ne voit. Vous la retrouvez sur tous vos appareils.
- En ouvrant `index.html` directement dans un navigateur, elle est enregistrée sur cet appareil seulement.

## Organisation des fichiers

| Fichier | Rôle |
| --- | --- |
| `app/leri-sranantongo.html` | Le code source de l'application (contenu, styles, logique). C'est ce fichier qui est publié sur claude.ai. |
| `index.html` | Version autonome, à ouvrir dans n'importe quel navigateur. Générée à partir du fichier ci-dessus. |
| `scripts/build.mjs` | Régénère `index.html` : `node scripts/build.mjs` |

Pour ajouter des mots, modifiez le tableau `THEMES` en haut du script dans `app/leri-sranantongo.html` (format `["sranan", "français", "note facultative"]`), puis lancez `node scripts/build.mjs`.

## À propos du contenu

L'orthographe suit la norme officielle de 1986 (`u`, `y`, `sy`, `ty`, `dy`, `ny`). Le sranan varie selon les familles et les quartiers, et une partie du contenu (les proverbes surtout) circule sous plusieurs formes. Si vos proches disent un mot autrement, c'est leur version qui compte.
