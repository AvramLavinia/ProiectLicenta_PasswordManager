import { store } from "./store";
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const UseAppDispatch: () => AppDispatch = useDispatch;
export const UseAppSelector: TypedUseSelectorHook<RootState> = useSelector;
