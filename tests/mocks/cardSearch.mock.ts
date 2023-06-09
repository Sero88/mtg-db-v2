import { elvishMystic, nissaVastwoodSeer } from "./cardApi.mock";

export const generalSearchMock = { data: [elvishMystic, nissaVastwoodSeer] };
export const generalSearchWithOneResultMock = { data: [elvishMystic] };
export const printSearchMock = { data: [elvishMystic] };

export const generalSearchMockResults = {
	object: "list",
	total_cards: 2,
	has_more: false,
	data: generalSearchMock.data,
};

export const generalSearchMockWithOneResults = {
	object: "list",
	total_cards: 1,
	has_more: false,
	data: generalSearchWithOneResultMock.data,
};

export const printSearchMockResults = {
	object: "list",
	total_cards: 1,
	has_more: false,
	data: printSearchMock.data,
};

export const noResultsMockSearch = {
	object: "list",
	total_cards: 0,
	has_more: false,
	data: [],
};
