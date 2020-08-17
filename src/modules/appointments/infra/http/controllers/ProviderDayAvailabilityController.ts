import { Response, Request } from 'express';
import { container } from 'tsyringe';

import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';

export default class ProviderDayAvailabilityController {
	public async index(request: Request, response: Response): Promise<Response> {
		const { provider_id } = request.params;
		const { day, month, year } = request.query;

		const listProviderDayAvailabity = container.resolve(ListProviderDayAvailabilityService);
		const availability = await listProviderDayAvailabity.execute({ provider_id, day, month, year });

		return response.json(availability);
	}
}
