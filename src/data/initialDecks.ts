import { Deck } from "../types";

export const INITIAL_DECKS: Deck[] = [
  {
    id: "public_verbs_prep",
    title: "Verben mit Präpositionen",
    description:
      "Die wichtigsten deutschen Verben mit den dazugehörigen Präpositionen und Fällen (A2–B1)",
    icon: "⚡",
    type: "grammar",
    category: "Grammatik",
    isPublic: true,
    isPinned: true,
    createdAt: Date.now() - 1000000,
    updatedAt: Date.now() - 1000000,
    cards: [
      {
        id: "vp_1",
        german: "warten",
        translation: {
          uk: "чекати",
          en: "to wait",
        },
        preposition: "auf (+Akk)",
        exampleGerman: "Ich warte auf den Bus.",
        exampleTranslation: {
          uk: "Я чекаю на автобус.",
          en: "I am waiting for the bus.",
        },
        partOfSpeech: "verb",
        notes: {
          uk: "Вимагає Знахідного відмінка (Akkusativ)",
          en: "Requires Accusative case (Akkusativ)",
          de: "Immer mit Akkusativ (auf wen/was?)",
        },
      },
      {
        id: "vp_2",
        german: "denken",
        translation: {
          uk: "думати",
          en: "to think",
        },
        preposition: "an (+Akk)",
        exampleGerman: "Denkst du an die Zukunft?",
        exampleTranslation: {
          uk: "Ти думаєш про майбутнє?",
          en: "Are you thinking about the future?",
        },
        partOfSpeech: "verb",
        notes: {
          uk: "Вимагає Знахідного відмінка (Akkusativ)",
          en: "Requires Accusative case (Akkusativ)",
          de: "Immer mit Akkusativ (an wen/was?)",
        },
      },
      {
        id: "vp_3",
        german: "sich interessieren",
        translation: {
          uk: "цікавитися",
          en: "to be interested (in)",
        },
        preposition: "für (+Akk)",
        exampleGerman: "Er interessiert sich für deutsche Kultur.",
        exampleTranslation: {
          uk: "Він цікавиться німецькою культурою.",
          en: "He is interested in German culture.",
        },
        partOfSpeech: "verb",
        notes: {
          uk: "Вимагає Знахідного відмінка (Akkusativ)",
          en: "Requires Accusative case (Akkusativ)",
          de: "Immer mit Akkusativ (für wen/was?)",
        },
      },
      {
        id: "vp_4",
        german: "träumen",
        translation: {
          uk: "мріяти",
          en: "to dream",
        },
        preposition: "von (+Dat)",
        exampleGerman: "Sie träumt von einer großen Reise.",
        exampleTranslation: {
          uk: "Вона мріє про велику подорож.",
          en: "She dreams of a big trip.",
        },
        partOfSpeech: "verb",
        notes: {
          uk: "Вимагає Давального відмінка (Dativ)",
          en: "Requires Dative case (Dativ)",
          de: "Immer mit Dativ (von wem/was?)",
        },
      },
      {
        id: "vp_5",
        german: "sprechen",
        translation: {
          uk: "говорити",
          en: "to speak / talk",
        },
        preposition: "mit (+Dat) / über (+Akk)",
        exampleGerman: "Wir sprechen mit dem Lehrer über die Aufgaben.",
        exampleTranslation: {
          uk: "Ми говоримо з учителем про завдання.",
          en: "We are talking with the teacher about the tasks.",
        },
        partOfSpeech: "verb",
        notes: {
          uk: "mit + Dativ (з ким), über + Akkusativ (про що)",
          en: "mit + Dative (with whom), über + Accusative (about what)",
          de: "mit + Dativ (Person), über + Akkusativ (Thema)",
        },
      },
      {
        id: "vp_6",
        german: "sich freuen",
        translation: {
          uk: "радіти (майбутньому)",
          en: "to look forward to",
        },
        preposition: "auf (+Akk)",
        exampleGerman: "Wir freuen uns auf die Ferien.",
        exampleTranslation: {
          uk: "Ми радіємо майбутнім канікулам.",
          en: "We are looking forward to the holidays.",
        },
        partOfSpeech: "verb",
        notes: {
          uk: "auf = радіти тому, що має статися в майбутньому",
          en: "auf = looking forward to something in the future",
          de: "auf = für etwas in der Zukunft",
        },
      },
      {
        id: "vp_7",
        german: "sich freuen",
        translation: {
          uk: "радіти (теперішньому / подарунку)",
          en: "to be happy about (present/past)",
        },
        preposition: "über (+Akk)",
        exampleGerman: "Ich freue mich über dein Geschenk.",
        exampleTranslation: {
          uk: "Я радію твоєму подарунку.",
          en: "I am happy about your gift.",
        },
        partOfSpeech: "verb",
        notes: {
          uk: "über = радіти тому, що вже є або відбулося",
          en: "über = happy about something present or already received",
          de: "über = für etwas in der Gegenwart oder Vergangenheit",
        },
      },
      {
        id: "vp_8",
        german: "abhängen",
        translation: {
          uk: "залежати",
          en: "to depend",
        },
        preposition: "von (+Dat)",
        exampleGerman: "Das hängt vom Wetter ab.",
        exampleTranslation: {
          uk: "Це залежить від погоди.",
          en: "That depends on the weather.",
        },
        partOfSpeech: "verb",
        notes: {
          uk: "Вимагає Давального відмінка (Dativ)",
          en: "Requires Dative case (Dativ)",
          de: "Immer mit Dativ (von wem/was?)",
        },
      },
      {
        id: "vp_9",
        german: "bitten",
        translation: {
          uk: "просити",
          en: "to ask / request",
        },
        preposition: "um (+Akk)",
        exampleGerman: "Er bittet um Verzeihung.",
        exampleTranslation: {
          uk: "Він просить вибачення.",
          en: "He is asking for forgiveness.",
        },
        partOfSpeech: "verb",
        notes: {
          uk: "Вимагає Знахідного відмінка (Akkusativ)",
          en: "Requires Accusative case (Akkusativ)",
          de: "Immer mit Akkusativ (um wen/was?)",
        },
      },
      {
        id: "vp_10",
        german: "sich kümmern",
        translation: {
          uk: "піклуватися / дбати",
          en: "to take care of",
        },
        preposition: "um (+Akk)",
        exampleGerman: "Sie kümmert sich um ihre kleine Schwester.",
        exampleTranslation: {
          uk: "Вона піклується про свою молодшу сестру.",
          en: "She takes care of her little sister.",
        },
        partOfSpeech: "verb",
        notes: {
          uk: "Вимагає Знахідного відмінка (Akkusativ)",
          en: "Requires Accusative case (Akkusativ)",
          de: "Immer mit Akkusativ (um wen/was?)",
        },
      },
      {
        id: "vp_11",
        german: "teilnehmen",
        translation: {
          uk: "брати участь",
          en: "to participate / take part",
        },
        preposition: "an (+Dat)",
        exampleGerman: "Möchtest du an dem Sprachkurs teilnehmen?",
        exampleTranslation: {
          uk: "Ти хочеш взяти участь у мовному курсі?",
          en: "Would you like to participate in the language course?",
        },
        partOfSpeech: "verb",
        notes: {
          uk: "Вимагає Давального відмінка (Dativ)",
          en: "Requires Dative case (Dativ)",
          de: "Immer mit Dativ (an wem/was?)",
        },
      },
      {
        id: "vp_12",
        german: "gratulieren",
        translation: {
          uk: "вітати",
          en: "to congratulate",
        },
        preposition: "zu (+Dat)",
        exampleGerman: "Ich gratuliere dir zum Geburtstag!",
        exampleTranslation: {
          uk: "Вітаю тебе з днем народження!",
          en: "I congratulate you on your birthday!",
        },
        partOfSpeech: "verb",
        notes: {
          uk: "Вимагає Давального відмінка (Dativ)",
          en: "Requires Dative case (Dativ)",
          de: "jemandem (Dativ) zu etwas (Dativ)",
        },
      },
    ],
  },

  {
    id: "public_nouns_articles",
    title: "Nomen mit Artikeln und im Plural",
    description:
      "Die wichtigsten Grund Nomen mit den Artikeln „der“, „die“, „das“ und der Pluralform (A1–A2)",
    icon: "📚",
    type: "nouns",
    category: "Das Wichtigste",
    isPublic: true,
    isPinned: true,
    createdAt: Date.now() - 900000,
    updatedAt: Date.now() - 900000,
    cards: [
      {
        id: "na_1",
        german: "Tisch",
        article: "der",
        plural: "-e",
        translation: {
          uk: "стіл",
          en: "table",
        },
        exampleGerman: "Der Tisch steht in der Küche.",
        exampleTranslation: {
          uk: "Стіл стоїть на кухні.",
          en: "The table is in the kitchen.",
        },
        partOfSpeech: "noun",
      },
      {
        id: "na_2",
        german: "Haus",
        article: "das",
        plural: '"-er (Häuser)',
        translation: {
          uk: "будинок",
          en: "house",
        },
        exampleGerman: "Das Haus ist sehr groß und schön.",
        exampleTranslation: {
          uk: "Будинок дуже великий і красивий.",
          en: "The house is very big and beautiful.",
        },
        partOfSpeech: "noun",
      },
      {
        id: "na_3",
        german: "Stadt",
        article: "die",
        plural: '"-e (Städte)',
        translation: {
          uk: "місто",
          en: "city / town",
        },
        exampleGerman: "Berlin ist eine berühmte Stadt.",
        exampleTranslation: {
          uk: "Берлін — відоме місто.",
          en: "Berlin is a famous city.",
        },
        partOfSpeech: "noun",
      },
      {
        id: "na_4",
        german: "Buch",
        article: "das",
        plural: '"-er (Bücher)',
        translation: {
          uk: "книга",
          en: "book",
        },
        exampleGerman: "Ich lese ein spannendes Buch.",
        exampleTranslation: {
          uk: "Я читаю захоплюючу книгу.",
          en: "I am reading an exciting book.",
        },
        partOfSpeech: "noun",
      },
      {
        id: "na_5",
        german: "Zeit",
        article: "die",
        plural: "-en",
        translation: {
          uk: "час",
          en: "time",
        },
        exampleGerman: "Ich habe leider keine Zeit.",
        exampleTranslation: {
          uk: "На жаль, у мене немає часу.",
          en: "Unfortunately, I have no time.",
        },
        partOfSpeech: "noun",
      },
      {
        id: "na_6",
        german: "Mensch",
        article: "der",
        plural: "-en",
        translation: {
          uk: "людина",
          en: "human / person",
        },
        exampleGerman: "Jeder Mensch braucht Freunde.",
        exampleTranslation: {
          uk: "Кожній людині потрібні друзі.",
          en: "Every human needs friends.",
        },
        partOfSpeech: "noun",
        notes: {
          uk: "N-Deklination (der Mensch, den Menschen)",
          en: "N-Declension (der Mensch, den Menschen)",
        },
      },
      {
        id: "na_7",
        german: "Frage",
        article: "die",
        plural: "-n",
        translation: {
          uk: "запитання / питання",
          en: "question",
        },
        exampleGerman: "Haben Sie noch Fragen?",
        exampleTranslation: {
          uk: "У вас ще є запитання?",
          en: "Do you have any more questions?",
        },
        partOfSpeech: "noun",
      },
      {
        id: "na_8",
        german: "Antwort",
        article: "die",
        plural: "-en",
        translation: {
          uk: "відповідь",
          en: "answer",
        },
        exampleGerman: "Die Antwort war richtig.",
        exampleTranslation: {
          uk: "Відповідь була правильною.",
          en: "The answer was correct.",
        },
        partOfSpeech: "noun",
      },
      {
        id: "na_9",
        german: "Arbeit",
        article: "die",
        plural: "-en",
        translation: {
          uk: "робота",
          en: "work / job",
        },
        exampleGerman: "Ich fahre jeden Tag zur Arbeit.",
        exampleTranslation: {
          uk: "Я щодня їжджу на роботу.",
          en: "I drive to work every day.",
        },
        partOfSpeech: "noun",
      },
      {
        id: "na_10",
        german: "Kind",
        article: "das",
        plural: "-er",
        translation: {
          uk: "дитина",
          en: "child",
        },
        exampleGerman: "Das Kind spielt im Garten.",
        exampleTranslation: {
          uk: "Дитина грається в саду.",
          en: "The child is playing in the garden.",
        },
        partOfSpeech: "noun",
      },
    ],
  },

  {
    id: "public_everyday_phrases",
    title: "Alltägliche Ausdrücke und Redewendungen",
    description:
      "Umgangssprachliche deutsche Redewendungen für eine natürliche Kommunikation",
    icon: "💬",
    type: "phrases",
    category: "Umgangssprache",
    isPublic: true,
    isPinned: false,
    createdAt: Date.now() - 800000,
    updatedAt: Date.now() - 800000,
    cards: [
      {
        id: "ep_1",
        german: "Ich habe die Nase voll!",
        translation: {
          uk: "З мене вистачить! / Надокучило!",
          en: "I'm fed up! / I've had enough!",
        },
        exampleGerman: "Ich habe die Nase voll von diesem Lärm!",
        exampleTranslation: {
          uk: "З мене вистачить цього шуму!",
          en: "I'm fed up with this noise!",
        },
        partOfSpeech: "phrase",
        notes: {
          uk: 'Буквально: "У мене повний ніс"',
          en: 'Literally: "I have a full nose"',
        },
      },
      {
        id: "ep_2",
        german: "Daumen drücken!",
        translation: {
          uk: "Тримати кулачки! / Бажати успіху!",
          en: "Keep fingers crossed! / Good luck!",
        },
        exampleGerman:
          "Morgen habe ich eine Prüfung. – Ich drücke dir die Daumen!",
        exampleTranslation: {
          uk: "Завтра в мене іспит. – Тримаю за тебе кулачки!",
          en: "Tomorrow I have an exam. – I'll keep my fingers crossed for you!",
        },
        partOfSpeech: "phrase",
      },
      {
        id: "ep_3",
        german: "Ich verstehe nur Bahnhof.",
        translation: {
          uk: "Я абсолютно нічого не розумію.",
          en: "It's all Greek to me. / I don't understand a single thing.",
        },
        exampleGerman: "Kannst du das wiederholen? Ich verstehe nur Bahnhof.",
        exampleTranslation: {
          uk: "Можеш повторити? Я взагалі нічого не розумію.",
          en: "Could you repeat that? It's all Greek to me.",
        },
        partOfSpeech: "phrase",
        notes: {
          uk: 'Популярний вираз, буквально: "Я розумію тільки вокзал"',
          en: 'Popular idiom, literally: "I understand only train station"',
        },
      },
      {
        id: "ep_4",
        german: "Alles in Butter!",
        translation: {
          uk: "Все чудово! / Все під контролем!",
          en: "Everything's fine! / All good!",
        },
        exampleGerman: "Keine Sorge, alles ist in Butter!",
        exampleTranslation: {
          uk: "Не хвилюйся, все в повному порядку!",
          en: "Don't worry, everything is in order!",
        },
        partOfSpeech: "phrase",
      },
      {
        id: "ep_5",
        german: "Ein Auge zudrücken",
        translation: {
          uk: "Закрити очі на щось / пробачити помилку",
          en: "Turn a blind eye / let something slide",
        },
        exampleGerman: "Der Lehrer hat ein Auge zugedrückt.",
        exampleTranslation: {
          uk: "Учитель закрив очі на це.",
          en: "The teacher turned a blind eye to it.",
        },
        partOfSpeech: "phrase",
      },
      {
        id: "ep_6",
        german: "Das ist nicht mein Ding.",
        translation: {
          uk: "Це не моє / мені це не до душі.",
          en: "That's not my cup of tea / not my thing.",
        },
        exampleGerman: "Tanzen ist wirklich nicht mein Ding.",
        exampleTranslation: {
          uk: "Танці — це дійсно не моє.",
          en: "Dancing is really not my thing.",
        },
        partOfSpeech: "phrase",
      },
    ],
  },

  {
    id: "public_travel_A1",
    title: "Reisen und Orientierung",
    description:
      "Wörter für Bahnhöfe, Hotels, den Flughafen und die Orientierung in der Stadt",
    icon: "✈️",
    type: "nouns",
    category: "Reisen",
    isPublic: true,
    isPinned: false,
    createdAt: Date.now() - 700000,
    updatedAt: Date.now() - 700000,
    cards: [
      {
        id: "tr_1",
        german: "Fahrkarte",
        article: "die",
        plural: "-n",
        translation: {
          uk: "квиток на проїзд",
          en: "ticket (for travel)",
        },
        exampleGerman: "Wo kann ich eine Fahrkarte kaufen?",
        exampleTranslation: {
          uk: "Де я можу купити квиток?",
          en: "Where can I buy a ticket?",
        },
        partOfSpeech: "noun",
      },
      {
        id: "tr_2",
        german: "Bahnhof",
        article: "der",
        plural: '"-e (Bahnhöfe)',
        translation: {
          uk: "залізничний вокзал",
          en: "train station",
        },
        exampleGerman: "Der Zug kommt am Hauptbahnhof an.",
        exampleTranslation: {
          uk: "Потяг прибуває на головний вокзал.",
          en: "The train arrives at the central station.",
        },
        partOfSpeech: "noun",
      },
      {
        id: "tr_3",
        german: "Flughafen",
        article: "der",
        plural: '"- (Flughäfen)',
        translation: {
          uk: "аеропорт",
          en: "airport",
        },
        exampleGerman: "Wir müssen pünktlich am Flughafen sein.",
        exampleTranslation: {
          uk: "Ми повинні бути в аеропорту вчасно.",
          en: "We have to be at the airport on time.",
        },
        partOfSpeech: "noun",
      },
      {
        id: "tr_4",
        german: "Verspätung",
        article: "die",
        plural: "-en",
        translation: {
          uk: "запізнення / затримка",
          en: "delay",
        },
        exampleGerman: "Der Zug hat 15 Minuten Verspätung.",
        exampleTranslation: {
          uk: "Потяг запізнюється на 15 хвилин.",
          en: "The train is 15 minutes late.",
        },
        partOfSpeech: "noun",
      },
      {
        id: "tr_5",
        german: "Gleis",
        article: "das",
        plural: "-e",
        translation: {
          uk: "колія / платформа",
          en: "platform / track",
        },
        exampleGerman: "Der Zug fährt von Gleis 4 ab.",
        exampleTranslation: {
          uk: "Потяг відправляється з 4-ї колії.",
          en: "The train departs from platform 4.",
        },
        partOfSpeech: "noun",
      },
    ],
  },
];
