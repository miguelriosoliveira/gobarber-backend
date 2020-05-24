import { parseISO } from 'date-fns';
import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();

appointmentsRouter.get('/', async (request, response) => {
	const appointmentsRepository = getCustomRepository(AppointmentsRepository);
	const allAppointments = await appointmentsRepository.find();
	return response.json(allAppointments);
});

appointmentsRouter.post('/', async (request, response) => {
	const { provider, date } = request.body;

	const parsedDate = parseISO(date);
	const createService = new CreateAppointmentService();

	try {
		const newAppointment = await createService.execute({ provider, date: parsedDate });
		return response.json(newAppointment);
	} catch (error) {
		return response.status(400).json({ error: error.message });
	}
});

export default appointmentsRouter;