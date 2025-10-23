import { Request, Response } from 'express';
import { Artist, User } from '../models';

export const getAllArtists = async (req: Request, res: Response) => {
  try {
    const { category, subcategory, page = 1, limit = 10 } = req.query;
    
    let filter: any = {};
    if (category) filter.category = category;
    if (subcategory) filter.subcategory = subcategory;

    const artists = await Artist.find(filter)
      .populate('userId', 'name email')
      .sort({ followers: -1 })
      .limit(Number(limit) * 1)
      .skip((Number(page) - 1) * Number(limit));

    const total = await Artist.countDocuments(filter);

    res.json({
      artists,
      totalPages: Math.ceil(total / Number(limit)),
      currentPage: Number(page),
      total
    });
  } catch (error) {
    console.error('아티스트 목록 조회 오류:', error);
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};

export const getArtistById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const artist = await Artist.findById(id).populate('userId', 'name email');
    if (!artist) {
      return res.status(404).json({ message: '아티스트를 찾을 수 없습니다.' });
    }

    res.json(artist);
  } catch (error) {
    console.error('아티스트 조회 오류:', error);
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};

export const createArtist = async (req: any, res: Response) => {
  try {
    const { name, category, subcategory, description, location, schedule, subscriptionPrice } = req.body;
    const userId = req.user._id;

    // 이미 아티스트 프로필이 있는지 확인
    const existingArtist = await Artist.findOne({ userId });
    if (existingArtist) {
      return res.status(400).json({ message: '이미 아티스트 프로필이 존재합니다.' });
    }

    const artist = new Artist({
      name,
      category,
      subcategory,
      description,
      location,
      schedule,
      subscriptionPrice,
      userId,
      profileImage: req.file ? req.file.path : '',
      followers: 0,
      videos: [],
      goods: []
    });

    await artist.save();

    // 사용자 타입을 artist로 변경
    await User.findByIdAndUpdate(userId, { type: 'artist' });

    res.status(201).json({
      message: '아티스트 프로필이 생성되었습니다.',
      artist
    });
  } catch (error) {
    console.error('아티스트 생성 오류:', error);
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};

export const updateArtist = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    const updateData = req.body;

    const artist = await Artist.findOne({ _id: id, userId });
    if (!artist) {
      return res.status(404).json({ message: '아티스트를 찾을 수 없거나 권한이 없습니다.' });
    }

    if (req.file) {
      updateData.profileImage = req.file.path;
    }

    const updatedArtist = await Artist.findByIdAndUpdate(id, updateData, { new: true });
    res.json({
      message: '아티스트 정보가 업데이트되었습니다.',
      artist: updatedArtist
    });
  } catch (error) {
    console.error('아티스트 업데이트 오류:', error);
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};

export const followArtist = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const artist = await Artist.findById(id);
    if (!artist) {
      return res.status(404).json({ message: '아티스트를 찾을 수 없습니다.' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
    }

    // 이미 팔로우 중인지 확인
    const isFollowing = user.subscribedArtists.includes((artist._id as any).toString());
    
    if (isFollowing) {
      // 언팔로우
      await User.findByIdAndUpdate(userId, { $pull: { subscribedArtists: artist._id } });
      await Artist.findByIdAndUpdate(id, { $inc: { followers: -1 } });
      res.json({ message: '언팔로우되었습니다.', isFollowing: false });
    } else {
      // 팔로우
      await User.findByIdAndUpdate(userId, { $addToSet: { subscribedArtists: artist._id } });
      await Artist.findByIdAndUpdate(id, { $inc: { followers: 1 } });
      res.json({ message: '팔로우되었습니다.', isFollowing: true });
    }
  } catch (error) {
    console.error('팔로우 오류:', error);
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};
