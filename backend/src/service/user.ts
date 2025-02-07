import User from '../models/user';
import { StatusCode, RegisterType, UpdateUserType } from '../@types';
import { ApiError } from '../utils';

class UserService {
  async createUser(userData: RegisterType) {
    try {
      const user = new User(userData);
      await user.save();
      return user;
    } catch (error) {
      throw new ApiError(
        'impact api',
        error as string,
        'createUser',
        StatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getUserById(userId: string) {
    try {
      const user = await User.findById(userId).populate('plans').populate('reports');
      return user;
    } catch (error) {
      throw new ApiError(
        'impact api',
        error as string,
        'getUserById',
        StatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getUserByEmail(email: string) {
    try {
      const user = User.findOne({ email });
      if (!user) throw new Error('User not found');
      return user;
    } catch (error) {
      throw new ApiError(
        'impact api',
        error as string,
        'getUserByEmail',
        StatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getUserByUsername(username: string) {
    try {
      const user = User.findOne({ username });
      if (!user) throw new Error('User not found');
      return user;
    } catch (error) {
      throw new ApiError(
        'impact api',
        error as string,
        'getUserByUsername',
        StatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  async updateUser(userId: string, userData: UpdateUserType) {
    try {
      const user = await User.findByIdAndUpdate(userId, userData, {
        new: true,
      });
      if (!user) throw new Error('User not found');
      return user;
    } catch (error) {
      throw new ApiError(
        'impact api',
        error as string,
        'updateUser',
        StatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  deleteUser = async (userId: string) => {
    try {
      const user = await User.findByIdAndDelete(userId);
      if (!user) throw new Error('User not found');
      return user;
    } catch (error) {
      throw new ApiError(
        'impact api',
        error as string,
        'deleteUser',
        StatusCode.INTERNAL_SERVER_ERROR
      );
    }
  };

  getAllUsers = async (page: number, limit: number, role: any) => {
    try {
      const query: any = {};
      if (role) {
        query.role = { role: true };
      }

      const users = await User.find(query)
        .limit(limit)
        .skip(page * 1 - limit);
      return users;
    } catch (error) {
      throw new ApiError(
        'impact api',
        error as string,
        'getAllUsers',
        StatusCode.INTERNAL_SERVER_ERROR
      );
    }
  };
}

export default new UserService();
