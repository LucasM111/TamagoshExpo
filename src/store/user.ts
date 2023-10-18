import { create } from 'zustand';

type UserState = {
    token: string | null;
    setToken: (token: string) => void;
};

const user = create<UserState>(set => ({
    token: null,
    setToken: token => set(() => ({ token })),
}));

export default user;