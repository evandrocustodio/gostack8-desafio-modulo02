import jwt from 'jsonwebtoken';
import auth from '../../config/auth';
import User from '../models/User';

class UserController {
  async store(req, res) {
    const { email } = req.body;

    const user = await User.findOne({ where: { email } });

    if (user) {
      return res.status(401).json({ error: 'User already exists.' });
    }

    await User.create(req.body);

    const { id, name } = user;

    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, auth.secret, {
        expiresIn: auth.expiresIn,
      }),
    });
  }

  async update(req, res) {
    const { userId } = req.userId;
    const { email, oldPassword } = req.body;

    const user = await User.findByPk({ where: { id: userId } });

    if (user) {
      if (user.email !== email) {
        const mailExists = await User.findOne({ where: { email } });
        if (mailExists) {
          return res.status(400).json({ error: `Mail already exists.` });
        }
      }

      if (password && !(await user.checkPassword(oldPassword))) {
        return res.status(400).json({ error: 'User ou password errors.' });
      }
    } else {
      return res.status(400).json({ error: 'User does not exists.' });
    }

    const { id, name } = await User.update(req.body);

    return res.json({
      user: {
        id,
        name,
      },
    });
  }
}

export default new UserController();
