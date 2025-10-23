import { Request, Response } from 'express';
import { Comment, Artist } from '../models';

export const createComment = async (req: any, res: Response) => {
  try {
    const { artistId, content, type } = req.body;
    const userId = req.user._id;
    const userName = req.user.name;

    // 아티스트 존재 확인
    const artist = await Artist.findById(artistId);
    if (!artist) {
      return res.status(404).json({ message: '아티스트를 찾을 수 없습니다.' });
    }

    const comment = new Comment({
      artistId,
      userId,
      userName,
      content,
      type: type || 'general'
    });

    await comment.save();

    res.status(201).json({
      message: '댓글이 작성되었습니다.',
      comment
    });
  } catch (error) {
    console.error('댓글 생성 오류:', error);
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};

export const getCommentsByArtist = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { page = 1, limit = 20 } = req.query;

    const comments = await Comment.find({ artistId: id })
      .populate('userId', 'name profileImage')
      .sort({ createdAt: -1 })
      .limit(Number(limit) * 1)
      .skip((Number(page) - 1) * Number(limit));

    const total = await Comment.countDocuments({ artistId: id });

    res.json({
      comments,
      totalPages: Math.ceil(total / Number(limit)),
      currentPage: Number(page),
      total
    });
  } catch (error) {
    console.error('댓글 조회 오류:', error);
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};

export const updateComment = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const userId = req.user._id;

    const comment = await Comment.findOne({ _id: id, userId });
    if (!comment) {
      return res.status(404).json({ message: '댓글을 찾을 수 없거나 권한이 없습니다.' });
    }

    comment.content = content;
    await comment.save();

    res.json({
      message: '댓글이 수정되었습니다.',
      comment
    });
  } catch (error) {
    console.error('댓글 수정 오류:', error);
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};

export const deleteComment = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const comment = await Comment.findOne({ _id: id, userId });
    if (!comment) {
      return res.status(404).json({ message: '댓글을 찾을 수 없거나 권한이 없습니다.' });
    }

    await Comment.findByIdAndDelete(id);

    res.json({ message: '댓글이 삭제되었습니다.' });
  } catch (error) {
    console.error('댓글 삭제 오류:', error);
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};

