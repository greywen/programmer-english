import { sentenceRepository, wordRepository, sentenceWordRepository } from "../repository";
import { CreateSentenceModel } from "../model/sentence";
import { translate } from "../utils/translate";
import { TranslateType } from "../common/enums";
import { sendEmail } from "../utils/emailHelper";


export class SentenceService {
    // async createSentenceAsync(createModel: CreateSentenceModel) {
    //     if (createModel.userId === 1) {
    //         let sentenceId = await sentenceRepository.insertAsync({ english: createModel.english, chinese: createModel.chinese, keyWords: createModel.keyWords.join(",") });
    //         createModel.word.forEach(async item => {
    //             let word = await translate(item.english, TranslateType.Word);
    //             let wordId = await wordRepository.insertAsync({ english: item.english, chinese: item.chinese, phonetic: word.phonetic });
    //             await sentenceWordRepository.insertAsync({ sentenceId: sentenceId, wordId: wordId });
    //         });
    //         return sentenceId;
    //     }
    //     let html = "";
    //     for (let model in createModel) {
    //         if (!Array.isArray(model)) {
    //             html += `<p>${createModel[model]}< /p>`
    //         }
    //     }
    //     return await sendEmail({ subject: "CreateSentence", html: html, text: "CreateSentence" });
    // }
}

export default new SentenceService();