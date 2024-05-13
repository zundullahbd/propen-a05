const { db } = require('./lib/prisma');
const bcrypt = require('bcrypt');

const seed = async () => {
	const user = await db.user.createMany({
		data: [
			{
				username: 'admin',
				password: bcrypt.hashSync('password', 10),
				email: 'admin@example.com',
				role: 'Admin',
			},
			{
				username: 'customer-service',
				password: bcrypt.hashSync('password', 10),
				email: 'customer-service@example.com',
				role: 'CustomerService',
			},
			{
				username: 'sales',
				password: bcrypt.hashSync('password', 10),
				email: 'sales@example.com',
				role: 'Sales',
			},
            {
				username: 'executive',
				password: bcrypt.hashSync('password', 10),
				email: 'executive@example.com',
				role: 'Executive',
			},
		],
	});

	const customer = await db.customer.create({
		data: {
			outlet: 'Outlet Test',
			number: 'test',
			name: 'Customer Test',
			code: 'test',
            date: 'test',
            createdTime: 'test',
			referenceNumber: 'test',
			due: 'test',
			amount: 0,
			payment: 'test',
			fulfillment: 'test',
		},
	});

	const brand = await db.brand.create({
		data: {
			name: 'Brand Test',
			description: 'Brand Test',
			phone: 'test',
			website: 'test',
			service: 'test',
			facebook: 'test',
			instagram: 'test',
			twitter: 'test',
			image: 'test',
		},
	});

	const product = await db.product.create({
		data: {
			title: 'Product Test',
			price: 0,
			brandId: brand.id,
			brandName: brand.name,
		},
	});

	const sales = await db.sales.create({
		data: {
			customerId: customer.id,
			productId: product.id,
            outlet: 'test',
            number: 'test',
            name: 'test',
            code: 'test',
            referenceNumber: 'test',
            date: 'test',
            createdTime: 'test',
            due: 'test',
            amount: 0,
            payment: 'test',
            fulfillment: 'test'
    		},
	});

	const ticket = await db.ticket.create({
		data: {
			title: 'Ticket Test',
			customerId: customer.id,
			salesId: sales.id,
			category: 'KOMPLAIN',
			description: 'test',
			status: 'SUBMITTED',
		},
	});

	const ticket2 = await db.ticket.create({
		data: {
			title: 'Ticket Test 2',
			customerId: customer.id,
			salesId: sales.id,
			category: 'KOMPLAIN',
			description: 'test',
			status: 'SUBMITTED',
		},
	});

	const review = await db.review.create({
		data: {
			stars: 5,
			review: 'The customer service attitude was exceptional - friendly, understanding, and proactive in resolving my issue. Not to mention, the speed of service was remarkable; my concern was addressed swiftly and efficiently. Keep up the fantastic work!',
			ticketId: ticket.id,
			customerId: customer.id,

			attitude: true,
			speed: true,
			communication: true,
			outcome: false,
			efficiency: false,
		},
	});
};

(async () => {
	await seed();
})();