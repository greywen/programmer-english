import { prefix, router, authorize } from "../router";
import { CustomKoaContextModel } from "../model/common.model";
import { UserResource } from "../common/enums";
import autoCompleteService from "../services/autoComplete.service";

@prefix("/autoComplete")
class AutoCompleteController {
    @router({
        method: "get",
        path: "/word",
        unless: false
    })
    @authorize([UserResource.CreateWord, UserResource.EditWord])
    async word(ctx: CustomKoaContextModel) {
        ctx.body = await autoCompleteService.getWordByAutoComplete(ctx.query["query"]);
    }
}
