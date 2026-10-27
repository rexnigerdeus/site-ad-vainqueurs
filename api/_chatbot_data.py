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

# ---------------------------------------------------------------------------
# PENIEL 2026 : du 1er au 29 novembre, ce programme remplace les rendez-vous habituels.
# (Même source que lib/peniel.ts côté site.)
# ---------------------------------------------------------------------------
PENIEL_DEBUT = date(2026, 11, 1)
PENIEL_FIN = date(2026, 11, 29)

# L'affiche ne donne pas l'heure de la veillée PENIEL du 27 novembre. None = pas d'heure affichée.
HEURE_VEILLEE_PENIEL = None

HORAIRES_PENIEL = [
    "Du lundi au vendredi : prière de 5h30 à 6h30, de 12h30 à 13h30 et de 18h30 à 19h30",
    "Le samedi : prière de 5h30 à 6h30, puis de 16h30 à 18h00",
    "Le dimanche : culte de louange et de célébration de 7h00 à 10h30, puis rencontre du soir de 16h30 à 18h30",
    "Le vendredi 27 novembre 2026 : veillée de prière",
]


def en_peniel(d):
    return PENIEL_DEBUT <= d <= PENIEL_FIN


def prochain_dimanche(aujourdhui):
    """Le dimanche qui vient (aujourd'hui s'il s'agit d'un dimanche)."""
    return aujourdhui + timedelta(days=(6 - aujourdhui.weekday()) % 7)

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
    if en_peniel(aujourdhui) or en_peniel(jeune):
        ligne_jeune = (
            f"• PENIEL 2026 : 4 semaines de jeûne et de prière, du {date_longue(PENIEL_DEBUT)} "
            f"au {date_longue(PENIEL_FIN)}."
        )
    else:
        ligne_jeune = (
            f"• Prochain jeûne et prière : {date_longue(jeune)}, à partir de 7h00 "
            f"(chaque premier dimanche du mois)."
        )
    if en_peniel(veillee):
        heure_v = f" à {HEURE_VEILLEE_PENIEL}" if HEURE_VEILLEE_PENIEL else ""
        ligne_veillee = f"• Prochaine veillée : {date_longue(veillee)}{heure_v} (veillée de prière de PENIEL)."
    else:
        heure_v = f" à {HEURE_VEILLEE}" if HEURE_VEILLEE else ""
        ligne_veillee = (
            f"• Prochaine veillée : {date_longue(veillee)}{heure_v} "
            f"(chaque dernier vendredi du mois)."
        )
    return f"{ligne_jeune}\n{ligne_veillee}"


# ---------------------------------------------------------------------------
# Événements spéciaux (affichés « en cours » ou « à venir » selon la date)
# ---------------------------------------------------------------------------
EVENEMENTS = [
    {
        "titre": "PENIEL 2026 — 4 semaines de jeûne et de prière (« Marche devant ma face et sois intègre », Genèse 17:1)",
        "debut": PENIEL_DEBUT,
        "fin": PENIEL_FIN,
        "details": [
            "Lancement le samedi 31 octobre 2026",
            *HORAIRES_PENIEL,
            "Sous-thèmes : « Ton Dieu ne t'a pas oublié », « Ne t'arrête pas », « Sois intègre », « Ton Dieu t'annonce quelque chose de grand »",
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


def reponse_horaires(aujourdhui=None):
    aujourdhui = aujourdhui or date.today()
    if en_peniel(aujourdhui):
        return (
            "Du 1er au 29 novembre, c'est PENIEL : toute l'église suit ce programme.\n"
            + "\n".join(f"• {x}" for x in HORAIRES_PENIEL)
        )
    veillee = f" à {HEURE_VEILLEE}" if HEURE_VEILLEE else ""
    texte = (
        "Voici nos rendez-vous :\n"
        "• Chaque dimanche : culte de 7h00 à 10h00\n"
        "• Chaque dimanche : les jeunes, à partir de 15h00\n"
        "• Chaque premier dimanche du mois : jeûne et prière, à partir de 7h00\n"
        f"• Chaque dernier vendredi du mois : veillée{veillee}"
    )
    if aujourdhui < PENIEL_DEBUT:
        texte += (
            "\n\nÀ partir du dimanche 1er novembre 2026 et jusqu'au 29 novembre, c'est PENIEL :\n"
            + "\n".join(f"• {x}" for x in HORAIRES_PENIEL)
        )
    return texte


def reponse_culte_dimanche(aujourdhui=None):
    aujourdhui = aujourdhui or date.today()
    if en_peniel(prochain_dimanche(aujourdhui)):
        return (
            "Pendant PENIEL (du 1er au 29 novembre), le culte de louange et de célébration a lieu "
            "le dimanche de 7h00 à 10h30, suivi d'une rencontre du soir de 16h30 à 18h30."
        )
    return "Le culte a lieu chaque dimanche de 7h00 à 10h00."


def reponse_jeunes(aujourdhui=None):
    aujourdhui = aujourdhui or date.today()
    if en_peniel(prochain_dimanche(aujourdhui)):
        return (
            "Pendant PENIEL (du 1er au 29 novembre), les jeunes suivent le programme de toute l'église. "
            "Les rencontres des jeunes du dimanche, à partir de 15h00, reprennent ensuite."
        )
    return "Oui ! Les jeunes se retrouvent chaque dimanche à partir de 15h00 au Temple des Vainqueurs."


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
        "answer": reponse_culte_dimanche,
    },
    {
        "id": "jeunes",
        "question": "Y a-t-il des activités pour les jeunes ?",
        "answer": reponse_jeunes,
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
