# semantic-release-js

Configuration complète de semantic-release pour JavaScript avec GitHub Actions.

## 🚀 Fonctionnalités

- ✅ Semantic Release avec **GitHub** (remplace GitLab)
- ✅ Génération automatique du CHANGELOG
- ✅ Publication NPM optionnelle
- ✅ Création de release GitHub
- ✅ **Création automatique de branches `release/vX.Y`** ⭐ (version majeure.mineure uniquement)
- ✅ Déclenchement manuel du workflow

## 📦 Packages installés (dernières versions)

- `semantic-release@^25.0.3`
- `@semantic-release/changelog@^6.0.3`
- `@semantic-release/commit-analyzer@^13.0.1`
- `@semantic-release/git@^10.0.1`
- **`@semantic-release/github@^12.0.6`** ⭐ (remplace GitLab)
- `@semantic-release/exec@^7.1.0`
- `@semantic-release/npm@^13.1.5`
- `@semantic-release/release-notes-generator@^14.1.0`
- `conventional-changelog-conventionalcommits@^9.3.0`

## 🎯 Workflow GitHub Actions

Le workflow `.github/workflows/release.yml` contient **2 jobs** :

### Job 1: Semantic Release
- Lance semantic-release sur la branche **master**
- Analyse les commits depuis la dernière version
- Détermine la nouvelle version (patch, minor, major)
- Met à jour `package.json` et `CHANGELOG.md`
- Crée un commit, un tag et une release GitHub
- Publie sur NPM (optionnel)

### Job 2: Create Release Branch
- **S'exécute automatiquement si une release est créée**
- **Crée une branche `release/vX.Y` automatiquement** ⭐ (version majeure.mineure uniquement)
- Pousse la branche sur GitHub

## 🔧 Utilisation

### Étape 1: Faire un commit avec conventional commits

```bash
git add .
git commit -m "feat: ajout d'une nouvelle fonctionnalité"
git push origin master
```

### Étape 2: Lancer le workflow manuellement

1. Aller sur GitHub → **Actions**
2. Sélectionner le workflow **"Release"**
3. Cliquer sur **"Run workflow"**
4. Cliquer sur **"Run workflow"** (le workflow s'exécutera automatiquement sur master)

### Étape 3: Résultat

Le workflow va automatiquement:

1. ✅ Analyser les commits depuis la dernière version
2. ✅ Déterminer le nouveau numéro de version
3. ✅ Générer le CHANGELOG
4. ✅ Créer un commit de release
5. ✅ Créer un tag Git (ex: `v1.0.0`)
6. ✅ Créer une release GitHub
7. ✅ Publier sur NPM (si configuré)
8. ✅ **Créer une branche `release/v1.0` automatiquement** ⭐ (version majeure.mineure uniquement)

### Vérifier la branche créée

```bash
# Récupérer les dernières modifications
git fetch

# Lister les branches release
git branch -r | grep release

# Checkout la branche release (optionnel)
# Si votre version est 1.0.3, la branche sera release/v1.0
git checkout release/v1.0
```

## 📝 Convention de commits (Conventional Commits)

| Type | Version | Exemple |
|------|---------|---------|
| `fix:` | patch (1.0.0 → 1.0.1) | `git commit -m "fix: correction bug"` |
| `feat:` | minor (1.0.0 → 1.1.0) | `git commit -m "feat: nouvelle fonctionnalité"` |
| `feat!:` ou `BREAKING CHANGE:` | major (1.0.0 → 2.0.0) | `git commit -m "feat!: changement breaking"` |

## 🔐 Configuration requise

### Permissions GitHub Actions

⚠️ **Important** - Activer les permissions d'écriture :

1. Aller dans **Settings** → **Actions** → **General**
2. Dans "Workflow permissions", sélectionner **"Read and write permissions"**
3. Cocher **"Allow GitHub Actions to create and approve pull requests"**

### Secrets GitHub (optionnel pour NPM)

Si vous voulez publier sur NPM :

1. Créer un token sur [npmjs.com](https://www.npmjs.com/)
2. Aller dans **Settings** → **Secrets and variables** → **Actions**
3. Créer un secret nommé `NPM_TOKEN`
4. Coller votre token NPM

Le `GITHUB_TOKEN` est fourni automatiquement par GitHub Actions.

## 🧪 Test de la configuration

Vérifiez que tout est bien configuré :

```bash
./check-setup.sh
```

## 📁 Structure du projet

```
semantic-release-js/
├── .github/
│   └── workflows/
│       └── release.yml          # Workflow GitHub Actions ⭐
├── .releaserc.js                # Configuration semantic-release
├── .nvmrc                       # Version Node.js (v24.11.1)
├── CHANGELOG.md                 # Changelog du projet
├── README.md                    # Documentation (ce fichier)
├── check-setup.sh               # Script de vérification
├── package.json                 # Dépendances
└── yarn.lock                    # Lock file Yarn
```

## 💡 Exemple complet

```bash
# 1. Développer une fonctionnalité
git checkout -b feat/ma-fonctionnalite
# ... faire des modifications ...

# 2. Commit avec conventional commits
git add .
git commit -m "feat: ajout d'une fonctionnalité géniale"

# 3. Merge dans master
git checkout master
git merge feat/ma-fonctionnalite
git push origin master

# 4. Sur GitHub Actions
# → Lancer le workflow "Release" manuellement

# 5. Vérifier le résultat
git fetch
git branch -a
# Vous verrez: remotes/origin/release/v1.1

# 6. La branche release est créée automatiquement! 🎉
# Note: La branche contient uniquement la version majeure.mineure (vX.Y)
# Par exemple: si la version est 1.1.0, la branche sera release/v1.1
```

## 📚 Documentation

- [Semantic Release](https://semantic-release.gitbook.io/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [GitHub Actions](https://docs.github.com/en/actions)

## 🎉 C'est prêt !

Votre projet est maintenant configuré pour utiliser semantic-release avec GitHub Actions. À chaque lancement du workflow, une branche `release/vX.Y` sera créée automatiquement si une nouvelle version est publiée.

**Note importante:** La branche de release utilise uniquement la version majeure.mineure (vX.Y), pas le patch. Par exemple:
- Version `1.0.0` → branche `release/v1.0`
- Version `1.1.5` → branche `release/v1.1`
- Version `2.0.3` → branche `release/v2.0`
