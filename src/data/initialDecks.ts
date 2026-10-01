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
      {
        id: "vp_13",
        german: "sich verlieben",
        translation: {
          uk: "закохуватися",
          en: "to fall in love",
        },
        preposition: "in (+Akk)",
        exampleGerman: "Er hat sich in sie verliebt.",
        exampleTranslation: {
          uk: "Він закохався в неї.",
          en: "He fell in love with her.",
        },
        partOfSpeech: "verb",
        notes: {
          uk: "Вимагає Знахідного відмінка (Akkusativ)",
          en: "Requires Accusative case (Akkusativ)",
          de: "Immer mit Akkusativ (in wen/was?)",
        },
      },
      {
        id: "vp_14",
        german: "beginnen",
        translation: {
          uk: "починати",
          en: "to begin / start",
        },
        preposition: "mit (+Dat)",
        exampleGerman: "Wir beginnen mit der Übung.",
        exampleTranslation: {
          uk: "Ми починаємо з вправи.",
          en: "We start with the exercise.",
        },
        partOfSpeech: "verb",
        notes: {
          uk: "Вимагає Давального відмінка (Dativ)",
          en: "Requires Dative case (Dativ)",
          de: "Immer mit Dativ (mit wem/was?)",
        },
      },
      {
        id: "vp_15",
        german: "arbeiten",
        translation: {
          uk: "працювати",
          en: "to work",
        },
        preposition: "als (+Nom) / bei (+Dat) / für (+Akk)",
        exampleGerman: "Er arbeitet bei Siemens als Ingenieur.",
        exampleTranslation: {
          uk: "Він працює в Siemens інженером.",
          en: "He works at Siemens as an engineer.",
        },
        partOfSpeech: "verb",
        notes: {
          uk: "bei + Dativ (у компанії), als + Nominativ (ким), für + Akkusativ (на кого)",
          en: "bei + Dative (company), als + Nominative (role), für + Accusative (for whom)",
          de: "bei + Dativ (Firma), als + Nominativ (Beruf), für + Akkusativ",
        },
      },
      {
        id: "vp_16",
        german: "sich bewerben",
        translation: {
          uk: "подавати заявку (на посаду / у компанію)",
          en: "to apply for",
        },
        preposition: "um (+Akk) / bei (+Dat)",
        exampleGerman: "Sie bewirbt sich bei der Firma um die Stelle.",
        exampleTranslation: {
          uk: "Вона подає заяву в компанію на цю посаду.",
          en: "She is applying to the company for the position.",
        },
        partOfSpeech: "verb",
        notes: {
          uk: "um + Akkusativ (на що), bei + Dativ (у яку компанію)",
          en: "um + Accusative (for what), bei + Dative (at/to company)",
          de: "um + Akkusativ (Stelle), bei + Dativ (Firma)",
        },
      },
      {
        id: "vp_17",
        german: "sich vorbereiten",
        translation: {
          uk: "готуватися",
          en: "to prepare for",
        },
        preposition: "auf (+Akk)",
        exampleGerman: "Wir bereiten uns auf die Prüfung vor.",
        exampleTranslation: {
          uk: "Ми готуємося до іспиту.",
          en: "We are preparing for the exam.",
        },
        partOfSpeech: "verb",
        notes: {
          uk: "Вимагає Знахідного відмінка (Akkusativ)",
          en: "Requires Accusative case (Akkusativ)",
          de: "Immer mit Akkusativ (auf wen/was?)",
        },
      },
      {
        id: "vp_18",
        german: "sich erholen",
        translation: {
          uk: "відпочивати / відновлюватися",
          en: "to recover / rest from",
        },
        preposition: "von (+Dat)",
        exampleGerman: "Er erholt sich vom Stress.",
        exampleTranslation: {
          uk: "Він відновлюється після стресу.",
          en: "He is recovering from stress.",
        },
        partOfSpeech: "verb",
        notes: {
          uk: "Вимагає Давального відмінка (Dativ)",
          en: "Requires Dative case (Dativ)",
          de: "Immer mit Dativ (von wem/was?)",
        },
      },
      {
        id: "vp_19",
        german: "lachen",
        translation: {
          uk: "сміятися",
          en: "to laugh at / about",
        },
        preposition: "über (+Akk)",
        exampleGerman: "Alle lachen über den Witz.",
        exampleTranslation: {
          uk: "Усі сміються з жарту.",
          en: "Everyone is laughing at the joke.",
        },
        partOfSpeech: "verb",
        notes: {
          uk: "Вимагає Знахідного відмінка (Akkusativ)",
          en: "Requires Accusative case (Akkusativ)",
          de: "Immer mit Akkusativ (über wen/was?)",
        },
      },
      {
        id: "vp_20",
        german: "zufrieden sein",
        translation: {
          uk: "бути задоволеним",
          en: "to be satisfied / happy with",
        },
        preposition: "mit (+Dat)",
        exampleGerman: "Ich bin mit dem Ergebnis zufrieden.",
        exampleTranslation: {
          uk: "Я задоволений результатом.",
          en: "I am satisfied with the result.",
        },
        partOfSpeech: "phrase",
        notes: {
          uk: "Вимагає Давального відмінка (Dativ)",
          en: "Requires Dative case (Dativ)",
          de: "Immer mit Dativ (mit wem/was?)",
        },
      },
      {
        id: "vp_21",
        german: "wütend sein",
        translation: {
          uk: "бути розлюченим",
          en: "to be angry at / about",
        },
        preposition: "auf (+Akk) / über (+Akk)",
        exampleGerman: "Er ist wütend auf seinen Bruder.",
        exampleTranslation: {
          uk: "Він розлючений на свого брата.",
          en: "He is angry at his brother.",
        },
        partOfSpeech: "phrase",
        notes: {
          uk: "auf + Akkusativ (на когось), über + Akkusativ (через щось)",
          en: "auf + Accusative (at someone), über + Accusative (about something)",
          de: "auf + Akkusativ (Person), über + Akkusativ (Situation)",
        },
      },
      {
        id: "vp_22",
        german: "beneiden",
        translation: {
          uk: "заздрити",
          en: "to envy for",
        },
        preposition: "um (+Akk)",
        exampleGerman: "Ich beneide dich um deinen Erfolg.",
        exampleTranslation: {
          uk: "Я заздрю твоєму успіху.",
          en: "I envy you for your success.",
        },
        partOfSpeech: "verb",
        notes: {
          uk: "Вимагає Знахідного відмінка (Akkusativ)",
          en: "Requires Accusative case (Akkusativ)",
          de: "Immer mit Akkusativ (um wen/was?)",
        },
      },
      {
        id: "vp_23",
        german: "sich amüsieren",
        translation: {
          uk: "розважатися / веселитися",
          en: "to have fun / be amused by",
        },
        preposition: "über (+Akk)",
        exampleGerman: "Wir amüsieren uns über den Film.",
        exampleTranslation: {
          uk: "Ми веселимося від фільму.",
          en: "We are amused by the movie.",
        },
        partOfSpeech: "verb",
        notes: {
          uk: "Вимагає Знахідного відмінка (Akkusativ)",
          en: "Requires Accusative case (Akkusativ)",
          de: "Immer mit Akkusativ (über wen/was?)",
        },
      },
      {
        id: "vp_24",
        german: "sich streiten",
        translation: {
          uk: "сваритися",
          en: "to argue / fight about / with",
        },
        preposition: "über (+Akk) / mit (+Dat)",
        exampleGerman: "Sie streiten sich über Kleinigkeiten.",
        exampleTranslation: {
          uk: "Вони сваряться через дрібниці.",
          en: "They argue about little things.",
        },
        partOfSpeech: "verb",
        notes: {
          uk: "über + Akkusativ (через що), mit + Dativ (з ким)",
          en: "über + Accusative (about what), mit + Dative (with whom)",
          de: "über + Akkusativ (Thema), mit + Dativ (Person)",
        },
      },
      {
        id: "vp_25",
        german: "sich aufregen",
        translation: {
          uk: "хвилюватися / дратуватися",
          en: "to get upset / agitated about",
        },
        preposition: "über (+Akk)",
        exampleGerman: "Reg dich nicht über ihn auf!",
        exampleTranslation: {
          uk: "Не нервуй через нього!",
          en: "Don't get upset about him!",
        },
        partOfSpeech: "verb",
        notes: {
          uk: "Вимагає Знахідного відмінка (Akkusativ)",
          en: "Requires Accusative case (Akkusativ)",
          de: "Immer mit Akkusativ (über wen/was?)",
        },
      },
      {
        id: "vp_26",
        german: "Spaß haben",
        translation: {
          uk: "отримувати задоволення",
          en: "to have fun with / enjoy",
        },
        preposition: "an (+Dat)",
        exampleGerman: "Die Kinder haben Spaß am Lernen.",
        exampleTranslation: {
          uk: "Діти отримують задоволення від навчання.",
          en: "The kids are having fun learning.",
        },
        partOfSpeech: "phrase",
        notes: {
          uk: "Вимагає Давального відмінка (Dativ)",
          en: "Requires Dative case (Dativ)",
          de: "Immer mit Dativ (an wem/was?)",
        },
      },
      {
        id: "vp_27",
        german: "Mitleid haben",
        translation: {
          uk: "жаліти / мати співчуття",
          en: "to feel pity / sympathy for",
        },
        preposition: "mit (+Dat)",
        exampleGerman: "Er hat Mitleid mit dem armen Hund.",
        exampleTranslation: {
          uk: "Він співчуває бідному собаці.",
          en: "He feels pity for the poor dog.",
        },
        partOfSpeech: "phrase",
        notes: {
          uk: "Вимагає Давального відмінка (Dativ)",
          en: "Requires Dative case (Dativ)",
          de: "Immer mit Dativ (mit wem/was?)",
        },
      },
      {
        id: "vp_28",
        german: "glücklich sein",
        translation: {
          uk: "бути щасливим",
          en: "to be happy about / with",
        },
        preposition: "über (+Akk) / mit (+Dat)",
        exampleGerman: "Sie ist glücklich über die gute Note.",
        exampleTranslation: {
          uk: "Вона щаслива через гарну оцінку.",
          en: "She is happy about the good grade.",
        },
        partOfSpeech: "phrase",
        notes: {
          uk: "über + Akkusativ (через щось), mit + Dativ (із чимось)",
          en: "über + Accusative (about what), mit + Dative (with what)",
          de: "über + Akkusativ / mit + Dativ",
        },
      },
      {
        id: "vp_29",
        german: "sich ärgern",
        translation: {
          uk: "злитися / дратуватися",
          en: "to get angry about",
        },
        preposition: "über (+Akk)",
        exampleGerman: "Ich ärgere mich über den Stau.",
        exampleTranslation: {
          uk: "Я злюся через затор.",
          en: "I am annoyed about the traffic jam.",
        },
        partOfSpeech: "verb",
        notes: {
          uk: "Вимагає Знахідного відмінка (Akkusativ)",
          en: "Requires Accusative case (Akkusativ)",
          de: "Immer mit Akkusativ (über wen/was?)",
        },
      },
      {
        id: "vp_30",
        german: "sich ekeln",
        translation: {
          uk: "відчувати огиду / гидувати",
          en: "to be disgusted by",
        },
        preposition: "vor (+Dat)",
        exampleGerman: "Sie ekelt sich vor Spinnen.",
        exampleTranslation: {
          uk: "Вона гидує павуками.",
          en: "She is disgusted by spiders.",
        },
        partOfSpeech: "verb",
        notes: {
          uk: "Вимагає Давального відмінка (Dativ)",
          en: "Requires Dative case (Dativ)",
          de: "Immer mit Dativ (vor wem/was?)",
        },
      },
      {
        id: "vp_31",
        german: "überrascht sein",
        translation: {
          uk: "бути здивованим",
          en: "to be surprised by / about",
        },
        preposition: "über (+Akk)",
        exampleGerman: "Wir waren überrascht über seinen Besuch.",
        exampleTranslation: {
          uk: "Ми були здивовані його візитом.",
          en: "We were surprised by his visit.",
        },
        partOfSpeech: "phrase",
        notes: {
          uk: "Вимагає Знахідного відмінка (Akkusativ)",
          en: "Requires Accusative case (Akkusativ)",
          de: "Immer mit Akkusativ (über wen/was?)",
        },
      },
      {
        id: "vp_32",
        german: "staunen",
        translation: {
          uk: "дивуватися / захоплюватися",
          en: "to be astonished / amazed at",
        },
        preposition: "über (+Akk)",
        exampleGerman: "Alle staunen über seine Leistung.",
        exampleTranslation: {
          uk: "Усі дивуються його досягненню.",
          en: "Everyone is amazed at his achievement.",
        },
        partOfSpeech: "verb",
        notes: {
          uk: "Вимагає Знахідного відмінка (Akkusativ)",
          en: "Requires Accusative case (Akkusativ)",
          de: "Immer mit Akkusativ (über wen/was?)",
        },
      },
      {
        id: "vp_33",
        german: "stolz sein",
        translation: {
          uk: "пишатися",
          en: "to be proud of",
        },
        preposition: "auf (+Akk)",
        exampleGerman: "Die Eltern sind stolz auf ihr Kind.",
        exampleTranslation: {
          uk: "Батьки пишаються своєю дитиною.",
          en: "The parents are proud of their child.",
        },
        partOfSpeech: "phrase",
        notes: {
          uk: "Вимагає Знахідного відмінка (Akkusativ)",
          en: "Requires Accusative case (Akkusativ)",
          de: "Immer mit Akkusativ (auf wen/was?)",
        },
      },
      {
        id: "vp_34",
        german: "sich begeistern",
        translation: {
          uk: "захоплюватися",
          en: "to be enthusiastic about",
        },
        preposition: "für (+Akk)",
        exampleGerman: "Er begeistert sich für Fotografie.",
        exampleTranslation: {
          uk: "Він захоплюється фотографією.",
          en: "He is passionate about photography.",
        },
        partOfSpeech: "verb",
        notes: {
          uk: "Вимагає Знахідного відмінка (Akkusativ)",
          en: "Requires Accusative case (Akkusativ)",
          de: "Immer mit Akkusativ (für wen/was?)",
        },
      },
      {
        id: "vp_35",
        german: "hoffen",
        translation: {
          uk: "сподіватися",
          en: "to hope for",
        },
        preposition: "auf (+Akk)",
        exampleGerman: "Wir hoffen auf besseres Wetter.",
        exampleTranslation: {
          uk: "Ми сподіваємося на кращу погоду.",
          en: "We hope for better weather.",
        },
        partOfSpeech: "verb",
        notes: {
          uk: "Вимагає Знахідного відмінка (Akkusativ)",
          en: "Requires Accusative case (Akkusativ)",
          de: "Immer mit Akkusativ (auf wen/was?)",
        },
      },
      {
        id: "vp_36",
        german: "sich fürchten",
        translation: {
          uk: "боятися",
          en: "to be afraid of",
        },
        preposition: "vor (+Dat)",
        exampleGerman: "Er fürchtet sich vor der Dunkelheit.",
        exampleTranslation: {
          uk: "Він боїться темряви.",
          en: "He is afraid of the dark.",
        },
        partOfSpeech: "verb",
        notes: {
          uk: "Вимагає Давального відмінка (Dativ)",
          en: "Requires Dative case (Dativ)",
          de: "Immer mit Dativ (vor wem/was?)",
        },
      },
      {
        id: "vp_37",
        german: "enttäuscht sein",
        translation: {
          uk: "бути розчарованим",
          en: "to be disappointed with / by",
        },
        preposition: "von (+Dat)",
        exampleGerman: "Ich bin enttäuscht von diesem Film.",
        exampleTranslation: {
          uk: "Я розчарований цим фільмом.",
          en: "I am disappointed with this movie.",
        },
        partOfSpeech: "phrase",
        notes: {
          uk: "Вимагає Давального відмінка (Dativ)",
          en: "Requires Dative case (Dativ)",
          de: "Immer mit Dativ (von wem/was?)",
        },
      },
      {
        id: "vp_38",
        german: "sich sehnen",
        translation: {
          uk: "сумувати / тужити за",
          en: "to long for / yearn for",
        },
        preposition: "nach (+Dat)",
        exampleGerman: "Sie sehnt sich nach Ruhe.",
        exampleTranslation: {
          uk: "Вона прагне спокою.",
          en: "She longs for peace and quiet.",
        },
        partOfSpeech: "verb",
        notes: {
          uk: "Вимагає Давального відмінка (Dativ)",
          en: "Requires Dative case (Dativ)",
          de: "Immer mit Dativ (nach wem/was?)",
        },
      },
      {
        id: "vp_39",
        german: "schwärmen",
        translation: {
          uk: "захоплюватися / марити чимось",
          en: "to rave about / adore",
        },
        preposition: "für (+Akk)",
        exampleGerman: "Sie schwärmt für klassische Musik.",
        exampleTranslation: {
          uk: "Вона в захваті від класичної музики.",
          en: "She raves about classical music.",
        },
        partOfSpeech: "verb",
        notes: {
          uk: "Вимагає Знахідного відмінка (Akkusativ)",
          en: "Requires Accusative case (Akkusativ)",
          de: "Immer mit Akkusativ (für wen/was?)",
        },
      },
      {
        id: "vp_40",
        german: "sich Sorgen machen",
        translation: {
          uk: "хвилюватися / турбуватися",
          en: "to worry about",
        },
        preposition: "um (+Akk)",
        exampleGerman: "Die Mutter macht sich Sorgen um ihre Kinder.",
        exampleTranslation: {
          uk: "Мати хвилюється за своїх дітей.",
          en: "The mother worries about her children.",
        },
        partOfSpeech: "phrase",
        notes: {
          uk: "Вимагає Знахідного відмінка (Akkusativ)",
          en: "Requires Accusative case (Akkusativ)",
          de: "Immer mit Akkusativ (um wen/was?)",
        },
      },
      {
        id: "vp_41",
        german: "traurig sein",
        translation: {
          uk: "бути сумним",
          en: "to be sad about",
        },
        preposition: "über (+Akk)",
        exampleGerman: "Er ist traurig über den Abschied.",
        exampleTranslation: {
          uk: "Він засмучений через прощання.",
          en: "He is sad about the farewell.",
        },
        partOfSpeech: "phrase",
        notes: {
          uk: "Вимагає Знахідного відмінка (Akkusativ)",
          en: "Requires Accusative case (Akkusativ)",
          de: "Immer mit Akkusativ (über wen/was?)",
        },
      },
      {
        id: "vp_42",
        german: "anfangen",
        translation: {
          uk: "починати",
          en: "to start / begin",
        },
        preposition: "mit (+Dat)",
        exampleGerman: "Ich fange gleich mit der Arbeit an.",
        exampleTranslation: {
          uk: "Я зараз почну з роботи.",
          en: "I'll start with the work right away.",
        },
        partOfSpeech: "verb",
        notes: {
          uk: "Відокремлюваний префікс; вимагає Давального відмінка (Dativ)",
          en: "Separable prefix; requires Dative case (Dativ)",
          de: "Trennbares Verb; immer mit Dativ (mit wem/was?)",
        },
      },
      {
        id: "vp_43",
        german: "anrufen",
        translation: {
          uk: "телефонувати (комусь / кудись)",
          en: "to call / phone",
        },
        preposition: "bei (+Dat)",
        exampleGerman: "Frau Meiser ruft bei der Autofirma an.",
        exampleTranslation: {
          uk: "Пані Майзер телефонує в автомобільну фірму.",
          en: "Mrs. Meiser is calling the car company.",
        },
        partOfSpeech: "verb",
        notes: {
          uk: "Відокремлюваний префікс; bei + Dativ (дзвонити до установи/компанії)",
          en: "Separable prefix; bei + Dative (calling a place or institution)",
          de: "Trennbares Verb; bei + Dativ (Institution/Firma)",
        },
      },
      {
        id: "vp_44",
        german: "aufhören",
        translation: {
          uk: "припиняти / кидати",
          en: "to stop / quit",
        },
        preposition: "mit (+Dat)",
        exampleGerman: "Hör doch mit dem Rauchen auf!",
        exampleTranslation: {
          uk: "Припини нарешті курити!",
          en: "Stop smoking!",
        },
        partOfSpeech: "verb",
        notes: {
          uk: "Відокремлюваний префікс; вимагає Давального відмінка (Dativ)",
          en: "Separable prefix; requires Dative case (Dativ)",
          de: "Trennbares Verb; immer mit Dativ (mit wem/was?)",
        },
      },
      {
        id: "vp_45",
        german: "aufpassen",
        translation: {
          uk: "наглядати / стежити за",
          en: "to watch / look after",
        },
        preposition: "auf (+Akk)",
        exampleGerman: "Sie passt auf ihr Kind auf.",
        exampleTranslation: {
          uk: "Вона наглядає за своєю дитиною.",
          en: "She is looking after her child.",
        },
        partOfSpeech: "verb",
        notes: {
          uk: "Відокремлюваний префікс; вимагає Знахідного відмінка (Akkusativ)",
          en: "Separable prefix; requires Accusative case (Akkusativ)",
          de: "Trennbares Verb; immer mit Akkusativ (auf wen/was?)",
        },
      },
      {
        id: "vp_46",
        german: "aussteigen",
        translation: {
          uk: "виходити (з транспорту)",
          en: "to get off / exit (a vehicle)",
        },
        preposition: "aus (+Dat)",
        exampleGerman: "Am Bahnhof steigen wir aus dem Bus aus.",
        exampleTranslation: {
          uk: "На вокзалі ми виходимо з автобуса.",
          en: "At the station, we get off the bus.",
        },
        partOfSpeech: "verb",
        notes: {
          uk: "Відокремлюваний префікс; вимагає Давального відмінка (Dativ)",
          en: "Separable prefix; requires Dative case (Dativ)",
          de: "Trennbares Verb; immer mit Dativ (aus wem/was?)",
        },
      },
      {
        id: "vp_47",
        german: "sich beeilen",
        translation: {
          uk: "поспішати з",
          en: "to hurry with",
        },
        preposition: "mit (+Dat)",
        exampleGerman: "Sie beeilt sich mit der Arbeit.",
        exampleTranslation: {
          uk: "Вона поспішає з роботою.",
          en: "She hurries with the work.",
        },
        partOfSpeech: "verb",
        notes: {
          uk: "Вимагає Давального відмінка (Dativ)",
          en: "Requires Dative case (Dativ)",
          de: "Immer mit Dativ (mit wem/was?)",
        },
      },
      {
        id: "vp_48",
        german: "sich beschweren",
        translation: {
          uk: "скаржитися",
          en: "to complain",
        },
        preposition: "bei (+Dat) / über (+Akk)",
        exampleGerman: "Sie beschwert sich bei dem Direktor über den Kurs.",
        exampleTranslation: {
          uk: "Вона скаржиться директору на курс.",
          en: "She complains to the director about the course.",
        },
        partOfSpeech: "verb",
        notes: {
          uk: "bei + Dativ (кому), über + Akkusativ (на що)",
          en: "bei + Dative (to whom), über + Accusative (about what)",
          de: "bei + Dativ (Person/Instanz), über + Akkusativ (Grund/Thema)",
        },
      },
      {
        id: "vp_49",
        german: "danken",
        translation: {
          uk: "дякувати за",
          en: "to thank for",
        },
        preposition: "für (+Akk)",
        exampleGerman: "Ich danke Ihnen für Ihre Hilfe.",
        exampleTranslation: {
          uk: "Я дякую вам за вашу допомогу.",
          en: "I thank you for your help.",
        },
        partOfSpeech: "verb",
        notes: {
          uk: "jemandem (Dativ) für etwas (Akkusativ) danken",
          en: "someone (Dative) for something (Accusative)",
          de: "jemandem (Dativ) für etwas (Akkusativ)",
        },
      },
      {
        id: "vp_50",
        german: "diskutieren",
        translation: {
          uk: "дискутувати / обговорювати",
          en: "to discuss / debate",
        },
        preposition: "mit (+Dat) / über (+Akk)",
        exampleGerman: "Sie diskutieren über den Kinofilm.",
        exampleTranslation: {
          uk: "Вони обговорюють фільм у кіно.",
          en: "They are discussing the movie.",
        },
        partOfSpeech: "verb",
        notes: {
          uk: "mit + Dativ (з ким), über + Akkusativ (про що)",
          en: "mit + Dative (with whom), über + Accusative (about what)",
          de: "mit + Dativ (Person), über + Akkusativ (Thema)",
        },
      },
      {
        id: "vp_51",
        german: "einsteigen",
        translation: {
          uk: "сідати (у транспорт)",
          en: "to board / get in (a vehicle)",
        },
        preposition: "in (+Akk)",
        exampleGerman: "Herr Langer steigt in den Bus ein.",
        exampleTranslation: {
          uk: "Пан Лангер сідає в автобус.",
          en: "Mr. Langer gets on the bus.",
        },
        partOfSpeech: "verb",
        notes: {
          uk: "Відокремлюваний префікс; вимагає Знахідного відмінка (Akkusativ)",
          en: "Separable prefix; requires Accusative case (Akkusativ)",
          de: "Trennbares Verb; in + Akkusativ (Richtung/Einsteigen)",
        },
      },
      {
        id: "vp_52",
        german: "einziehen",
        translation: {
          uk: "заселятися / в'їжджати",
          en: "to move into",
        },
        preposition: "in (+Akk)",
        exampleGerman: "Wir ziehen am 1. Juni in die Wohnung ein.",
        exampleTranslation: {
          uk: "Ми переїжджаємо у квартиру 1 червня.",
          en: "We are moving into the apartment on June 1st.",
        },
        partOfSpeech: "verb",
        notes: {
          uk: "Відокремлюваний префікс; вимагає Знахідного відмінка (Akkusativ)",
          en: "Separable prefix; requires Accusative case (Akkusativ)",
          de: "Trennbares Verb; in + Akkusativ (Wohin?)",
        },
      },
      {
        id: "vp_53",
        german: "sich entschuldigen",
        translation: {
          uk: "вибачатися перед",
          en: "to apologize to",
        },
        preposition: "bei (+Dat) / für (+Akk)",
        exampleGerman: "Ich möchte mich bei Ihnen entschuldigen.",
        exampleTranslation: {
          uk: "Я хотів би вибачитися перед вами.",
          en: "I would like to apologize to you.",
        },
        partOfSpeech: "verb",
        notes: {
          uk: "bei + Dativ (перед ким), für + Akkusativ (за що)",
          en: "bei + Dative (to whom), für + Accusative (for what)",
          de: "bei + Dativ (Person), für + Akkusativ (Grund)",
        },
      },
      {
        id: "vp_54",
        german: "sich erinnern",
        translation: {
          uk: "згадувати / пам'ятати про",
          en: "to remember",
        },
        preposition: "an (+Akk)",
        exampleGerman: "Wir erinnern uns an den Urlaub.",
        exampleTranslation: {
          uk: "Ми згадуємо відпустку.",
          en: "We remember the vacation.",
        },
        partOfSpeech: "verb",
        notes: {
          uk: "Вимагає Знахідного відмінка (Akkusativ)",
          en: "Requires Accusative case (Akkusativ)",
          de: "Immer mit Akkusativ (an wen/was?)",
        },
      },
      {
        id: "vp_55",
        german: "glauben",
        translation: {
          uk: "вірити в",
          en: "to believe in",
        },
        preposition: "an (+Akk)",
        exampleGerman: "Sie glauben an Gott.",
        exampleTranslation: {
          uk: "Вони вірять у Бога.",
          en: "They believe in God.",
        },
        partOfSpeech: "verb",
        notes: {
          uk: "Вимагає Знахідного відмінка (Akkusativ)",
          en: "Requires Accusative case (Akkusativ)",
          de: "Immer mit Akkusativ (an wen/was?)",
        },
      },
      {
        id: "vp_56",
        german: "mitmachen",
        translation: {
          uk: "брати участь у",
          en: "to participate in / join in",
        },
        preposition: "bei (+Dat)",
        exampleGerman: "Sie macht beim Tennisspiel mit.",
        exampleTranslation: {
          uk: "Вона бере участь у грі в теніс.",
          en: "She takes part in the tennis match.",
        },
        partOfSpeech: "verb",
        notes: {
          uk: "Відокремлюваний префікс; вимагає Давального відмінка (Dativ)",
          en: "Separable prefix; requires Dative case (Dativ)",
          de: "Trennbares Verb; bei + Dativ",
        },
      },
      {
        id: "vp_57",
        german: "telefonieren",
        translation: {
          uk: "розмовляти по телефону з",
          en: "to talk on the phone with",
        },
        preposition: "mit (+Dat)",
        exampleGerman: "Er telefoniert mit seiner Frau.",
        exampleTranslation: {
          uk: "Він розмовляє телефоном зі своєю дружиною.",
          en: "He is talking on the phone with his wife.",
        },
        partOfSpeech: "verb",
        notes: {
          uk: "Вимагає Давального відмінка (Dativ)",
          en: "Requires Dative case (Dativ)",
          de: "Immer mit Dativ (mit wem?)",
        },
      },
      {
        id: "vp_58",
        german: "sich treffen",
        translation: {
          uk: "зустрічатися з",
          en: "to meet with",
        },
        preposition: "mit (+Dat)",
        exampleGerman: "Claudia trifft sich mit einer Freundin im Café.",
        exampleTranslation: {
          uk: "Клаудія зустрічається з подругою в кафе.",
          en: "Claudia meets up with a friend in a café.",
        },
        partOfSpeech: "verb",
        notes: {
          uk: "Вимагає Давального відмінка (Dativ)",
          en: "Requires Dative case (Dativ)",
          de: "Immer mit Dativ (mit wem?)",
        },
      },
      {
        id: "vp_59",
        german: "sich unterhalten",
        translation: {
          uk: "спілкуватися / бесідувати з",
          en: "to converse / chat with",
        },
        preposition: "mit (+Dat)",
        exampleGerman: "Er unterhält sich mit dem Freund.",
        exampleTranslation: {
          uk: "Він спілкується з другом.",
          en: "He is chatting with his friend.",
        },
        partOfSpeech: "verb",
        notes: {
          uk: "Невіддільний префікс; mit + Dativ (з ким), über + Akkusativ (про що)",
          en: "Inseparable prefix; mit + Dative (with whom), über + Accusative (about what)",
          de: "mit + Dativ (Person), über + Akkusativ (Thema)",
        },
      },
      {
        id: "vp_60",
        german: "zurechtkommen",
        translation: {
          uk: "ладнати / справлятися з",
          en: "to manage / cope / get by with",
        },
        preposition: "mit (+Dat)",
        exampleGerman: "Kommen Sie mit der neuen Maschine zurecht?",
        exampleTranslation: {
          uk: "Ви справляєтеся з новою машиною?",
          en: "Are you managing with the new machine?",
        },
        partOfSpeech: "verb",
        notes: {
          uk: "Відокремлюваний префікс; вимагає Давального відмінка (Dativ)",
          en: "Separable prefix; requires Dative case (Dativ)",
          de: "Trennbares Verb; immer mit Dativ (mit wem/was?)",
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
