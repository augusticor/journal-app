import { authReducer } from "../../reducers/authReducer";
import { types } from "../../types/types";

describe("Tests on auth reducer", () => {
	test("Should match default case", () => {
		const state = authReducer({ name: "Test User" }, {});
		expect(state).toEqual({ name: "Test User" });
	});

	test("Should logout user cleaning the auth object", () => {
		const action = { type: types.logout };
		const state = authReducer({ uid: "23dDdsnerDiofreOIU643", name: "Loged user" }, action);

		expect(state).toEqual({});
	});

	test("Should login auth user", () => {
		const action = {
			type: types.login,
			payload: {
				uid: "23dDdsnerDiofreOIU643",
				displayName: "Testing useR",
			},
		};

		const state = authReducer({}, action);

		expect(state).toEqual({ uid: "23dDdsnerDiofreOIU643", name: "Testing useR" });
	});
});
