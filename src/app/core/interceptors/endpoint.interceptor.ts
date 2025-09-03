import { HttpInterceptorFn } from '@angular/common/http';

const endPointHandler = (url: string): string => {

	return '/api';
};

export const EndpointInterceptor: HttpInterceptorFn = (req, next) => {
	const endPoint = endPointHandler(req.url);
	const clonedRequest = req.clone({
		url: `${endPoint}/${req.url}`,
	});
	return next(clonedRequest);
};
