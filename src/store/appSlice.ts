import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppState {
	etapasConcluidas: Record<string, boolean>;
	funcionarios: { id: string; nome: string; cargo: string }[];
}

const initialState: AppState = {
	etapasConcluidas: {},
	funcionarios: [],
};

const appSlice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		marcarEtapaConcluida(state, action: PayloadAction<string>) {
			state.etapasConcluidas[action.payload] = true;
		},
		adicionarFuncionario(state, action: PayloadAction<{ id: string; nome: string; cargo: string }>) {
			state.funcionarios.push(action.payload);
		},
		editarFuncionario(state, action: PayloadAction<{ id: string; nome: string; cargo: string }>) {
			const index = state.funcionarios.findIndex(f => f.id === action.payload.id);
			if (index >= 0) {
				state.funcionarios[index] = action.payload;
			}
		},
	},
});

export const { marcarEtapaConcluida, adicionarFuncionario, editarFuncionario } = appSlice.actions;
export default appSlice.reducer;
