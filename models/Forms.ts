import { KeyboardEvent } from "react";

export function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
	if (event.key === "Tab") {
		event.preventDefault();

		let element = event.target as HTMLTextAreaElement;

		// カーソル位置
		let cursorPosition = element.selectionStart;
		// カーソルの左右の文字列値
		let leftString = element.value.substring(0, cursorPosition);
		let rightString = element.value.substring(cursorPosition, element.value.length);

		element.value = leftString + "\t" + rightString;
		// カーソル位置をタブスペースの後ろにする
		element.selectionEnd = cursorPosition + 1;
	}
}
