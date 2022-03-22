import { hideUIError, showUIError, startLoading, stopLoading } from "../../actions/ui";
import { types } from "../../types/types";

describe("Tests on ui actions", () => {
	test("All the actions should work", () => {
		const uiError = showUIError("999", "Test error message");

		expect(uiError).toEqual({
			type: types.uiShowError,
			payload: {
				errorCode: "999",
				message: "Test error message",
			},
		});

		expect(hideUIError()).toEqual({ type: types.uiHideError });

		expect(startLoading()).toEqual({ type: types.uiStartLoading });

		expect(stopLoading()).toEqual({ type: types.uiStopLoading });
	});
});
