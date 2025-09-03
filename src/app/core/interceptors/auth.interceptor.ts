import { HttpInterceptorFn } from '@angular/common/http';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
	const accessToken = '';
	const clonedRequest = req.clone({
		headers: req.headers.set('Authorization', `Bearer ${accessToken}`),
	});
	return next(clonedRequest);
};
