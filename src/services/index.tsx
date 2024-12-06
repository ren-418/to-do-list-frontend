import { showToast } from "../context/helper";

const apiNotification = async (error: any, message: string = "") => {
	let response = error?.response;
	if (response === undefined) {
		return showToast("Network Error", "error");
	}
	let tempMessage = "";

	if (error?.name === "ValidateError") {
		tempMessage = error.message || message;
	} else {
		switch (response?.status) {
			case 403:
			case 400:
				let errMessage = response?.data?.message;
				if (typeof errMessage === 'string' && !!errMessage) {
					tempMessage = response?.data?.message;
				} else {
					tempMessage = message;
				}
				break;
			default:
				tempMessage = message;
				break;
		}
	}

	if (tempMessage) {
		showToast(tempMessage, "error");
	}
}

export { apiNotification }
