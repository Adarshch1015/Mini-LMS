import express from 'express';
import {
  enrollCourse,
  markLessonComplete,
  getMyEnrollments,
} from '../controllers/enrollmentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, enrollCourse);
router.get('/my-enrollments', protect, getMyEnrollments);
router.put('/:courseId/progress', protect, markLessonComplete);

export default router;
