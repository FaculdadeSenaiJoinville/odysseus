export type EmailConfig = {
	to: string[];
	template: string;
	locals: {
		[key: string]: string | number;
	};
}