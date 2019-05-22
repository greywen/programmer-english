import { prefix, router, authorize } from "../router";
import { CustomKoaContextModel } from "../model/common.model";
import { UserResource } from "../common/enums";

@prefix("/autoComplete")
class AutoCompleteController {
    @router({
        method: "get",
        path: "/getWord",
        unless: true
    })
    @authorize([UserResource.CreateWord, UserResource.EditWord])
    async word(ctx: CustomKoaContextModel) {
        ctx.body = [];
    }
}
