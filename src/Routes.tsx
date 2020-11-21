import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ErrorBoundary } from 'app/utils';

const Routes: React.FC = () => {
	const Tasks = React.lazy(
		() => import(/* webpackChunkName: "tasks-chunk"  */ './app/containers/Tasks/Tasks')
	);
	const Todo = React.lazy(
		() => import(/* webpackChunkName: "todo-chunk"  */ './app/containers/Todo/Todo')
	);
	const Form = React.lazy(
		() => import(/* webpackChunkName: "form-chunk"  */ './app/containers/Form/Form')
	);
	const Counter = React.lazy(
		() => import(/* webpackChunkName: "counter-chunk"  */ './app/containers/Counter/Counter')
	);
	const NotFound = React.lazy(
		() => import(/* webpackChunkName: "notfound-chunk"  */ './app/containers/NotFound/NotFound')
	);

	return (
		<main>
			<ErrorBoundary>
				<React.Suspense fallback={<strong>loading...</strong>}>
					<Switch>
						<Route exact path="/" component={Tasks} />
						<Route exact path="/todo" component={Todo} />
						<Route exact path="/counter" component={Counter} />
						<Route exact path="/form" component={Form} />
						<Route exact path="/404" component={NotFound} />
						<Redirect to="/404" />
					</Switch>
				</React.Suspense>
			</ErrorBoundary>
		</main>
	);
};

export { Routes };
