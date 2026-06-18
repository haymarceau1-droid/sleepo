import { OnboardingQuestion } from '../types';

export const onboardingQuestions: OnboardingQuestion[] = [
  {
    id: 1,
    kind: 'narrative',
    title: 'Bienvenue, aventurier·ère de la nuit',
    narrative: `Le sommeil n'est pas une bataille à gagner. C'est un voyage, et chaque voyage commence par un premier pas.

Bienvenue dans Sleepo. Ici, pas de pression, pas de notes, pas de jugement. Juste toi, et la nuit.

Avant de commencer, laisse-moi apprendre à te connaître.`,
  },
  {
    id: 2,
    kind: 'choice',
    title: 'Choisis ton gardien de la nuit',
    narrative: 'Un esprit protecteur veillera sur ton sommeil. Lequel résonne avec toi ?',
    choices: [
      { value: 'loup', label: 'Le Loup', emoji: '🐺', description: 'Loyal, courageux, il protège la meute.' },
      { value: 'hibou', label: 'Le Hibou', emoji: '🦉', description: 'Sage, observateur, il connaît les secrets de la nuit.' },
      { value: 'renard', label: 'Le Renard', emoji: '🦊', description: 'Malin, adaptable, il trouve son chemin dans l\'obscurité.' },
      { value: 'cerf', label: 'Le Cerf', emoji: '🦌', description: 'Calme, majestueux, il marche en pleine conscience.' },
      { value: 'ours', label: 'L\'Ours', emoji: '🐻', description: 'Fort, apaise, il n\'a pas peur de l\'hibernation.' },
    ],
  },
  {
    id: 3,
    kind: 'slider',
    title: 'Ton énergie du moment',
    narrative: 'Où se trouve ton niveau d\'énergie en cet instant ?',
    sliderConfig: {
      min: 1,
      max: 10,
      step: 1,
      unit: '/10',
      labels: ['Épuisé·e', 'Plein·e d\'énergie'],
    },
  },
  {
    id: 4,
    kind: 'slider',
    title: 'L\'heure idéale',
    narrative: 'À quelle heure aimerais-tu idéalement glisser sous la couette ?',
    sliderConfig: {
      min: 20,
      max: 26,
      step: 0.5,
      unit: 'h',
      labels: ['20h00', '2h00'],
    },
  },
  {
    id: 5,
    kind: 'choice',
    title: 'Ton rituel préféré',
    narrative: 'Quelle est la petite chose qui t\'aide à déconnecter ?',
    choices: [
      { value: 'lecture', label: 'Lire', emoji: '📖', description: 'Quelques pages pour s\'évader.' },
      { value: 'musique', label: 'Écouter de la musique', emoji: '🎵', description: 'Une playlist douce pour s\'apaiser.' },
      { value: 'meditation', label: 'Méditer', emoji: '🧘', description: 'Respirer et se recentrer.' },
      { value: 'ecriture', label: 'Écrire', emoji: '✍️', description: 'Poser ses pensées sur le papier.' },
      { value: 'the', label: 'Une tisane', emoji: '🍵', description: 'Une boisson chaude qui réconforte.' },
    ],
  },
  {
    id: 6,
    kind: 'choice',
    title: 'L\'ambiance idéale',
    narrative: 'Dans quel environnement t\'endors-tu le mieux ?',
    choices: [
      { value: 'silence', label: 'Silence total', emoji: '🤫', description: 'Le calme absolu.' },
      { value: 'bruit_blanc', label: 'Bruit blanc', emoji: '🌊', description: 'Un fond sonore constant et rassurant.' },
      { value: 'obscurite', label: 'Obscurité complète', emoji: '🌑', description: 'Pas une once de lumière.' },
      { value: 'lumiere', label: 'Petite veilleuse', emoji: '🕯️', description: 'Une douce lueur pour se sentir en sécurité.' },
      { value: 'frais', label: 'Frais et aéré', emoji: '❄️', description: 'Une chambre fraîche, une fenêtre entrouverte.' },
    ],
  },
  {
    id: 7,
    kind: 'slider',
    title: 'Ton niveau de stress',
    narrative: 'À combien évalues-tu ton stress en cette période ?',
    sliderConfig: {
      min: 1,
      max: 10,
      step: 1,
      unit: '/10',
      labels: ['Serein·e', 'Très stressé·e'],
    },
  },
  {
    id: 8,
    kind: 'choice',
    title: 'Ton objectif principal',
    narrative: 'Qu\'est-ce qui te motive à améliorer ton sommeil ?',
    choices: [
      { value: 'energie', label: 'Plus d\'énergie', emoji: '⚡', description: 'Te réveiller en forme et dynamique.' },
      { value: 'calme', label: 'Plus de calme intérieur', emoji: '☮️', description: 'Apaiser ton mental avant la nuit.' },
      { value: 'regulier', label: 'Un rythme régulier', emoji: '🔄', description: 'Te coucher et te lever à heures fixes.' },
      { value: 'repos', label: 'Un sommeil réparateur', emoji: '💪', description: 'Te réveiller vraiment reposé·e.' },
      { value: 'deconnexion', label: 'Décrocher des écrans', emoji: '📵', description: 'Moins de temps sur ton téléphone le soir.' },
    ],
  },
  {
    id: 9,
    kind: 'choice',
    title: 'Ton son préféré pour t\'endormir',
    narrative: 'Si tu devais choisir un son pour t\'endormir, ce serait...',
    choices: [
      { value: 'pluie', label: 'La pluie', emoji: '🌧️', description: 'Le doux tambourinement sur le toit.' },
      { value: 'vagues', label: 'Les vagues', emoji: '🌊', description: 'Le va-et-vient apaisant de l\'océan.' },
      { value: 'foret', label: 'La forêt', emoji: '🌲', description: 'Le bruissement des feuilles et le chant des oiseaux.' },
      { value: 'feu', label: 'Le feu de cheminée', emoji: '🔥', description: 'Le crépitement chaleureux des flammes.' },
      { value: 'silence', label: 'Le silence', emoji: '🤫', description: 'Juste le calme, rien d\'autre.' },
    ],
  },
  {
    id: 10,
    kind: 'confirm',
    title: 'La Charte de l\'Aventurier·ère de la Nuit',
    narrative: `Je promets de :

• Prendre soin de mon sommeil, sans pression ni culpabilité
• Honorer mon rythme, même s'il n'est pas parfait
• Utiliser mes jokers sans honte quand j'en ai besoin
• Célébrer mes petites victoires, aussi modestes soient-elles
• Être bienveillant·e envers moi-même dans cette aventure

Prêt·e à signer la charte et commencer l'aventure ?`,
    choices: [
      { value: 'sign', label: 'Je signe !', emoji: '✍️', description: 'Commençons cette aventure ensemble.' },
    ],
  },
];

export const totalQuestions = onboardingQuestions.length;
