import store from "../redux/store";

export interface ICard {
    id?: string | undefined;
    title?: string;
    artistname?: string;
    picture: string;
    description?: string;
}

//Redux
export interface IState {
    loading?: boolean;
    error?: string | undefined;
    success?: boolean;
    cards?: ICard[];

}
export interface IAction {
    type?: string;
    payload?: any;
}
export interface ICardProps {
    galleryData: {
        title?: string;
        artistname?: string;
        picture?: string;
        description?: string;
    }

}
export type AppDispatch = typeof store.dispatch