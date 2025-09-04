import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, ErrorHandler } from '@angular/core';
import {
	PreloadAllModules,
	provideRouter,
	withInMemoryScrolling,
	withPreloading,
	withViewTransitions,
} from '@angular/router';
import { GlobalErrorHandler } from '@core-services';
import { AuthInterceptor, EndpointInterceptor, ErrorHandlingInterceptor } from '@interceptors';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
	providers: [
		provideRouter(
			routes,
			withViewTransitions(),
			withPreloading(PreloadAllModules),
			withInMemoryScrolling({
				scrollPositionRestoration: 'enabled',
				anchorScrolling: 'enabled',
			}),
		),
		provideHttpClient(
			withInterceptors([
				AuthInterceptor, // Order matters: AuthInterceptor before ErrorInterceptor
				EndpointInterceptor,
				ErrorHandlingInterceptor,
			]),
		),
		{ provide: ErrorHandler, useClass: GlobalErrorHandler },
	],
};
