const { User } = require('../../models');

module.exports = {
	post: (req, res) => {
		const { username, email, password } = req.body;
		User.findOrCreate({
			where: {
				email,
			},
			defaults: {
				username,
				password,
			},
		})
			.then(([user, created]) => {
				if (!created) {
					res.status(409).send('이미 존재하는 이메일입니다.');
				}
				const data = user.get({ plain: true });
				res.status(201).json(data);
			})
			.catch(err => res.status(500).send(err));
	},
};
