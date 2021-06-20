import fs from 'fs';
import Category from '../../model/category';
import Post from '../../model/post';
import Comment from '../../model/comment';
import User from '../../model/user';

export const getStats = async (req, res, next) => {
	try {
		//* ~~~ CATEGORIES ~~~
		let CATEGORY_STATS = {};

		const postsCount = await Post.countDocuments();
		const categoriesCount = await Category.countDocuments();

		// Count posts per category
		const postsPerCategory = await Post.aggregate([
			{
				$match: {},
			},
			{
				$group: { _id: '$category', total: { $sum: 1 } },
			},
		]);

		// get percentages
		let percentages = [];

		postsPerCategory.forEach(el => {
			let num = Math.round((el.total * 100) / postsCount);
			percentages.push(`${num}%`);
		});

		// get category names
		let names = [];
		const catIDs = postsPerCategory.map(el => el._id);

		for await (let id of catIDs) {
			const cat = await Category.findById(id);
			names.push(cat.name);
		}

		// merge arrays
		let catArray = [];

		percentages.forEach((val, index) => {
			names.forEach((name, idx) => {
				if (index === idx) {
					const newObj = { name, val };
					catArray.push(newObj);
				}
			});
		});

		CATEGORY_STATS.total = categoriesCount;
		CATEGORY_STATS.overview = catArray;

		// return res.status(200).json({ CATEGORY_STATS });

		//* ~~~ COMMENTS ~~~

		let COMMENT_STATS = {};

		const commentsTotal = await Comment.countDocuments();

		const commentsPerCategory = await Post.aggregate([
			{
				$match: { hasComments: true },
			},
			{
				$group: { _id: '$category', total: { $sum: 1 } },
			},
		]);

		let commentPercentages = [];

		commentsPerCategory.forEach(el => {
			let num = Math.round((el.total * 100) / commentsTotal);
			commentPercentages.push(`${num}%`);
		});

		// get category names
		const allCategs = await Category.find().select('name -_id');

		// merge arrays
		let commentArray = [];

		commentPercentages.forEach((val, index) => {
			allCategs.forEach((name, idx) => {
				if (index === idx) {
					const newObj = { name: name.name, val };
					commentArray.push(newObj);
				}
			});
		});

		COMMENT_STATS.total = commentsTotal;
		COMMENT_STATS.overview = commentArray;

		return res.status(200).json({ CATEGORY_STATS, COMMENT_STATS });

		// // USER STATS

		// const users = await User.find();

		// const numOfUsers = users.length;

		// const activeUsers = await User.find({ accountStatus: 'active' });
		// const numOfActive = activeUsers.length;

		// const inactiveUsers = await User.find({ accountStatus: 'inactive' });
		// const numOfInactive = inactiveUsers.length;

		// const blockedUsers = await User.find({ accountStatus: 'blocked' });
		// const numOfBlocked = blockedUsers.length;

		// const dnevno = [];
		// const mesecno = [];
		// const godisnje = [];

		// let brojacUsera = 0;
		// for (let i = 0; i < users.length; i++) {
		// 	if (users[i].createdAt) {
		// 		if (users[i].createdAt.getDate() == new Date().getDate()) {
		// 			dnevno.push(users[i]);
		// 		}

		// 		// DSKPOAKDOPSAKD

		// 		if (new Date().getDate > 7) {
		// 			if (
		// 				users[i].createdAt.getDate() > new Date().getDate() - 7 &&
		// 				users[i].createdAt.getMonth() == new Date().getMonth() &&
		// 				users[i].createdAt.getYear() == new Date().getYear()
		// 			) {
		// 				brojacUsera++;
		// 			}
		// 		} else if (
		// 			users[i].createdAt.getMonth() == new Date().getMonth() &&
		// 			users[i].createdAt.getYear() == new Date().getYear()
		// 		) {
		// 			brojacUsera++;
		// 		}

		// 		// DASKJDASLDJADS

		// 		if (users[i].createdAt.getYear() == new Date().getYear()) {
		// 			godisnje.push(users[i]);
		// 		}
		// 		if (users[i].createdAt.getMonth() == new Date().getMonth()) {
		// 			mesecno.push(users[i]);
		// 		}
		// 	}
		// }

		// const Users = {
		// 	Sum: numOfUsers,
		// 	Active: numOfActive,
		// 	Inactive: numOfInactive,
		// 	Blocked: numOfBlocked,
		// 	today: dnevno.length,
		// 	thisWeek: brojacUsera,
		// 	thisMonth: mesecno.length,
		// 	thisYear: godisnje.length,
		// };

		// // POST STATS

		// const categories = await Category.find();
		// var byCategories = {};

		// for (let i = 0; i < categories.length; i++) {
		// 	const name = categories[i].name;
		// 	const brojPoKategoriji = await Post.countDocuments({
		// 		category: categories[i]._id,
		// 	});
		// 	byCategories[categories[i].name] = brojPoKategoriji;
		// }

		// var byCateg = Object.keys(byCategories).map(function (key) {
		// 	return [String(key), byCategories[key]];
		// });

		// let brojacDanasnjih = 0;
		// let brojacNedeljnih = 0;
		// let brojacMesecnih = 0;
		// let brojacGodisnjih = 0;
		// for (let i = 0; i < posts.length; i++) {
		// 	if (
		// 		posts[i].createdAt.getDate() == new Date().getDate() &&
		// 		posts[i].createdAt.getMonth() == new Date().getMonth() &&
		// 		posts[i].createdAt.getYear() == new Date().getYear()
		// 	) {
		// 		brojacDanasnjih++;
		// 	}

		// 	if (new Date().getDate > 7) {
		// 		if (
		// 			posts[i].createdAt.getDate() > new Date().getDate() - 7 &&
		// 			posts[i].createdAt.getMonth() == new Date().getMonth() &&
		// 			posts[i].createdAt.getYear() == new Date().getYear()
		// 		) {
		// 			brojacNedeljnih++;
		// 		}
		// 	} else if (
		// 		posts[i].createdAt.getMonth() == new Date().getMonth() &&
		// 		posts[i].createdAt.getYear() == new Date().getYear()
		// 	) {
		// 		brojacNedeljnih++;
		// 	}

		// 	if (
		// 		posts[i].createdAt.getMonth() == new Date().getMonth() &&
		// 		posts[i].createdAt.getYear() == new Date().getYear()
		// 	) {
		// 		brojacMesecnih++;
		// 	}

		// 	if (posts[i].createdAt.getYear() == new Date().getYear()) {
		// 		brojacGodisnjih++;
		// 	}
		// }

		// const Posts = {
		// 	Sum: allPosts,
		// 	byCateg,
		// 	today: brojacDanasnjih,
		// 	thisWeek: brojacNedeljnih,
		// 	thisMonth: brojacMesecnih,
		// 	thisYear: brojacGodisnjih,
		// };

		// // COMMENT STATS

		// const allComents = await Comment.countDocuments();
		// //const categories = await Category.find();

		// var Commentability = {};

		// for (let i = 0; i < categories.length; i++) {
		// 	const sumComment = 0;
		// 	const posts = await Post.find({ category: categories[i]._id });
		// 	for (let j = 0; j < posts.length; j++) {
		// 		const numOfCommentsForPost = await Comment.countDocuments({
		// 			postRelated: posts[j]._id,
		// 		});
		// 		sumComment += numOfCommentsForPost;
		// 	}
		// 	const procenat = Math.floor((sumComment / allComents) * 100);

		// 	Commentability[categories[i].name] = procenat;
		// }

		// var commentability = Object.keys(Commentability).map(function (key) {
		// 	return [String(key), Commentability[key]];
		// });

		// const Comments = {
		// 	Sum: allComents,
		// 	commentability,
		// };

		// // UPIS

		// const sve = {
		// 	Categories,
		// 	Users,
		// 	Posts,
		// 	Comments,
		// };

		// const json = JSON.stringify(sve);
		// await fs.writeFileSync('stats.json', json);
		// return res.status(201).json(sve);
	} catch (err) {
		next(err);
	}
};
