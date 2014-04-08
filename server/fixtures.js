if (Clients.find().count() === 0) {

	var now = new Date().getTime();

	// Add Test Clients
	// ------------------------------------------------
	var client1 = Clients.insert ({
		title: "Test Client 1",
		submitted: now - 7 * 3600 * 1000,
	});

	var client2 = Clients.insert ({
		title: "Test Client 2",
		submitted: now - 5 * 3600 * 1000,
	});

	var client3 = Clients.insert ({
		title: "Test Client 3",
		submitted: now - 3 * 3600 * 1000,
	});

}