import { OnboardingQuestion } from '../types';

export const onboardingQuestions: OnboardingQuestion[] = [
  {
    id: 1,
    kind: 'choice',
    title: 'Choisis ton Gardien de la Nuit',
    narrative: 'Un compagnon veillera sur ton sommeil. Qui t\'accompagnera dans cette aventure ?',
    choices: [
      { value: 'hibou', label: 'Le Hibou Sage', emoji: '🦉', description: 'Sage et observateur, il connaît tous les secrets de la nuit.' },
      { value: 'renard', label: 'Le Renard Somnolent', emoji: '🦊', description: 'Malin et rusé, il sait trouver le chemin du sommeil.' },
      { value: 'chat', label: 'Le Chat de Gouttière', emoji: '🐱', description: 'Indépendant et curieux, il dort partout, tout le temps.' },
    ],
  },
  {
    id: 2,
    kind: 'choice',
    title: 'Le Boss Final',
    narrative: 'Quel est le plus grand obstacle entre toi et une bonne nuit ?',
    choices: [
      { value: 'doomscrolling', label: 'Doomscrolling', emoji: '📱', description: 'Le téléphone qui t\'aspire jusqu\'à tard.' },
      { value: 'overheat', label: 'Cerveau en surchauffe', emoji: '🧠', description: 'Les pensées qui tournent en boucle.' },
      { value: 'alarm', label: 'Panne de réveil', emoji: '⏰', description: 'Impossible de te lever à l\'heure.' },
      { value: 'irregular', label: 'Horaires irréguliers', emoji: '📉', description: 'Pas d\'horaire fixe, pas de rythme.' },
    ],
  },
  {
    id: 3,
    kind: 'slider',
    title: 'La Jauge d\'Énergie',
    narrative: 'Où se trouve ton niveau d\'énergie au réveil en ce moment ?',
    sliderConfig: {
      min: 1,
      max: 10,
      step: 1,
      unit: '/10',
      labels: ['Mode Zombie 🧟', 'Prêt pour un marathon 🏃'],
    },
  },
  {
    id: 4,
    kind: 'choice',
    title: 'Le Piège du Lit',
    narrative: 'Combien de temps passes-tu sur ton téléphone au lit avant de dormir ?',
    choices: [
      { value: '5min', label: '5 minutes', emoji: '⏱️', description: 'Un petit coup d\'œil rapide.' },
      { value: '30min', label: '30 minutes', emoji: '📱', description: 'Le temps de scroller un peu.' },
      { value: '1h+', label: '+ d\'une heure', emoji: '🕳️', description: 'Le gouffre sans fond des réseaux.' },
    ],
  },
  {
    id: 5,
    kind: 'choice',
    title: 'La Déconnexion',
    narrative: 'Quel est ton objectif de temps sans écran avant le coucher ?',
    choices: [
      { value: '10min', label: '10 minutes', emoji: '🌤️', description: 'Un petit break numérique.' },
      { value: '30min', label: '30 minutes', emoji: '🌙', description: 'Le temps de se poser.' },
      { value: '1h', label: '1 heure', emoji: '🌟', description: 'Une vraie déconnexion en bonne et due forme.' },
    ],
  },
  {
    id: 6,
    kind: 'choice',
    title: 'Le Carburant',
    narrative: 'Qu\'as-tu consommé cet après-midi ? (Plusieurs choix possibles)',
    choices: [
      { value: 'cafe', label: 'Café', emoji: '☕', description: 'Un petit noir ou un grand ?' },
      { value: 'energy', label: 'Boisson Énergie', emoji: '⚡', description: 'Pour tenir le coup.' },
      { value: 'the', label: 'Thé', emoji: '🍵', description: 'Une tasse réconfortante.' },
    ],
  },
  {
    id: 7,
    kind: 'choice',
    title: 'Le Climat',
    narrative: 'Comment est l\'environnement de ta chambre la nuit ?',
    choices: [
      { value: 'noir_calme', label: 'Noir & calme', emoji: '🌑', description: 'L\'obscurité totale et le silence.' },
      { value: 'bruyant', label: 'Rue bruyante', emoji: '🏙️', description: 'Les bruits de la ville qui filtrent.' },
      { value: 'led', label: 'LED clignotantes', emoji: '💡', description: 'Les petites lumières qui dansent.' },
    ],
  },
  {
    id: 8,
    kind: 'choice',
    title: 'Le Rythme Cible',
    narrative: 'À quelle heure aimerais-tu idéalement te réveiller ?',
    choices: [
      { value: '06:00', label: '6h00', emoji: '🌅', description: 'Matin tôt, pour profiter de l\'aube.' },
      { value: '07:00', label: '7h00', emoji: '☀️', description: 'Un réveil raisonnable.' },
      { value: '07:30', label: '7h30', emoji: '🌤️', description: 'La douceur du matin.' },
      { value: '08:00', label: '8h00', emoji: '😴', description: 'Une grasse matinée raisonnable.' },
      { value: '09:00', label: '9h00', emoji: '🛌', description: 'Pour les lève-tard assumés.' },
    ],
  },
  {
    id: 9,
    kind: 'choice',
    title: 'Le Mode de Jeu',
    narrative: 'Quel niveau de partage social te correspond ?',
    choices: [
      { value: 'solo', label: 'Ranger Solo', emoji: '🌲', description: 'Tu avances à ton rythme, en solitaire.' },
      { value: 'duo', label: 'Duo Co-op', emoji: '🤝', description: 'À deux, c\'est plus motivant.' },
      { value: 'circle', label: 'Sleep Circle', emoji: '🌌', description: 'Toute la constellation veille ensemble.' },
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
