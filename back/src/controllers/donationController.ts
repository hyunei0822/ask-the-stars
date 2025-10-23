import { Request, Response } from 'express';
import { Donation, Artist, User } from '../models';

export const createDonation = async (req: any, res: Response) => {
  try {
    const { artistId, amount, type, goodId } = req.body;
    const userId = req.user._id;

    // 아티스트 존재 확인
    const artist = await Artist.findById(artistId);
    if (!artist) {
      return res.status(404).json({ message: '아티스트를 찾을 수 없습니다.' });
    }

    // 상품 구매인 경우 재고 확인
    if (type === 'good' && goodId) {
      const good = artist.goods.find((g: any) => g._id.toString() === goodId);
      if (!good) {
        return res.status(404).json({ message: '상품을 찾을 수 없습니다.' });
      }
      if (good.stock <= 0) {
        return res.status(400).json({ message: '재고가 부족합니다.' });
      }
    }

    const donation = new Donation({
      artistId,
      userId,
      amount,
      type,
      goodId: type === 'good' ? goodId : undefined,
      status: 'completed' // 실제로는 결제 시스템 연동 필요
    });

    await donation.save();

    // 상품 구매인 경우 재고 차감
    if (type === 'good' && goodId) {
      await Artist.findOneAndUpdate(
        { _id: artistId, 'goods._id': goodId },
        { $inc: { 'goods.$.stock': -1 } }
      );
    }

    // 사용자의 후원 목록에 추가
    await User.findByIdAndUpdate(userId, { $addToSet: { donations: donation._id } });

    res.status(201).json({
      message: '후원이 완료되었습니다.',
      donation
    });
  } catch (error) {
    console.error('후원 생성 오류:', error);
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};

export const getUserDonations = async (req: any, res: Response) => {
  try {
    const userId = req.user._id;
    const { page = 1, limit = 10 } = req.query;

    const donations = await Donation.find({ userId })
      .populate('artistId', 'name profileImage')
      .sort({ createdAt: -1 })
      .limit(Number(limit) * 1)
      .skip((Number(page) - 1) * Number(limit));

    const total = await Donation.countDocuments({ userId });

    res.json({
      donations,
      totalPages: Math.ceil(total / Number(limit)),
      currentPage: Number(page),
      total
    });
  } catch (error) {
    console.error('후원 내역 조회 오류:', error);
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};

export const getArtistDonations = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    const { page = 1, limit = 10 } = req.query;

    // 아티스트 소유자 확인
    const artist = await Artist.findOne({ _id: id, userId: req.user._id });
    if (!artist) {
      return res.status(404).json({ message: '아티스트를 찾을 수 없거나 권한이 없습니다.' });
    }

    const donations = await Donation.find({ artistId: id })
      .populate('userId', 'name email')
      .sort({ createdAt: -1 })
      .limit(Number(limit) * 1)
      .skip((Number(page) - 1) * Number(limit));

    const total = await Donation.countDocuments({ artistId: id });

    res.json({
      donations,
      totalPages: Math.ceil(total / Number(limit)),
      currentPage: Number(page),
      total
    });
  } catch (error) {
    console.error('아티스트 후원 내역 조회 오류:', error);
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};
