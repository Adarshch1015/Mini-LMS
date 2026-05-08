import Enrollment from '../models/Enrollment.js';
import Course from '../models/Course.js';

// @desc    Enroll in a course
// @route   POST /api/enroll
// @access  Private
export const enrollCourse = async (req, res) => {
  try {
    const { courseId } = req.body;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const existingEnrollment = await Enrollment.findOne({
      course: courseId,
      student: req.user._id,
    });

    if (existingEnrollment) {
      return res.status(400).json({ message: 'Already enrolled in this course' });
    }

    const enrollment = new Enrollment({
      student: req.user._id,
      course: courseId,
      completedLessons: [],
    });

    const createdEnrollment = await enrollment.save();
    res.status(201).json(createdEnrollment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Mark lesson as complete
// @route   PUT /api/enroll/:courseId/progress
// @access  Private
export const markLessonComplete = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { lessonId } = req.body;

    const enrollment = await Enrollment.findOne({
      course: courseId,
      student: req.user._id,
    }).populate('course');

    if (!enrollment) {
      return res.status(404).json({ message: 'Enrollment not found' });
    }

    if (!enrollment.completedLessons.includes(lessonId)) {
      enrollment.completedLessons.push(lessonId);

      // Simple completion logic checking if all lessons are done
      // Assuming enrollment.course.modules is populated
      let totalLessons = 0;
      enrollment.course.modules.forEach(m => {
          totalLessons += m.lessons.length;
      });

      if (enrollment.completedLessons.length >= totalLessons && totalLessons > 0) {
          enrollment.isCompleted = true;
      }

      await enrollment.save();
      res.json(enrollment);
    } else {
      res.status(400).json({ message: 'Lesson already marked complete' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user's enrollments
// @route   GET /api/enroll/my-enrollments
// @access  Private
export const getMyEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ student: req.user._id }).populate('course');
    res.json(enrollments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
