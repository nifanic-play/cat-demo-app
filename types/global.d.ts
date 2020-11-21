/** Global definitions for development **/
declare module '*.scss';
declare module '*.png';
declare module '*.md' {
	const content: string;
	export = content;
}
