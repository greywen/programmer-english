import { BaseRepository } from "./base.repository";
import { SentenceWordEntity } from "./entity/sentenceWord.entity";

class SentenctWordRepository extends BaseRepository<SentenceWordEntity> {

}

export default new SentenctWordRepository({ table: "sentence_Word" });
