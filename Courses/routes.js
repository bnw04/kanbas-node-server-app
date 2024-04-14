import * as dao from "./dao.js";

export default function CourseRoutes(app) {

  const createCourse = async (req, res) => {
    try {
      const course = await dao.createCourse(req.body);
      res.json(course);
    } catch (error) {
      res.status(400).send('Course Number and Name are required.');
    }
  };

  const deleteCourse = async (req, res) => {
    const status = await dao.deleteCourse(req.params.courseId);
    res.json(status);
  };

  const updateCourse = async (req, res) => {
    const { courseId } = req.params;
    const newCourse = req.body
    try {
      if (!newCourse.number || !newCourse.name || newCourse.name.trim() === "" || newCourse.number.trim() === "") {
        throw new Error("Course Number and Name are required.");
      }
      const status = await dao.updateCourse(courseId, req.body);
      res.json(status);
    } catch (error) {
      res.status(400).json({ message: error.message });
    } 
  };

  const findAllCourses = async (req, res) => {
    const courses = await dao.findAllCourses();
    res.json(courses);
    return;
  };

  const findCourseById = async (req, res) => {
    const course = await dao.findCourseById(req.params.courseId);
    res.json(course);
  };

  app.post("/api/courses", createCourse);
  app.delete("/api/courses/:courseId", deleteCourse);
  app.put("/api/courses/:courseId", updateCourse);
  app.get("/api/courses/:courseId", findCourseById);
  app.get("/api/courses", findAllCourses);
}
