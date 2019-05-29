import { FeedbackType, UserResource } from "../enums";

export let FeedbackTypeArray = [FeedbackType.Feedback, FeedbackType.Word, FeedbackType.Bug];

export let UserDefaultResources = [
    UserResource.UserWordCreate, UserResource.UserWordDelete, UserResource.UserWordEdit, UserResource.UserWordListDisplay,
    UserResource.QuertionAnswerCreate, UserResource.FeedbackCreate,
    UserResource.ArticlePraise, UserResource.ArticleReview,
    UserResource.Donate
];