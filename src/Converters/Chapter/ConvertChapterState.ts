import { ChapterState } from "../../enums/ChapterState";
import { ServiceChapterState } from "../../enums/ServiceChapterState";


export function ChapterStateToService(state: ChapterState): ServiceChapterState {
    switch (state) {
        case ChapterState.Draft:
            return ServiceChapterState.Draft;
        case ChapterState.Finished:
            return ServiceChapterState.Finished;
        // case ChapterState.InvitesOnly:
        //     return ServiceChapterState.InvitesOnly;
        case ChapterState.Public:
            return ServiceChapterState.Public;
        default:
            return ServiceChapterState.Draft;
    }
}

export function ChapterStateServiceToState(state: ServiceChapterState): ChapterState {
    switch (state) {
        case ServiceChapterState.Draft:
            return ChapterState.Draft;
        case ServiceChapterState.Finished:
            return ChapterState.Finished;
        // case ServiceChapterState.InvitesOnly:
        //     return ChapterState.InvitesOnly;
        case ServiceChapterState.Public:
            return ChapterState.Public;
        default:
            return ChapterState.Draft;
    }
}