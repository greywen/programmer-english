export enum UserRoleType {
    Administrator = 1,
    Default = 2
}

export enum TranslateType {
    Word = 1,
    Sentence = 2
}

export enum FeedbackType {
    Feedback = 1,
    Word = 2,
    Bug = 3,
    Logo = 4
}

export enum AttachmentType {
    UserQuestion = 1
}

export enum UserHistoryType {
    Word = 1,
    Article = 2
}

export enum UserResource {
    // menu
    MenuDashboard = 1,
    MenuWord = 2,
    MenuArticle = 3,
    MenuMe = 4,

    // default

    UserWordCreate = 10,
    UserWordListDisplay = 11,
    UserWordEdit = 12,
    UserWordDelete = 13,

    QuertionAnswerCreate = 14,
    FeedbackCreate = 15,

    ArticleReview = 16, // 文章评论
    ArticlePraise = 17, // 文章点赞

    Donate = 18, // 捐赠

    WordCollect = 19,

    // administrator

    WordCreate = 100,
    WordEdit = 101,
    WordListDisplay = 102,
    WordDelete = 103
}