import { Router } from 'express';
import { 
  createComment, 
  getCommentsByArtist, 
  updateComment, 
  deleteComment 
} from '../controllers/commentController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// 댓글 생성 (인증 필요)
router.post('/', authenticateToken, createComment);

// 아티스트별 댓글 조회
router.get('/artist/:id', getCommentsByArtist);

// 댓글 수정 (인증 필요)
router.put('/:id', authenticateToken, updateComment);

// 댓글 삭제 (인증 필요)
router.delete('/:id', authenticateToken, deleteComment);

export default router;

