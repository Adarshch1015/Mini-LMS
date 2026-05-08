import Course from '../models/Course.js';
import Enrollment from '../models/Enrollment.js';

// @desc    Get all published courses (public)
// @route   GET /api/courses
// @access  Public
export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find({ isPublished: true }).populate('instructor', 'name');
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get instructor's courses
// @route   GET /api/courses/my-courses
// @access  Private/Instructor
export const getInstructorCourses = async (req, res) => {
  try {
    const courses = await Course.find({ instructor: req.user._id });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get course by ID
// @route   GET /api/courses/:id
// @access  Public
export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('instructor', 'name avatar');
    if (course) {
      res.json(course);
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a course
// @route   POST /api/courses
// @access  Private/Instructor
export const createCourse = async (req, res) => {
  try {
    const course = new Course({
      title: req.body.title || 'Sample Course',
      description: req.body.description || 'Sample Description',
      category: req.body.category || 'General',
      instructor: req.user._id,
      isPublished: false,
      modules: [],
    });

    const createdCourse = await course.save();
    res.status(201).json(createdCourse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a course
// @route   PUT /api/courses/:id
// @access  Private/Instructor
export const updateCourse = async (req, res) => {
  try {
    const { title, description, category, isPublished, thumbnail } = req.body;

    const course = await Course.findById(req.params.id);

    if (course) {
      if (course.instructor.toString() !== req.user._id.toString() && req.user.role !== 'Admin') {
         return res.status(401).json({ message: 'Not authorized to edit this course' });
      }

      course.title = title || course.title;
      course.description = description || course.description;
      course.category = category || course.category;
      if (thumbnail !== undefined) course.thumbnail = thumbnail;
      if (isPublished !== undefined) course.isPublished = isPublished;

      const updatedCourse = await course.save();
      res.json(updatedCourse);
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add a module to course
// @route   POST /api/courses/:id/modules
// @access  Private/Instructor
export const addCourseModule = async (req, res) => {
  try {
    const { title, description, order } = req.body;

    const course = await Course.findById(req.params.id);

    if (course) {
      if (course.instructor.toString() !== req.user._id.toString() && req.user.role !== 'Admin') {
         return res.status(401).json({ message: 'Not authorized' });
      }

      const newModule = { title, description, order, lessons: [] };
      course.modules.push(newModule);

      const updatedCourse = await course.save();
      res.status(201).json(updatedCourse);
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add lesson to a module
// @route   POST /api/courses/:id/modules/:moduleId/lessons
// @access  Private/Instructor
export const addLesson = async (req, res) => {
  try {
    const { title, description, videoUrl, documentUrl, order } = req.body;

    const course = await Course.findById(req.params.id);

    if (course) {
       if (course.instructor.toString() !== req.user._id.toString() && req.user.role !== 'Admin') {
         return res.status(401).json({ message: 'Not authorized' });
       }

       const module = course.modules.id(req.params.moduleId);
       if(!module) return res.status(404).json({message: 'Module not found'});

       const newLesson = { title, description, videoUrl, documentUrl, order };
       module.lessons.push(newLesson);

       await course.save();
       res.status(201).json({ message: 'Lesson added successfully', course });
    } else {
        res.status(404).json({ message: 'Course not found' });
    }
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a course
// @route   DELETE /api/courses/:id
// @access  Private/Instructor or Admin
export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (course) {
      // Check authorization
      if (course.instructor.toString() !== req.user._id.toString() && req.user.role !== 'Admin') {
         return res.status(401).json({ message: 'Not authorized to delete this course' });
      }

      // Cascade delete all enrollments associated with this course
      await Enrollment.deleteMany({ course: course._id });
      await Course.deleteOne({ _id: course._id });
      res.json({ message: 'Course removed successfully' });
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
