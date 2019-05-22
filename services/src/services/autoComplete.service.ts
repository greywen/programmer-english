import { wordRepository } from "../repository";

export class AutoCompleteService {
    async getWordByAutoComplete(query: string) {
        return await wordRepository.getWordByAutoCompleteAsync(query);
    }
}

export default new AutoCompleteService();