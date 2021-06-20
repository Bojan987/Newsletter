import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from './theme/theme';
import IntlWrapper from './intl/IntlWrapper';

ReactDOM.render(
	<BrowserRouter>
		<ThemeProvider theme={theme}>
			<IntlWrapper>
				<App />
			</IntlWrapper>
		</ThemeProvider>
	</BrowserRouter>,
	document.getElementById('root')
);
