import { Deck } from '../types';

export const INITIAL_DECKS: Deck[] = [
  {
    id: 'public_verbs_prep',
    title: 'Дієслова з прийменниками',
    description: 'Найважливіші німецькі дієслова з необхідними прийменниками та відмінками (A2-B1)',
    icon: '⚡',
    category: 'Граматика',
    isPublic: true,
    isPinned: true,
    createdAt: Date.now() - 1000000,
    updatedAt: Date.now() - 1000000,
    cards: [
      {
        id: 'vp_1',
        german: 'warten',
        translation: 'чекати',
        preposition: 'auf (+Akk)',
        exampleGerman: 'Ich warte auf den Bus.',
        exampleTranslation: 'Я чекаю на автобус.',
        partOfSpeech: 'verb',
        notes: 'Вимагає Знахідного відмінка (Akkusativ)'
      },
      {
        id: 'vp_2',
        german: 'denken',
        translation: 'думати',
        preposition: 'an (+Akk)',
        exampleGerman: 'Denkst du an die Zukunft?',
        exampleTranslation: 'Ти думаєш про майбутнє?',
        partOfSpeech: 'verb'
      },
      {
        id: 'vp_3',
        german: 'sich interessieren',
        translation: 'цікавитися',
        preposition: 'für (+Akk)',
        exampleGerman: 'Er interessiert sich für deutsche Kultur.',
        exampleTranslation: 'Він цікавиться німецькою культурою.',
        partOfSpeech: 'verb'
      },
      {
        id: 'vp_4',
        german: 'träumen',
        translation: 'мріяти',
        preposition: 'von (+Dat)',
        exampleGerman: 'Sie träumt von einer großen Reise.',
        exampleTranslation: 'Вона мріє про велику подорож.',
        partOfSpeech: 'verb',
        notes: 'Вимагає Давального відмінка (Dativ)'
      },
      {
        id: 'vp_5',
        german: 'sprechen',
        translation: 'говорити',
        preposition: 'mit (+Dat) / über (+Akk)',
        exampleGerman: 'Wir sprechen mit dem Lehrer über die Aufgaben.',
        exampleTranslation: 'Ми говоримо з учителем про завдання.',
        partOfSpeech: 'verb'
      },
      {
        id: 'vp_6',
        german: 'sich freuen',
        translation: 'радіти (майбутньому)',
        preposition: 'auf (+Akk)',
        exampleGerman: 'Wir freuen uns auf die Ferien.',
        exampleTranslation: 'Ми радіємо майбутнім канікулам.',
        partOfSpeech: 'verb',
        notes: 'auf = радіти тому, що має статися'
      },
      {
        id: 'vp_7',
        german: 'sich freuen',
        translation: 'радіти (теперішньому / подарунку)',
        preposition: 'über (+Akk)',
        exampleGerman: 'Ich freue mich über dein Geschenk.',
        exampleTranslation: 'Я радію твоєму подарунку.',
        partOfSpeech: 'verb',
        notes: 'über = радіти тому, що вже відбулося або отримано'
      },
      {
        id: 'vp_8',
        german: 'abhängen',
        translation: 'залежати',
        preposition: 'von (+Dat)',
        exampleGerman: 'Das hängt vom Wetter ab.',
        exampleTranslation: 'Це залежить від погоди.',
        partOfSpeech: 'verb'
      },
      {
        id: 'vp_9',
        german: 'bitten',
        translation: 'просити',
        preposition: 'um (+Akk)',
        exampleGerman: 'Er bittet um Verzeihung.',
        exampleTranslation: 'Він просить вибачення.',
        partOfSpeech: 'verb'
      },
      {
        id: 'vp_10',
        german: 'sich kümmern',
        translation: 'піклуватися / дбати',
        preposition: 'um (+Akk)',
        exampleGerman: 'Sie kümmert sich um ihre kleine Schwester.',
        exampleTranslation: 'Вона піклується про свою молодшу сестру.',
        partOfSpeech: 'verb'
      },
      {
        id: 'vp_11',
        german: 'teilnehmen',
        translation: 'брати участь',
        preposition: 'an (+Dat)',
        exampleGerman: 'Möchtest du an dem Sprachkurs teilnehmen?',
        exampleTranslation: 'Ти хочеш взяти участь у мовному курсі?',
        partOfSpeech: 'verb'
      },
      {
        id: 'vp_12',
        german: 'gratulieren',
        translation: 'вітати',
        preposition: 'zu (+Dat)',
        exampleGerman: 'Ich gratuliere dir zum Geburtstag!',
        exampleTranslation: 'Вітаю тебе з днем народження!',
        partOfSpeech: 'verb'
      }
    ]
  },

  {
    id: 'public_nouns_articles',
    title: 'Іменники з артиклями та множиною',
    description: 'Топ базових іменників з артиклями der, die, das та формою множини (A1-A2)',
    icon: '📚',
    category: 'Основне',
    isPublic: true,
    isPinned: true,
    createdAt: Date.now() - 900000,
    updatedAt: Date.now() - 900000,
    cards: [
      {
        id: 'na_1',
        german: 'Tisch',
        article: 'der',
        plural: '-e',
        translation: 'стіл',
        exampleGerman: 'Der Tisch steht in der Küche.',
        exampleTranslation: 'Стіл стоїть на кухні.',
        partOfSpeech: 'noun'
      },
      {
        id: 'na_2',
        german: 'Haus',
        article: 'das',
        plural: '"-er (Häuser)',
        translation: 'будинок',
        exampleGerman: 'Das Haus ist sehr groß und schön.',
        exampleTranslation: 'Будинок дуже великий і красивий.',
        partOfSpeech: 'noun'
      },
      {
        id: 'na_3',
        german: 'Stadt',
        article: 'die',
        plural: '"-e (Städte)',
        translation: 'місто',
        exampleGerman: 'Berlin ist eine berühmte Stadt.',
        exampleTranslation: 'Берлін - відоме місто.',
        partOfSpeech: 'noun'
      },
      {
        id: 'na_4',
        german: 'Buch',
        article: 'das',
        plural: '"-er (Bücher)',
        translation: 'книга',
        exampleGerman: 'Ich lese ein spannendes Buch.',
        exampleTranslation: 'Я читаю захоплюючу книгу.',
        partOfSpeech: 'noun'
      },
      {
        id: 'na_5',
        german: 'Zeit',
        article: 'die',
        plural: '-en',
        translation: 'час',
        exampleGerman: 'Ich habe leider keine Zeit.',
        exampleTranslation: 'На жаль, у мене немає часу.',
        partOfSpeech: 'noun'
      },
      {
        id: 'na_6',
        german: 'Mensch',
        article: 'der',
        plural: '-en',
        translation: 'людина',
        exampleGerman: 'Jeder Mensch braucht Freunde.',
        exampleTranslation: 'Кожній людині потрібні друзі.',
        partOfSpeech: 'noun',
        notes: 'N-Deklination (der Mensch, den Menschen)'
      },
      {
        id: 'na_7',
        german: 'Frage',
        article: 'die',
        plural: '-n',
        translation: 'запитання / питання',
        exampleGerman: 'Haben Sie noch Fragen?',
        exampleTranslation: 'У вас ще є запитання?',
        partOfSpeech: 'noun'
      },
      {
        id: 'na_8',
        german: 'Antwort',
        article: 'die',
        plural: '-en',
        translation: 'відповідь',
        exampleGerman: 'Die Antwort war richtig.',
        exampleTranslation: 'Відповідь була правильною.',
        partOfSpeech: 'noun'
      },
      {
        id: 'na_9',
        german: 'Arbeit',
        article: 'die',
        plural: '-en',
        translation: 'робота',
        exampleGerman: 'Ich fahre jeden Tag zur Arbeit.',
        exampleTranslation: 'Я щодня їжджу на роботу.',
        partOfSpeech: 'noun'
      },
      {
        id: 'na_10',
        german: 'Kind',
        article: 'das',
        plural: '-er',
        translation: 'дитина',
        exampleGerman: 'Das Kind spielt im Garten.',
        exampleTranslation: 'Дитина грається в саду.',
        partOfSpeech: 'noun'
      }
    ]
  },

  {
    id: 'public_everyday_phrases',
    title: 'Повсякденні вирази та фразеологізми',
    description: 'Жаргонні та розмовні німецькі ідіоми для природного спілкування',
    icon: '💬',
    category: 'Розмовна мова',
    isPublic: true,
    isPinned: false,
    createdAt: Date.now() - 800000,
    updatedAt: Date.now() - 800000,
    cards: [
      {
        id: 'ep_1',
        german: 'Ich habe die Nase voll!',
        translation: 'З мене вистачить! / Надокучило!',
        exampleGerman: 'Ich habe die Nase voll von diesem Lärm!',
        exampleTranslation: 'З мене вистачить цього шуму!',
        partOfSpeech: 'phrase',
        notes: 'Буквально: "У мене повний ніс"'
      },
      {
        id: 'ep_2',
        german: 'Daumen drücken!',
        translation: 'Тримати кулачки! / Бажати успіху!',
        exampleGerman: 'Morgen habe ich eine Prüfung. – Ich drücke dir die Daumen!',
        exampleTranslation: 'Завтра в мене іспит. – Тримаю за тебе кулачки!',
        partOfSpeech: 'phrase'
      },
      {
        id: 'ep_3',
        german: 'Ich verstehe nur Bahnhof.',
        translation: 'Я абсолютно нічого не розумію.',
        exampleGerman: 'Kannst du das wiederholen? Ich verstehe nur Bahnhof.',
        exampleTranslation: 'Можеш повторити? Я взагалі нічого не розумію.',
        partOfSpeech: 'phrase',
        notes: 'Популярний вираз, буквально: "Я розумію тільки вокзал"'
      },
      {
        id: 'ep_4',
        german: 'Alles in Butter!',
        translation: 'Все чудово! / Все під контролем!',
        exampleGerman: 'Keine Sorge, alles ist in Butter!',
        exampleTranslation: 'Не хвилюйся, все в повному порядку!',
        partOfSpeech: 'phrase'
      },
      {
        id: 'ep_5',
        german: 'Ein Auge zudrücken',
        translation: 'Закрити очі на щось / пробачити помилку',
        exampleGerman: 'Der Lehrer hat ein Auge zugedrückt.',
        exampleTranslation: 'Учитель закрив очі на це.',
        partOfSpeech: 'phrase'
      },
      {
        id: 'ep_6',
        german: 'Das ist nicht mein Ding.',
        translation: 'Це не моє / мені це не до душі.',
        exampleGerman: 'Tanzen ist wirklich nicht mein Ding.',
        exampleTranslation: 'Танці - це дійсно не моє.',
        partOfSpeech: 'phrase'
      }
    ]
  },

  {
    id: 'public_travel_A1',
    title: 'Подорожі та орієнтування',
    description: 'Слова для вокзалів, готелів, аеропорту та навігації в місті',
    icon: '✈️',
    category: 'Подорожі',
    isPublic: true,
    isPinned: false,
    createdAt: Date.now() - 700000,
    updatedAt: Date.now() - 700000,
    cards: [
      {
        id: 'tr_1',
        german: 'Fahrkarte',
        article: 'die',
        plural: '-n',
        translation: 'квиток на проїзд',
        exampleGerman: 'Wo kann ich eine Fahrkarte kaufen?',
        exampleTranslation: 'Де я можу купити квиток?',
        partOfSpeech: 'noun'
      },
      {
        id: 'tr_2',
        german: 'Bahnhof',
        article: 'der',
        plural: '"-e (Bahnhöfe)',
        translation: 'залізничний вокзал',
        exampleGerman: 'Der Zug kommt am Hauptbahnhof an.',
        exampleTranslation: 'Потяг прибуває на головний вокзал.',
        partOfSpeech: 'noun'
      },
      {
        id: 'tr_3',
        german: 'Flughafen',
        article: 'der',
        plural: '"- (Flughäfen)',
        translation: 'аеропорт',
        exampleGerman: 'Wir müssen pünktlich am Flughafen sein.',
        exampleTranslation: 'Ми повинні бути в аеропорту вчасно.',
        partOfSpeech: 'noun'
      },
      {
        id: 'tr_4',
        german: 'Verspätung',
        article: 'die',
        plural: '-en',
        translation: 'запізнення / затримка',
        exampleGerman: 'Der Zug hat 15 Minuten Verspätung.',
        exampleTranslation: 'Потяг запізнюється на 15 хвилин.',
        partOfSpeech: 'noun'
      },
      {
        id: 'tr_5',
        german: 'Gleis',
        article: 'das',
        plural: '-e',
        translation: 'колія / платформа',
        exampleGerman: 'Der Zug fährt von Gleis 4 ab.',
        exampleTranslation: 'Потяг відправляється з 4-ї колії.',
        partOfSpeech: 'noun'
      }
    ]
  }
];
