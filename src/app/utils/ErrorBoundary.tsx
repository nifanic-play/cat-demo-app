import React from 'react';

interface IErrorBoundaryProps {
	/**
	 * Callback function once error retry limit is reached
	 */
	callbackFunction?: () => void;
	/**
	 * Set the amount of times to retry a success state until error is captured
	 */
	retries: number;
	/**
	 * If error is caught, to show or not to show the error message
	 */
	showErrorMsg?: boolean;
	/**
	 * If showErrorMsg, then you can define a custom error message
	 */
	errorMsg?: string;
	/**
	 * Specify the content of your ErrorBoundary
	 */
	children?: JSX.Element[] | JSX.Element;
}

interface IErrorBoundaryState {
	hasError: boolean;
	errorCount: number;
}

class ErrorBoundary extends React.Component<IErrorBoundaryProps, IErrorBoundaryState> {
	static defaultProps = {
		retries: 0
	};

	constructor(props: IErrorBoundaryProps) {
		super(props);
		this.state = {
			hasError: false,
			errorCount: 0
		};
	}

	componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
		const { retries, callbackFunction } = this.props;
		if (retries >= 1) {
			this.setState((oldState) => ({
				errorCount: oldState.errorCount + 1
			}));
		} else {
			this.setState({
				hasError: true
			});
			if (typeof callbackFunction === 'function') callbackFunction();
			console.error(error, errorInfo);
		}
	}

	render() {
		const { children, retries } = this.props;
		const { errorCount, hasError } = this.state;

		if ((retries >= 1 && errorCount > retries) || hasError) {
			return null;
		}
		return children;
	}
}

export { ErrorBoundary };
