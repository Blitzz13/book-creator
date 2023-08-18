import { BookState } from "../../enums/BookState";
import { ServiceBookState } from "../../enums/ServiceBookState";


export function BookStateToService(state: BookState): ServiceBookState {
    switch (state) {
        case BookState.Draft:
            return ServiceBookState.Draft;
        case BookState.Finished:
            return ServiceBookState.Finished;
        case BookState.InProgress:
            return ServiceBookState.InProgress;
        case BookState.InvitesOnly:
            return ServiceBookState.InvitesOnly;
        default:
            throw new Error(`State does not exist ${state}`);
    }
}

export function BookStateServiceToState(state: ServiceBookState): BookState {
    switch (state) {
        case ServiceBookState.Draft:
            return BookState.Draft;
        case ServiceBookState.Finished:
            return BookState.Finished;
        case ServiceBookState.InProgress:
            return BookState.InProgress;
        case ServiceBookState.InvitesOnly:
            return BookState.InvitesOnly;
        default:
            throw new Error(`State does not exist ${state}`);
    }
}