import express from 'express';
import {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  addCourseModule,
  addLesson,
  getInstructorCourses,
  deleteCourse
} from '../controllers/courseController.js';
import { protect, instructor } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getCourses)
  .post(protect, instructor, createCourse);

router.get('/my-courses', protect, instructor, getInstructorCourses);

router.route('/:id')
  .get(getCourseById)
  .put(protect, instructor, updateCourse)
  .delete(protect, instructor, deleteCourse);

router.route('/:id/modules')
  .post(protect, instructor, addCourseModule);

router.route('/:id/modules/:moduleId/lessons')
  .post(protect, instructor, addLesson);

// Upload endpoint that simply returns file path
router.post('/upload', protect, instructor, upload.single('media'), (req, res) => {
  res.send({
      message: 'File Uploaded',
      filePath: `/${req.file.path.replace(/\\/g, "/")}`
  });
});

export default router;
