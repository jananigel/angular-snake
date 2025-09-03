import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export const ErrorHandlingInterceptor: HttpInterceptorFn = (req, next) => {

	const httpErrorHandler = (error: HttpErrorResponse) => {
		switch (error.status) {
			case 401:
				// Handle 401 error
				break;
			default:
				console.error('HTTP Error caught by interceptor:', error);
				break;
		}
	};

	return next(req).pipe(
		catchError((error: HttpErrorResponse) => {
			httpErrorHandler(error);
			return throwError(() => error);
		}),
	);
};
