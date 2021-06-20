import User from "../../model/user";

export const confirmEmail = async (req, res, next) => {
    const { email, emailCode } = req.query;
    
    try {
        const existingUser = await User.findOne({ email })
        if (!existingUser) {
            throw new Error('User not found!')
        }

        if (existingUser.emailCode == emailCode) {
            existingUser.emailConfirmed = true
            await existingUser.save()
            // return res.status(200).json({ message: 'Email confirmed successfully!' })
            res.writeHead(302, {
                Location: 'http://localhost:3000/login'
            });
            res.end();
        }

        throw new Error('Wrong code!')

    } catch (err) {
        next(err);
    }
};