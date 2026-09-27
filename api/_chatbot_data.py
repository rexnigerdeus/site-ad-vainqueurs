"""
Données du chatbot du Temple des Vainqueurs.

Pour modifier une réponse : changez simplement le texte ci-dessous.
Pour ajouter une question : ajoutez un bloc dans QUESTIONS.
(Le fichier commence par "_" : Vercel ne le publie donc pas comme une route.)
"""
import calendar
from datetime import date, timedelta

# ---------------------------------------------------------------------------
# Liens et repères (à compléter / ajuster)
# ---------------------------------------------------------------------------
YOUTUBE = "https://www.youtube.com/@advainqueurs"
FACEBOOK = "https://www.facebook.com/Templevainqueurs7"
CARTE = "https://www.google.com/maps/search/?api=1&query=Temple+des+Vainqueurs+Vridi+Cite+Port-Bouet+Abidjan"

# Heure de la veillée du dernier vendredi du mois (ex: "20h00"). None = pas d'heure affichée.
HEURE_VEILLEE = "21h00"

# Repère pour trouver l'église (ex: "à côté de ..."). None = non affiché.
REPERE_ADRESSE = None

JOURS = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"]
MOIS = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet",
        "août", "septembre", "octobre", "novembre", "décembre"]


# ---------------------------------------------------------------------------
# Petit calendrier : calcule les rendez-vous mensuels automatiquement
# ---------------------------------------------------------------------------
def date_longue(d):
    jour = "1er" if d.day == 1 else str(d.day)
    return f"{JOURS[d.weekday()]} {jour} {MOIS[d.month - 1]} {d.year}"


def premier_dimanche(annee, mois):
    """Premier dimanche du mois (jeûne et prière)."""
    d = date(annee, mois, 1)
    return d + timedelta(days=(6 - d.weekday()) % 7)


def dernier_vendredi(annee, mois):
    """Dernier vendredi du mois (veillée)."""
    d = date(annee, mois, calendar.monthrange(annee, mois)[1])
    return d - timedelta(days=(d.weekday() - 4) % 7)


def prochaine_date(calcul, aujourdhui):
    """Prochaine occurrence (aujourd'hui inclus) d'un rendez-vous mensuel."""
    annee, mois = aujourdhui.year, aujourdhui.month
    for _ in range(2):
        d = calcul(annee, mois)
        if d >= aujourdhui:
            return d
        annee, mois = (annee + 1, 1) if mois == 12 else (annee, mois + 1)
    return calcul(annee, mois)


def reponse_prochaines_dates(aujourdhui=None):
    aujourdhui = aujourdhui or date.today()
    jeune = prochaine_date(premier_dimanche, aujourdhui)
    veillee = prochaine_date(dernier_vendredi, aujourdhui)
    heure_v = f" à {HEURE_VEILLEE}" if HEURE_VEILLEE else ""
    return (
        f"• Prochain jeûne et prière : {date_longue(jeune)}, à partir de 7h00 "
        f"(chaque premier dimanche du mois).\n"
        f"• Prochaine veillée : {date_longue(veillee)}{heure_v} "
        f"(chaque dernier vendredi du mois)."
    )


# ---------------------------------------------------------------------------
# Événements spéciaux (affichés « en cours » ou « à venir » selon la date)
# ---------------------------------------------------------------------------
EVENEMENTS = [
    {
        "titre": "PENIEL 2026 — mois de jeûne et de prière",
        "debut": date(2026, 11, 1),
        "fin": date(2026, 11, 30),
        "details": [
            "Du lundi au vendredi : prières de 5h30 à 6h30, de 12h30 à 13h30 et de 18h30 à 19h30",
            "Le samedi : prières de 5h30 à 6h30, puis de 16h à 18h",
            "Le dimanche : culte normal à 7h00, puis prière de 16h à 18h",
        ],
    },
]


def reponse_programme(aujourdhui=None):
    aujourdhui = aujourdhui or date.today()
    blocs = []
    for e in EVENEMENTS:
        if e["fin"] < aujourdhui:
            continue
        etat = "En cours" if e["debut"] <= aujourdhui else "À venir"
        lignes = [f"{etat} : {e['titre']}", f"Du {date_longue(e['debut'])} au {date_longue(e['fin'])}."]
        lignes += [f"• {x}" for x in e["details"]]
        blocs.append("\n".join(lignes))
    if not blocs:
        return "Aucun événement spécial n'est annoncé pour le moment. Nos rendez-vous habituels restent maintenus."
    return "\n\n".join(blocs)


def reponse_adresse():
    texte = "Le temple est situé à Vridi Cité, commune de Port-Bouët, à Abidjan."
    if REPERE_ADRESSE:
        texte += f" {REPERE_ADRESSE}"
    return texte


def reponse_horaires():
    veillee = f" à {HEURE_VEILLEE}" if HEURE_VEILLEE else ""
    return (
        "Voici nos rendez-vous :\n"
        "• Chaque dimanche : culte de 7h00 à 10h00\n"
        "• Chaque dimanche : les jeunes, à partir de 15h00\n"
        "• Chaque premier dimanche du mois : jeûne et prière, à partir de 7h00\n"
        f"• Chaque dernier vendredi du mois : veillée{veillee}"
    )


# ---------------------------------------------------------------------------
# Questions du chatbot. "answer" = texte, ou fonction (réponse calculée).
# "links" = liste de boutons-liens (chemin interne "/page" ou adresse https://).
# ---------------------------------------------------------------------------
MESSAGE_ACCUEIL = "Bonjour et bienvenue au Temple des Vainqueurs ! Choisissez une question ci-dessous."

QUESTIONS = [
    {
        "id": "jours-cultes",
        "question": "Quels sont les jours et horaires de culte ?",
        "answer": reponse_horaires,
    },
    {
        "id": "culte-dimanche",
        "question": "À quelle heure est le culte du dimanche ?",
        "answer": "Le culte a lieu chaque dimanche de 7h00 à 10h00.",
    },
    {
        "id": "jeunes",
        "question": "Y a-t-il des activités pour les jeunes ?",
        "answer": "Oui ! Les jeunes se retrouvent chaque dimanche à partir de 15h00 au Temple des Vainqueurs.",
    },
    {
        "id": "prochaines-dates",
        "question": "Quand sont le prochain jeûne et la prochaine veillée ?",
        "answer": reponse_prochaines_dates,
    },
    {
        "id": "programme",
        "question": "Quel est le programme en cours et à venir ?",
        "answer": reponse_programme,
        "links": [{"label": "Découvrir PENIEL 2026", "href": "/peniel"}],
    },
    {
        "id": "adresse",
        "question": "Où sommes-nous situés ?",
        "answer": reponse_adresse,
        "links": [{"label": "Voir la carte", "href": CARTE}],
    },
    {
        "id": "contact",
        "question": "Comment vous contacter ?",
        "answer": "Le plus simple : écrivez-nous sur WhatsApp (bouton vert en bas à droite du site) ou utilisez le formulaire de contact.",
        "links": [{"label": "Formulaire de contact", "href": "/contact"}],
    },
    {
        "id": "en-ligne",
        "question": "Où suivre les prédications en ligne ?",
        "answer": "Retrouvez les cultes et prédications sur notre chaîne YouTube et notre page Facebook.",
        "links": [
            {"label": "Chaîne YouTube", "href": YOUTUBE},
            {"label": "Page Facebook", "href": FACEBOOK},
            {"label": "Page Messages du site", "href": "/messages"},
        ],
    },
]
