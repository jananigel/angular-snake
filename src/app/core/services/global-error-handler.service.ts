import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
	constructor() {}

	handleError(error: any): void {
		// All the errors from the Http will be handled by error.interceptor.ts
		if (error instanceof HttpErrorResponse) {
			console.error('HTTP Error (from Interceptor):', error.status, error.message);
		} else {
			// Handle other types of errors (e.g., component rendering errors, RxJS errors)
			console.error('Application Error:', error.message || error);
		}

		// Re-throw the error to ensure it's still logged by Angular's default error handler
		// or to allow other error handling mechanisms to pick it up if needed.
		throw error;
	}
}
