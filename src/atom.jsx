import { atom, selector } from 'recoil';
import festivallist from './list.json';

export const festivals = atom({
	key: 'festivals',
	default: [...festivallist['festivallist']].sort((a, b) => {
		return b.hits - a.hits;
	})
});
